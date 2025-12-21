import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';
import { addRequest } from '../data/requests';

type UnlistedServiceScreenProps = StackScreenProps<RootStackParamList, 'UnlistedService'>;

const UnlistedServiceScreen: React.FC<UnlistedServiceScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addRequest(
      {
        serviceId: 'unlisted',
        serviceName: title,
        userName: 'User', // Placeholder
        phone: phone,
        address: 'N/A',
        description: description,
      },
      () => {
        navigation.navigate('Home');
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Request Unlisted Service</Text>
        <Text style={styles.subtitle}>
          Can't find what you're looking for? Tell us what you need.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Service Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Solar Panel Cleaning"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Detailed Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your requirement in detail..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Contact Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Spacing.xl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  form: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: Spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: Spacing.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: Spacing.xs,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    fontSize: Spacing.md,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  submitButtonText: {
    color: Colors.cardBackground,
    fontWeight: '700',
    fontSize: Spacing.md,
  },
});

export default UnlistedServiceScreen;