import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';

// Mock stats — replace with real data fetched from your backend
const STATS = [
  { label: 'Rides', value: 128 },
  { label: 'Followers', value: '2.4K' },
  { label: 'Following', value: 312 },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color={colors.chrome} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileTop}>
          <Image
            source={{ uri: 'https://placehold.co/120x120/2B2B2B/FF6A3D?text=%F0%9F%8F%8D%EF%B8%8F' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user?.username || 'rider_username'}</Text>
          <Text style={styles.bio}>Riding Route 66 one mile at a time. 🛣️</Text>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Bike</Text>
          <Text style={styles.sectionText}>2023 Harley-Davidson Road King</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Livestreams</Text>
          <Text style={styles.sectionText}>No livestreams yet — go live from the Livestream tab!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.asphalt,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.sunsetOrange,
  },
  username: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  bio: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 14,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.chrome,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editButtonText: {
    color: colors.chromeLight,
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.asphaltLight,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.sunsetOrange,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionText: {
    color: colors.muted,
    fontSize: 14,
  },
});
