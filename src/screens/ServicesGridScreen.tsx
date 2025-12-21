import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceCard from '../components/ServiceCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Assuming AppNavigator defines RootStackParamList
import colors from '../theme/colors';

type ServicesGridScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServicesGrid'>;

interface ServicesGridScreenProps {
  navigation: ServicesGridScreenNavigationProp;
}

const servicesData = [
  { id: '1', name: 'Plumbing', icon: 'pipe-wrench', color: colors.blue },
  { id: '2', name: 'Electrical', icon: 'flash', color: colors.yellow },
  { id: '3', name: 'Cleaning', icon: 'broom', color: colors.green },
  { id: '4', name: 'Carpentry', icon: 'hammer-screwdriver', color: colors.brown },
  { id: '5', name: 'Painting', icon: 'paint-roller', color: colors.red },
  { id: '6', name: 'Gardening', icon: 'flower', color: colors.darkGreen },
  { id: '7', name: 'Metal Fabrication', icon: 'wrench-cog', color: colors.grey },
];

const ServicesGridScreen: React.FC<ServicesGridScreenProps> = ({ navigation }) => {
  const renderServiceCard = ({ item }: { item: typeof servicesData[0] }) => (
    <ServiceCard
      serviceName={item.name}
      iconName={item.icon}
      iconColor={item.color}
      onPress={() => {
        // Handle navigation to service details or request screen
        console.log(`Navigating to ${item.name}`);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={servicesData}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
      <TouchableOpacity
        style={styles.unlistedServiceButton}
        onPress={() => {
          // Handle navigation to unlisted service request screen
          console.log('Request Unlisted Service');
        }}
      >
        <MaterialCommunityIcons name="plus-circle-outline" size={20} color={colors.white} />
        <Text style={styles.unlistedServiceButtonText}>Request Unlisted Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  gridContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  unlistedServiceButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  unlistedServiceButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ServicesGridScreen;
