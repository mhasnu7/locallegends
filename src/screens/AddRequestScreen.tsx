import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { addRequest } from '../data/requests';
import LocationForm, { LocationData } from '../components/LocationForm';

// Fix TS error by using 'any' for route.params temporarily if RootStackParamList modification is later
type AddRequestScreenProps = StackScreenProps<any, 'AddRequest'>;

const AddRequestScreen: React.FC<AddRequestScreenProps> = ({ route, navigation }) => {
  const { serviceName } = route.params || { serviceName: 'Service' };

  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSubmit = () => {
    const isLocationValid = 
      address.trim() && 
      area.trim() && 
      city.trim() && 
      pincode.trim();

    if (!userName || !phoneNumber || !description || !isLocationValid) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addRequest({
      serviceType: serviceName,
      description: description,
      phone: phoneNumber,
      // @ts-ignore - passing extra info for record keeping if needed
      userName,
      address: `${address}, ${area}, ${city} - ${pincode}`,
      location: { address, area, landmark, city, pincode } as LocationData,
      // Assuming no GPS coordinates are set for simplicity on this screen
    } as any);

    Alert.alert(
      'Success',
      'Your request has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.popToTop(),
        },
      ]
    );
  };

  const isFormValid = !!(userName && phoneNumber && description && address && area && city && pincode);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Submit Request</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Service Name</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={serviceName}
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <LocationForm 
          address={address}
          setAddress={setAddress}
          area={area}
          setArea={setArea}
          landmark={landmark}
          setLandmark={setLandmark}
          city={city}
          setCity={setCity}
          pincode={pincode}
          setPincode={setPincode}
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description of Request</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us more about your requirements"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, !isFormValid && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.xs,
    padding: Spacing.md,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  disabledInput: {
    backgroundColor: Colors.border,
    color: Colors.textSecondary,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Spacing.xs,
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRequestScreen;
