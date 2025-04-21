import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TAB_ICON_SIZE = 24;

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#2A2A2A',
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00E676',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
          fontFamily: 'SpaceGrotesk-Regular',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" size={TAB_ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="navigation"
        options={{
          title: 'Navigate',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-outline" size={TAB_ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" size={TAB_ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}