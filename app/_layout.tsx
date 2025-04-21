import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading…</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  loading: { color: '#fff', fontSize: 18 }
});
