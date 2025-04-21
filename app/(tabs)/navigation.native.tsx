import { View, StyleSheet, Dimensions, Text } from 'react-native';
// Use a try-catch import for MapView to handle missing type declarations
let MapView: any;
try {
  MapView = require('react-native-maps').default;
} catch (e) {
  console.warn('Error importing MapView:', e);
}

const { width, height } = Dimensions.get('window');

export default function NavigationScreen() {
  // If MapView is not available, show a fallback
  if (!MapView) {
    return (
      <View style={[styles.container, styles.fallbackContainer]}>
        <Text style={styles.fallbackText}>
          Map functionality is not available. Please ensure react-native-maps is installed correctly.
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  map: {
    width,
    height,
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  }
});
