import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Button, Alert
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import { API_URL } from '../../config';

export default function NavigationScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let sub: Location.LocationSubscription | undefined;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const currentCoords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      setRegion({ ...currentCoords, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      // Reverse geocode for address string
      const [place] = await Location.reverseGeocodeAsync(currentCoords);
      const address = [
        place.name,
        place.street,
        place.city,
        place.region,
        place.postalCode,
        place.country
      ].filter(Boolean).join(', ');

      // Persist address AND coordinates to server
      try {
        const resp = await fetch(`${API_URL}/userinfo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, latitude: currentCoords.latitude, longitude: currentCoords.longitude }),
        });
        if (!resp.ok) {
          const err = await resp.text();
          Alert.alert('Update failed', err);
        }
      } catch (e) {
        console.warn("Failed to update user info:", e);
        Alert.alert('Network Error', 'Unable to update location on server');
      }

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 1, timeInterval: 1000 },
        ({ coords }) => {
          setRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 });
          // Optionally: Send updated coordinates periodically to /userinfo
          // fetch(`${API_URL}/userinfo`, { method: 'POST', ... body: { latitude: coords.latitude, longitude: coords.longitude } });
        }
      );
    })();
    return () => sub?.remove();
  }, []);

  const sendEmergency = async () => {
    if (!region) return Alert.alert('Error', 'No location yet');
    try {
      const res = await fetch(`${API_URL}/emergency/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: region.latitude,
          longitude: region.longitude,
        }),
      });
      const json = await res.json();
      console.log('Server response:', json);
      if (res.ok) {
        Alert.alert('Success', `SMS sent (SID: ${json.sms_sid})`);
      } else {
        Alert.alert('Error', json.error || 'Failed to send emergency');
      }
    } catch (e) {
      console.warn('Fetch error:', e);
      Alert.alert('Error', 'Network error sending emergency');
    }
  };

  if (errorMsg) return <View style={styles.center}><Text style={styles.text}>{errorMsg}</Text></View>;
  if (!region)  return <View style={styles.center}><ActivityIndicator size="large" color="#fff" /></View>;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
      >
        <Marker coordinate={region} title="You are here" />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Send Location" onPress={sendEmergency} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1 },
  map:             { flex: 1 },
  center:          { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text:            { color: '#fff', fontSize: 18, marginVertical: 4 },
  buttonContainer: { position: 'absolute', bottom: 20, alignSelf: 'center' },
});