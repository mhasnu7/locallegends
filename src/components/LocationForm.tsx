import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';

export interface LocationData {
  address: string;
  area: string;
  landmark?: string;
  city: string;
  pincode: string;
}

interface LocationFormProps {
  address: string;
  setAddress: (text: string) => void;
  area: string;
  setArea: (text: string) => void;
  landmark: string;
  setLandmark: (text: string) => void;
  city: string;
  setCity: (text: string) => void;
  pincode: string;
  setPincode: (text: string) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ 
  address, 
  setAddress, 
  area, 
  setArea, 
  landmark, 
  setLandmark, 
  city, 
  setCity, 
  pincode, 
  setPincode 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Service Location</Text>
      
      <Text style={styles.label}>House / Flat / Street *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Flat 402, Sunshine Apartments"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor={Colors.textSecondary}
        editable={true} // Ensure editable property is explicitly set or not restricted
      />

      <Text style={styles.label}>Area / Locality *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Jubilee Hills"
        value={area}
        onChangeText={setArea}
        placeholderTextColor={Colors.textSecondary}
        editable={true}
      />

      <Text style={styles.label}>Landmark (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Near Apollo Hospital"
        value={landmark}
        onChangeText={setLandmark}
        placeholderTextColor={Colors.textSecondary}
        editable={true}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Hyderabad"
            value={city}
            onChangeText={setCity}
            placeholderTextColor={Colors.textSecondary}
            editable={true}
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Pincode *</Text>
          <TextInput
            style={styles.input}
            placeholder="6 digits"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor={Colors.textSecondary}
            editable={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.xs,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: Colors.cardBackground,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
});

export default LocationForm;
