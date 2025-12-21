import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { categories, Category } from '../data/categories';
import { services, Service as ServiceType } from '../data/services';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';

type CategoryScreenProps = StackScreenProps<RootStackParamList, 'Category'>;

const CategoryScreen: React.FC<CategoryScreenProps> = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params as { categoryId: string; categoryName: string };

  const filteredServices = useMemo(() => {
    return services.filter(service => service.category === String(categoryId));
  }, [categoryId]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: categoryName || 'Category Details' });
  }, [navigation, categoryName]);

  const handleServicePress = (service: ServiceType) => {
    navigation.navigate('ServiceDetail', { serviceId: service.id });
  };
  
  const renderServiceItem = useCallback(({ item }: { item: ServiceType }) => (
    <View style={styles.serviceContainer}>
        <ServiceCard service={item} onPress={handleServicePress} />
    </View>
  ), []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>{categoryName} Services</Text>
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No services found for this category.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    padding: Spacing.medium,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listContent: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  serviceContainer: {
    marginVertical: Spacing.tiny,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.large,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default CategoryScreen;
