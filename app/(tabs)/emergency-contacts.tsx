import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  Button, FlatList, StyleSheet, Alert
} from 'react-native';
import { API_URL } from '../../config';

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/contacts`)
      .then(r => r.json())
      .then(setContacts)
      .catch(console.warn);
  }, []);

  const add = () => {
    if (!name || !phone) return Alert.alert('Enter both');
    const payload = { name, phone };
    fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(r => r.json())
      .then(c => {
        setContacts(prev => [...prev, c]);
        setName(''); setPhone('');
      })
      .catch(console.warn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <Button title="Add Contact" onPress={add} />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 12 },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, marginBottom: 8, borderRadius: 4,
  },
  item: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 12, borderBottomWidth: 1, borderColor: '#eee',
  },
});
