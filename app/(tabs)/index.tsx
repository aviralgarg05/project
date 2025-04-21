import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#000000']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning, Alex</Text>
          <Text style={styles.helmetStatus}>Helmet Connected</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?w=400&q=80' }}
          style={styles.avatar}
        />
      </LinearGradient>

      <View style={styles.helmetStats}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="battery" size={24} color="#00E676" />
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Battery</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="bluetooth" size={24} color="#00E676" />
          <Text style={styles.statValue}>Connected</Text>
          <Text style={styles.statLabel}>Status</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="thermometer" size={24} color="#00E676" />
          <Text style={styles.statValue}>24°C</Text>
          <Text style={styles.statLabel}>Temperature</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="fan" size={24} color="#00E676" />
          <Text style={styles.statValue}>Good</Text>
          <Text style={styles.statLabel}>Ventilation</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            {
              title: 'Start Navigation',
              image: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400&q=80',
            },
            {
              title: 'Voice Commands',
              image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&q=80',
            },
            {
              title: 'Emergency Contacts',
              image: 'https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?w=400&q=80',
            },
          ].map((action, index) => (
            <Pressable
              key={index}
              style={styles.actionCard}
              onPress={() => {
                switch (action.title) {
                  case 'Start Navigation':
                    router.push('/navigation');
                    break;
                  case 'Voice Commands':
                    router.push('/voice-commands');
                    break;
                  case 'Emergency Contacts':
                    router.push('/emergency-contacts');
                    break;
                }
              }}>
              <Image source={{ uri: action.image }} style={styles.actionImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.actionGradient}>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ridesScroll}>
          {[
            {
              title: 'Morning Commute',
              distance: '12.5 km',
              time: '35 min',
              image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
            },
            {
              title: 'Weekend Ride',
              distance: '45.2 km',
              time: '2h 15min',
              image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400&q=80',
            },
          ].map((ride, index) => (
            <Pressable key={index} style={styles.rideCard}>
              <Image source={{ uri: ride.image }} style={styles.rideImage} />
              <View style={styles.rideInfo}>
                <Text style={styles.rideTitle}>{ride.title}</Text>
                <Text style={styles.rideDetails}>{ride.distance} • {ride.time}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  helmetStatus: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#00E676',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
  },
  helmetStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#808080',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickActions: {
    gap: 12,
  },
  actionCard: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionImage: {
    width: '100%',
    height: '100%',
  },
  actionGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  actionTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#FFFFFF',
  },
  ridesScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  rideCard: {
    width: 280,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  rideImage: {
    width: '100%',
    height: 160,
  },
  rideInfo: {
    padding: 16,
  },
  rideTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#FFFFFF',
  },
  rideDetails: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#808080',
    marginTop: 4,
  },
});