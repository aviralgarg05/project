import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface FallbackProps {
  error?: Error;
  resetError?: () => void;
}

export default function FallbackComponent({ error, resetError }: FallbackProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        {error?.message || 'The app encountered an error'}
      </Text>
      {resetError && (
        <Button title="Try Again" onPress={resetError} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
});
