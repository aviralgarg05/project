import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function NavigationScreen() {
  const [loc, setLoc] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let subscriber: Location.LocationSubscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        return;
      }
      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
        },
        ({ coords }) => {
          const position = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
          setLoc(position);
          fetch('https://your.backend/api/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(position),
          });
        }
      );
    })();
    return () => subscriber?.remove();
  }, []);

  if (!loc && !errorMsg)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          followsUserLocation
          region={
            loc
              ? {
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : undefined
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});