import React, { useState } from 'react';
import {
  SafeAreaView, Text, TextInput,
  Button, StyleSheet, Alert
} from 'react-native';
import { API_URL } from '../../config';

export default function VoiceCommandsScreen() {
  const [cmd, setCmd] = useState('');
  const send = () => {
    if (!cmd) return;
    fetch(`${API_URL}/voice-commands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cmd }),
    })
      .then(r => r.json())
      .then(() => {
        Alert.alert('Sent', cmd);
        setCmd('');
      })
      .catch(console.warn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Voice Commands</Text>
      <TextInput
        placeholder="Say something…"
        value={cmd}
        onChangeText={setCmd}
        style={styles.input}
      />
      <Button title="Send Command" onPress={send} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, marginBottom: 8, borderRadius: 4,
  },
});
