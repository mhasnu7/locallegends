import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../data/services';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';

type ServiceListScreenProps = StackScreenProps<RootStackParamList, 'ServiceList'>;

const ServiceListScreen: React.FC<ServiceListScreenProps> = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;

  // Filter services based on the selected categoryId
  const filteredServices = SERVICES.filter(service => service.categoryId === categoryId);

  const handleViewDetails = (serviceId: string) => {
    navigation.navigate('ServiceDetail', { serviceId });
  };

  const handleViewGallery = () => {
    navigation.navigate('Gallery', { categoryId, categoryTitle: categoryName });
  };

  const renderHeader = () => {
    // Check if the current category is Metal Fabrication (categoryId '7')
    if (categoryId === '7') {
      return (
        <View style={styles.galleryHeader}>
          <Text style={styles.galleryTitle}>See my work</Text>
          <TouchableOpacity style={styles.galleryLink} onPress={handleViewGallery}>
            <Text style={styles.galleryLinkText}>View Gallery &gt;</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
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
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          {renderHeader()}
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
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  galleryTitle: {
    fontSize: Spacing.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  galleryLink: {
    padding: Spacing.sm,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
  },
  galleryLinkText: {
    color: Colors.cardBackground,
    fontWeight: '600',
    fontSize: Spacing.sm,
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
