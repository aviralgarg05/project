import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState<{ id: number; name: string; phone: string }[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const stored = await AsyncStorage.getItem('contacts');
        const parsed = stored ? JSON.parse(stored) : [];
        setContacts(parsed);
      } catch {
        Alert.alert('Error', 'Could not load contacts');
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  const saveContacts = async (updated) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(updated));
    } catch {
      console.warn('Saving error');
    }
  };

  const addContact = () => {
    if (!name || !phone) return Alert.alert('Enter name and phone');
    const newContact = {
      id: Date.now(),
      name,
      phone,
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    saveContacts(updated);
    setName('');
    setPhone('');
  };

  const deleteContact = (id: number) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    saveContacts(updated);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00e676" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>+ Add Contact</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.empty}>No contacts yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteContact(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  form: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 18,
    width: '100%',
    fontFamily: 'Roboto',
  },
  addButton: {
    backgroundColor: '#00e676',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  contactCard: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  contactName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Roboto',
  },
  contactPhone: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  deleteText: {
    color: '#ff5252',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});