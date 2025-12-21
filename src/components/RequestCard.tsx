import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceRequest } from '../data/requests';
import { Spacing } from '../theme/spacing';
import { Colors } from '../theme/colors';

interface RequestCardProps {
  request: ServiceRequest;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.service}>{request.serviceName}</Text>
        <Text style={styles.userName}>User: {request.userName}</Text>
        <Text style={styles.phone}>Phone: {request.phone}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, request.status === 'Pending' ? styles.pending : styles.completed]}>
          {request.status}
        </Text>
      </View>
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
  },
  service: {
    fontSize: Spacing.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userName: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  phone: {
    fontSize: Spacing.sm,
    color: Colors.textSecondary,
  },
  statusContainer: {
    padding: Spacing.sm / 2,
    borderRadius: Spacing.xs,
    alignSelf: 'flex-start',
  },
  status: {
    fontWeight: '600',
    fontSize: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Spacing.xs,
    overflow: 'hidden', // Required for borderRadius on Android text
  },
  pending: {
    color: Colors.danger,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  completed: {
    color: Colors.success,
    backgroundColor: 'rgba(52, 199, 85, 0.1)',
  },
});

export default RequestCard;
