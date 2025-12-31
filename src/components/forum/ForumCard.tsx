import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ForumPost } from '../../data/forumMockData';
import { Colors } from '../../theme/colors';

interface ForumCardProps {
  post: ForumPost;
  onPress: (post: ForumPost) => void;
}

const ForumCard: React.FC<ForumCardProps> = ({ post, onPress }) => {
  const isAnswered = post.status === 'ANSWERED';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(post)} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {post.title}
        </Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: isAnswered ? Colors.success : '#FFA500' },
          ]}
        >
          <Text style={styles.badgeText}>{post.status}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {post.description}
      </Text>
      <Text style={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
});

export default ForumCard;
