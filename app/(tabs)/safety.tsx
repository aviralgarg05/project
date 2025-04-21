import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, FlatList, View,
  Text, StyleSheet
} from 'react-native';
import { API_URL } from '../../config';

export default function SafetyScreen() {
  const [alerts, setAlerts] = useState<{ id: number; message: string }[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/alerts`)
      .then(r => r.json())
      .then(setAlerts)
      .catch(console.warn);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Safety Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={a => String(a.id)}
        renderItem={({ item }) => (
          <View style={styles.alert}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 12 },
  alert: {
    padding: 12, backgroundColor: '#fee',
    marginBottom: 8, borderRadius: 4,
  },
});
