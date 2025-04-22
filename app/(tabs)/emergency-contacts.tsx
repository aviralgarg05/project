import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  Button, FlatList, StyleSheet, Alert,
  ActivityIndicator, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState<{ id: number; name: string; phone: string }[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  // Load contacts from AsyncStorage
  const loadContacts = async () => {
    try {
      const json = await AsyncStorage.getItem('contacts');
      const stored: { id: number; name: string; phone: string }[] = json ? JSON.parse(json) : [];
      setContacts(stored);
    } catch {
      Alert.alert('Error', 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  // Save contacts to AsyncStorage
  const saveContacts = async (list: typeof contacts) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(list));
    } catch {
      console.warn('Failed to save');
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const add = () => {
    if (!name || !phone) return Alert.alert('Enter both');
    const nextId = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const newContact = { id: nextId, name, phone };
    const updated = [...contacts, newContact];
    setContacts(updated);
    saveContacts(updated);
    setName(''); setPhone('');
  };

  const remove = (id: number) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    saveContacts(updated);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

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
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<Text style={styles.empty}>No contacts yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => remove(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 12, fontWeight: 'bold' },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, marginBottom: 8, borderRadius: 4,
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  card: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 12, marginBottom: 10,
    backgroundColor: '#fff', borderRadius: 6,
    shadowColor: '#000', shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '600' },
  phone: { color: '#555', marginTop: 4 },
  delete: { color: '#d00', fontWeight: '600' },
});
