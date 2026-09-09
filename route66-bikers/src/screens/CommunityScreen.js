import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import colors from '../theme/colors';

// Mock data — replace with real posts fetched from your backend/database
const MOCK_POSTS = [
  {
    id: '1',
    username: 'road_warrior_88',
    timestamp: '2h ago',
    caption: 'Sunset ride through the desert stretch of Route 66. Nothing beats this view. 🏍️🌅',
    imageUrl: 'https://placehold.co/600x400/1A1A1A/FF6A3D?text=Ride+Photo',
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    username: 'chrome_n_steel',
    timestamp: '5h ago',
    caption: 'New exhaust install done. She sounds mean now. Anyone else running Vance & Hines?',
    likes: 19,
    comments: 12,
  },
  {
    id: '3',
    username: 'route66_rachel',
    timestamp: '1d ago',
    caption: 'Group ride this Saturday leaving from the old diner at 8am. Who is in?',
    likes: 65,
    comments: 24,
  },
];

export default function CommunityScreen() {
  const [posts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    // TODO: wire this up to your backend to actually create a post
    setNewPost('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Community</Text>

      <View style={styles.composer}>
        <TextInput
          style={styles.composerInput}
          placeholder="Share something with the club..."
          placeholderTextColor={colors.muted}
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Ionicons name="send" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.asphalt,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    marginTop: 12,
    marginBottom: 14,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.asphaltLight,
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
  },
  composerInput: {
    flex: 1,
    color: colors.white,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  postButton: {
    backgroundColor: colors.sunsetOrange,
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
});
