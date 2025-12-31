import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ForumPost, ForumReply, MOCK_FORUM_REPLIES } from '../../data/forumMockData';
import { Colors } from '../../theme/colors';
import AdminReplyBox from '../../components/forum/AdminReplyBox';

type ForumDetailScreenRouteProp = RouteProp<{ ForumDetail: { post: ForumPost } }, 'ForumDetail'>;
type ForumDetailScreenNavigationProp = StackNavigationProp<any, 'ForumDetail'>;

interface ForumDetailScreenProps {
  route: ForumDetailScreenRouteProp;
  navigation: ForumDetailScreenNavigationProp;
}

// Mock flag for admin status
const isAdmin = true; // Set to false to test as a regular user
const currentUserId = 'user123'; // Mock current user ID

const ForumDetailScreen: React.FC<ForumDetailScreenProps> = ({ route }) => {
  const { post } = route.params;
  const [replies, setReplies] = useState<ForumReply[]>(
    MOCK_FORUM_REPLIES.filter(reply => reply.postId === post.id)
  );

  const handleReplySubmit = (replyText: string, visibility: 'PUBLIC' | 'PRIVATE') => {
    const newReply: ForumReply = {
      postId: post.id,
      adminId: 'admin1', // Mock admin ID
      replyText,
      visibility,
      createdAt: new Date().toISOString(),
    };
    setReplies(prev => [...prev, newReply]);
    MOCK_FORUM_REPLIES.push(newReply); // Add to mock data
    Alert.alert('Reply Posted', `Your reply has been posted as ${visibility}.`);
  };

  const visibleReplies = replies.filter(reply => {
    if (reply.visibility === 'PUBLIC') {
      return true;
    }
    // PRIVATE replies are visible only to the question creator and admin
    return isAdmin || post.userId === currentUserId;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.date}>Posted: {new Date(post.createdAt).toLocaleDateString()}</Text>

      <View style={styles.repliesSection}>
        <Text style={styles.repliesHeader}>Replies</Text>
        {visibleReplies.length === 0 ? (
          <Text style={styles.noRepliesText}>No replies yet.</Text>
        ) : (
          visibleReplies.map((reply, index) => (
            <View key={index} style={styles.replyCard}>
              <Text style={styles.replyText}>{reply.replyText}</Text>
              <Text style={styles.replyMeta}>Admin ({reply.visibility.toLowerCase()}) - {new Date(reply.createdAt).toLocaleDateString()}</Text>
            </View>
          ))
        )}
      </View>

      {isAdmin && <AdminReplyBox onSubmit={handleReplySubmit} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 20,
    textAlign: 'right',
  },
  repliesSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  repliesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  noRepliesText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
  replyCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  replyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  replyMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
});

export default ForumDetailScreen;
