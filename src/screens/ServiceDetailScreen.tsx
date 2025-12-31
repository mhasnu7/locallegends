import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getServiceById } from '../data/services';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';

type ServiceDetailScreenProps = StackScreenProps<RootStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <Text style={styles.errorText}>Service not found.</Text>
      </View>
    );
  }

  const handleCreateRequest = () => {
    navigation.navigate('CreateRequest', { 
      serviceId: service.id, 
      serviceName: service.serviceName 
    });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${service.phone}`);
  };

  const handleWhatsApp = () => {
    // Clean the phone number (remove spaces, etc.)
    const cleanPhone = service.phone.replace(/\D/g, '');
    // WhatsApp URL scheme (works for both Android and iOS)
    const url = `whatsapp://send?phone=${cleanPhone}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        // Fallback to web URL if WhatsApp app is not installed
        return Linking.openURL(`https://wa.me/${cleanPhone}`);
      }
    });
  };

  const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerCard}>
          <Text style={styles.serviceName}>{service.serviceName}</Text>
          <Text style={styles.providerName}>{service.providerName}</Text>
        </View>

        <View style={styles.detailsBox}>
          <DetailItem label="Area" value={service.area} />
          <DetailItem label="Owner" value={service.owner} />
          <DetailItem label="Phone" value={service.phone} />
          <DetailItem label="Location" value={service.location} />
          
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonEmoji}>📞</Text>
            <Text style={styles.callButtonText}>Call Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
            <Text style={styles.whatsappButtonEmoji}>💬</Text>
            <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.descriptionHeader}>Description</Text>
        <Text style={styles.descriptionText}>{service.description}</Text>
      </ScrollView>

      {/* VERY IMPORTANT: BIG PRIMARY BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createRequestButton} 
          onPress={handleCreateRequest}
        >
          <Text style={styles.buttonText}>CREATE REQUEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: Spacing.md,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: Spacing.md,
    color: Colors.danger,
  },
  headerCard: {
    marginBottom: Spacing.lg,
  },
  serviceName: {
    fontSize: Spacing.xl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  providerName: {
    fontSize: Spacing.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  detailsBox: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    fontSize: Spacing.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  value: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    maxWidth: '60%',
    textAlign: 'right',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  callButtonText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
    fontSize: Spacing.md,
  },
  callButtonEmoji: {
    fontSize: 20,
    color: Colors.cardBackground,
  },
  whatsappButton: {
    flexDirection: 'row',
    backgroundColor: '#25D366', // WhatsApp green
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  whatsappButtonText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
    fontSize: Spacing.md,
  },
  whatsappButtonEmoji: {
    fontSize: 20,
    color: Colors.cardBackground,
  },
  descriptionHeader: {
    fontSize: Spacing.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  descriptionText: {
    fontSize: Spacing.md,
    color: Colors.textPrimary,
    lineHeight: Spacing.lg,
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.cardBackground,
  },
  createRequestButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.cardBackground,
    fontSize: Spacing.lg,
    fontWeight: 'bold',
  },
});

export default ServiceDetailScreen;
