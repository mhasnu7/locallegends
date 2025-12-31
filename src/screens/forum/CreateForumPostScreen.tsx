import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../theme/colors';
import { MOCK_FORUM_POSTS } from '../../data/forumMockData';

const CreateForumPostScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in both title and description.');
      return;
    }

    const newPost = {
      id: String(MOCK_FORUM_POSTS.length + 1),
      userId: 'currentUser123', // Mock user ID
      title,
      description,
      createdAt: new Date().toISOString(),
      status: 'PENDING' as 'PENDING',
    };

    MOCK_FORUM_POSTS.unshift(newPost); // Add to the beginning for immediate visibility
    Alert.alert('Success', 'Your question has been posted!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask a New Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Question Title (e.g., Cost for cab from Bangalore to Mysore)"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Full description of your question (multiline)"
        multiline
        value={description}
        onChangeText={setDescription}
        numberOfLines={6}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  descriptionInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateForumPostScreen;
