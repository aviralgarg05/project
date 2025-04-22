import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Button, Alert, Dimensions
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import { API_URL } from '../../config';

export default function NavigationScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    console.log('Using API_URL =', API_URL);
    // quick connectivity check
    fetch(`${API_URL}/ping`)
      .then(r => r.json())
      .then(js => console.log('Ping OK:', js))
      .catch(e => console.warn('Ping failed:', e));

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

      const [place] = await Location.reverseGeocodeAsync(currentCoords);
      const address = [place.name, place.street, place.city, place.region, place.postalCode, place.country]
        .filter(Boolean).join(', ');

      try {
        await fetch(`${API_URL}/userinfo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: address,
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude
          }),
        });
      } catch (e) {
        console.warn("Failed to update user info:", e);
      }

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 1, timeInterval: 1000 },
        ({ coords }) => {
          setRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    })();
    return () => sub?.remove();
  }, []);

  const sendEmergency = async () => {
    console.log('POST →', `${API_URL}/emergency/send`, { latitude: region?.latitude, longitude: region?.longitude });
    if (!region) return Alert.alert('Error', 'No location yet');
    try {
      const res = await fetch(`${API_URL}/emergency/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: region.latitude, longitude: region.longitude }),
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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container:       { flex: 1 },
  map:             { width, height },
  center:          { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text:            { color: '#fff', fontSize: 18, marginVertical: 4 },
  buttonContainer: { position: 'absolute', bottom: 20, alignSelf: 'center' },
});
