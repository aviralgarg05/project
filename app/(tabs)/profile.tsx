import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://www.shutterstock.com/image-vector/female-avatar-icon-no-face-600nw-2069253947.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Tanya Gupta</Text>
          <Text style={styles.bio}>            Your Ride | Our Watch | Always Safe</Text>
        </View>
        <Pressable style={styles.settingsButton}>
          <MaterialCommunityIcons name="cog" size={24} color="#00e676" />
        </Pressable>
      </View>

      <View style={styles.stats}>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {[
            { name: 'account-alert', label: 'Alert Contact' },
            { name: 'crash', label: 'Crash Detection' },
            { name: 'map-legend', label: 'Ride Insights' },
          ].map((action, i) => (
            <Pressable key={i} style={styles.actionButton}>
              <MaterialCommunityIcons name={action.name} size={24} color="#00e676" />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        {[
          { title: 'Connected Phone', description: '7701XXXXXX' },
          { title: 'Linked Email', description: 'example@example.com' },
        ].map((about, i) => (
          <View key={i} style={styles.aboutCard}>
            <MaterialCommunityIcons name="account" size={24} color="#00e676" />
            <View style={styles.aboutInfo}>
              <Text style={styles.aboutTitle}>{about.title}</Text>
              <Text style={styles.aboutDesc}>{about.description}</Text>
            </View>
          </View>
        ))}
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
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#808080',
    textAlign: 'center',
  },
  settingsButton: {
    padding: 8,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    marginHorizontal: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e5ea',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#F8F9FA',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aboutCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  aboutInfo: {
    marginLeft: 16,
    flex: 1,
  },
  aboutTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  aboutDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    marginTop: 2,
  },
  aboutDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    marginTop: 4,
  },
});