import { View, Text, StyleSheet } from 'react-native';

export default function NavigationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Map functionality is not supported on the web.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
