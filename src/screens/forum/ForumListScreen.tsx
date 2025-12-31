import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MOCK_FORUM_POSTS, ForumPost } from '../../data/forumMockData';
import ForumCard from '../../components/forum/ForumCard';
import { Colors } from '../../theme/colors';

const ForumListScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: ForumPost }) => (
    <ForumCard
      post={item}
      onPress={(post) => navigation.navigate('ForumDetail', { post })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_FORUM_POSTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Community Forum</Text>
            <Text style={styles.headerSubtitle}>Ask questions and get expert advice</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateForumPost')}
      >
        <Text style={styles.fabText}>+ Ask a Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fabText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForumListScreen;
