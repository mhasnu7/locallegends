import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Service } from '../data/services';
import { Spacing } from '../theme/spacing';
import { Colors } from '../theme/colors';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.providerName}>{service.providerName}</Text>
        <Text style={styles.serviceName}>{service.serviceName}</Text>
        <Text style={styles.area}>Area: {service.area}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onViewDetails(service.id)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  providerName: {
    fontSize: Spacing.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  serviceName: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  area: {
    fontSize: Spacing.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.xs,
  },
  buttonText: {
    color: Colors.cardBackground,
    fontWeight: '600',
    fontSize: Spacing.sm,
  },
});

export default ServiceCard;
