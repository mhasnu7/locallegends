import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addRequest } from '../data/requests';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';

type CreateRequestScreenProps = StackScreenProps<RootStackParamList, 'CreateRequest'>;

const CreateRequestScreen: React.FC<CreateRequestScreenProps> = ({ route, navigation }) => {
  const { serviceId, serviceName } = route.params;

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!userName || !phone || !address || !description) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    addRequest(
      {
        serviceId,
        serviceName,
        userName,
        phone,
        address,
        description,
      },
      () => {
        // onSuccess callback: navigate back to Home
        navigation.popToTop(); 
      }
    );
  };

  const FormField: React.FC<{ label: string; value: string; onChangeText: (text: string) => void; multiline?: boolean; keyboardType?: 'default' | 'phone-pad' }> = ({
    label,
    value,
    onChangeText,
    multiline = false,
    keyboardType = 'default',
  }) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor={Colors.textSecondary}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.serviceTitle}>Requesting: {serviceName}</Text>
        
        <FormField
          label="User Name"
          value={userName}
          onChangeText={setUserName}
        />
        
        <FormField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <FormField
          label="Address"
          value={address}
          onChangeText={setAddress}
        />
        
        <FormField
          label="Request Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.md,
  },
  serviceTitle: {
    fontSize: Spacing.lg,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Spacing.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.xs,
    padding: Spacing.sm,
    fontSize: Spacing.md,
    color: Colors.textPrimary,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  submitButtonText: {
    color: Colors.cardBackground,
    fontSize: Spacing.lg,
    fontWeight: 'bold',
  },
});

export default CreateRequestScreen;
