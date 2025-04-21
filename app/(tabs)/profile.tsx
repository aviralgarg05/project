import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_URL } from '../../config';

// define quick actions with literal icon names
const quickActions = [
  { icon: 'calendar', label: 'Previous Usages' },
  { icon: 'medal-outline', label: 'Customise' },
  { icon: 'trending-up', label: 'Helmet Health' },
] as const;

type QuickAction = typeof quickActions[number];

export default function ProfileScreen() {
  const [user, setUser] = useState<{ name?: string; bio?: string }>({});

  useEffect(() => {
    fetch(`${API_URL}/userinfo`)
      .then(r => r.json())
      .then(setUser)
      .catch(console.warn);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user.name || 'Aviral Garg'}</Text>
            <Text style={styles.bio}>{user.bio || 'Tech Enthusiast  | Innovator | Problem Solver'}</Text>
          </View>
          <Pressable style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#007AFF" />
          </Pressable>
        </View>

        <View style={styles.stats}>

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <Pressable
                key={index}
                style={styles.actionButton}
                onPress={() =>
                  Alert.alert('Quick Action', action.label)
                }
              >
                <MaterialCommunityIcons name={action.icon} size={24} color="#007AFF" />
                <Text style={styles.actionLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {[
            {
              title: '10K Runner',
              description: 'Completed first 10K run',
              date: 'March 8, 2024',
            },
            {
              title: 'Workout Streak',
              description: '30 days consecutive workouts',
              date: 'March 1, 2024',
            },
          ].map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <MaterialCommunityIcons name="medal-outline" size={24} color="#007AFF" />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
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
    color: '#1c1c1e',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    textAlign: 'center',
  },
  settingsButton: {
    padding: 8,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1c1c1e',
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
    color: '#1c1c1e',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1c1c1e',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  achievementInfo: {
    marginLeft: 16,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1c1c1e',
  },
  achievementDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    marginTop: 2,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8e8e93',
    marginTop: 4,
  },
});