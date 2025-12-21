import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../data/services';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';

type ServiceListScreenProps = StackScreenProps<RootStackParamList, 'ServiceList'>;

const ServiceListScreen: React.FC<ServiceListScreenProps> = ({ route, navigation }) => {
  const { categoryId } = route.params;

  // Filter services based on the selected categoryId
  const filteredServices = SERVICES.filter(service => service.categoryId === categoryId);

  const handleViewDetails = (serviceId: string) => {
    navigation.navigate('ServiceDetail', { serviceId });
  };

  return (
    <View style={globalStyles.container}>
      {filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ServiceCard service={item} onViewDetails={handleViewDetails} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No service providers found in this category.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  }
});

export default ServiceListScreen;
