import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CATEGORIES } from '../data/categories';
import { SERVICES } from '../data/services';
import CategoryCard from '../components/CategoryCard';
import PromotionsBanner from '../components/PromotionsBanner';
import HeaderMenu from '../components/HeaderMenu';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const [isAdmin, setIsAdmin] = useState(false); // Mock admin state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={toggleMenu}
          style={{ paddingHorizontal: Spacing.md }}
        >
          <Text style={{ fontSize: 24, color: Colors.cardBackground }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleMenu]);


  // Mock navigation functions for HeaderMenu
  const handleNavigateToService = (service: typeof SERVICES[0]) => {
    Alert.alert('Navigate to Service', `Navigating to ${service.serviceName}`);
    // In a real app: navigation.navigate('ServiceDetail', { serviceId: service.id });
  };

  const handleNavigateToAbout = () => {
    Alert.alert('About Us', 'This is the About Us section.');
  };

  const handleNavigateToPrivacy = () => {
    Alert.alert('Privacy Policy', 'This is the Privacy Policy section.');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    Alert.alert('Login', 'User logged in!');
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    Alert.alert('Admin Login', 'Admin logged in!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    Alert.alert('Logout', 'User logged out!');
  };

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('ServiceList', { categoryId, categoryName });
  };

  return (
    <View style={globalStyles.container}>
      {/* Promotions Section */}
      <PromotionsBanner />
      
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryCard 
            category={item} 
            onPress={() => handleCategoryPress(item.id, item.name)} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.unlistedButton} 
              onPress={() => navigation.navigate('UnlistedService')}
            >
              <Text style={styles.unbuttonEmojiIcon}>➕</Text> 
              <Text style={styles.unlistedButtonText}>Request Unlisted Service</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.adminButton} 
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <Text style={styles.adminButtonText}>Go to Admin Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <HeaderMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        onNavigateToService={handleNavigateToService}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToPrivacy={handleNavigateToPrivacy}
        onLogin={handleLogin}
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        services={SERVICES}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Spacing.xs,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  footer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  unlistedButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  unbuttonEmojiIcon: {
    fontSize: 24,
    color: Colors.cardBackground,
    marginRight: Spacing.sm,
  },
  unlistedButtonText: {
    color: Colors.cardBackground,
    fontWeight: '700',
    fontSize: Spacing.md,
  },
  adminButton: {
    backgroundColor: Colors.textSecondary,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    marginHorizontal: Spacing.xs,
    marginVertical: Spacing.md,
    alignItems: 'center',
    opacity: 0.8,
  },
  adminButtonText: {
    color: Colors.cardBackground,
    fontWeight: '600',
  }
});

export default HomeScreen;
