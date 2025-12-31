import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';

interface AdminReplyBoxProps {
  onSubmit: (replyText: string, visibility: 'PUBLIC' | 'PRIVATE') => void;
}

const AdminReplyBox: React.FC<AdminReplyBoxProps> = ({ onSubmit }) => {
  const [replyText, setReplyText] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmit(replyText, visibility);
      setReplyText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Admin Reply</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your reply here..."
        multiline
        value={replyText}
        onChangeText={setReplyText}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, visibility === 'PUBLIC' && styles.selectedOption]}
          onPress={() => setVisibility('PUBLIC')}
        >
          <Text style={[styles.optionText, visibility === 'PUBLIC' && styles.selectedOptionText]}>
            Public
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, visibility === 'PRIVATE' && styles.selectedOption]}
          onPress={() => setVisibility('PRIVATE')}
        >
          <Text style={[styles.optionText, visibility === 'PRIVATE' && styles.selectedOptionText]}>
            Private
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  selectedOptionText: {
    color: '#FFF',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminReplyBox;
