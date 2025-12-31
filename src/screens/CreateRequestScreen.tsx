import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addRequest } from '../data/requests';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';
import LocationForm from '../components/LocationForm';
import Geolocation from '@react-native-community/geolocation';

type CreateRequestScreenProps = StackScreenProps<RootStackParamList, 'CreateRequest'>;

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

const CreateRequestScreen: React.FC<CreateRequestScreenProps> = ({ route, navigation }) => {
  const { serviceId, serviceName } = route.params as { serviceId: string, serviceName: string };

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationConfirmation, setLocationConfirmation] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal Info, 2: Location & Description

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Localites needs access to your location to set your request address.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; 
  };

  const handleUseCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot fetch location without permission. Please grant location access in your device settings.'
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        setLocationConfirmation(`Location added: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      },
      (error) => {
        Alert.alert('Location Error', `Could not get location: ${error.message}`);
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSubmit = () => {
    const isLocationValid = 
      address.trim() && 
      area.trim() && 
      city.trim() && 
      pincode.trim();

    if (!userName || !phone || !description || !isLocationValid) {
      Alert.alert('Missing Fields', 'Please fill in all required fields including location details.');
      return;
    }

    addRequest(
      {
        serviceId,
        serviceName,
        userName,
        phone,
        address: `${address}, ${area}, ${city} - ${pincode}`,
        location: { address, area, landmark, city, pincode },
        description,
        latitude,
        longitude,
      } as any
    );
    navigation.popToTop(); 
  };

  const handleNext = () => {
    if (!userName.trim() || !phone.trim()) {
      Alert.alert('Required Details', 'Please enter your name and phone number before proceeding.');
      return;
    }
    setCurrentStep(2);
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="always">
        <Text style={styles.serviceTitle}>Requesting: {serviceName}</Text>
        
        {currentStep === 1 ? (
          <View>
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

            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
              <Text style={styles.submitButtonText}>Next Section</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.backButtonText}>← Edit Name & Phone</Text>
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
              <Text style={styles.locationButtonText}>Use My Current Location</Text>
            </TouchableOpacity>
            
            {locationConfirmation && (
              <Text style={styles.confirmationText}>{locationConfirmation}</Text>
            )}

            <FormField
              label="Request Description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        )}
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
  locationButton: {
    backgroundColor: Colors.secondary,
    padding: Spacing.sm,
    borderRadius: Spacing.xs,
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  locationButtonText: {
    color: Colors.cardBackground,
    fontSize: Spacing.md,
    fontWeight: '600',
  },
  confirmationText: {
    color: Colors.success,
    fontSize: Spacing.sm,
    textAlign: 'center',
    marginBottom: Spacing.md,
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
  backButton: {
    marginBottom: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: Spacing.md,
    fontWeight: '600',
  },
});

export default CreateRequestScreen;
