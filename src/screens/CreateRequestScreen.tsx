import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addRequest } from '../data/requests';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';
import LocationForm, { LocationData } from '../components/LocationForm';
import Geolocation from '@react-native-community/geolocation';

type CreateRequestScreenProps = StackScreenProps<RootStackParamList, 'CreateRequest'>;

const CreateRequestScreen: React.FC<CreateRequestScreenProps> = ({ route, navigation }) => {
  const { serviceId, serviceName } = route.params;

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<LocationData>({
    address: '',
    area: '',
    landmark: '',
    city: '',
    pincode: '',
  });
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationConfirmation, setLocationConfirmation] = useState<string | null>(null);

  const handleLocationChange = useCallback((newLocation: LocationData) => {
    setLocation(newLocation);
  }, []);

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
    // For other platforms, assume permission is handled elsewhere or is not required for this Android-first constraint
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
    // Location (address/area/etc) is required, but GPS coords are optional
    const isLocationValid = 
      location.address.trim() && 
      location.area.trim() && 
      location.city.trim() && 
      location.pincode.trim();

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
        address: `${location.address}, ${location.area}, ${location.city} - ${location.pincode}`,
        location: location,
        description,
        // Add optional coordinates to the request payload
        latitude,
        longitude,
      } as any,
      // @ts-ignore - existing code uses callback but implementation doesn't seem to support it
      () => {
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

        {/* Existing Location Form */}
        <LocationForm onLocationChange={handleLocationChange} />

        {/* New Location Feature UI */}
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
  // New styles for location feature
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
  // Existing submit button styles
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
