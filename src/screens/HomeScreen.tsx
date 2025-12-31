import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
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

  // 🔐 Mock auth state (we’ll replace later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /* =====================
     HEADER MENU TOGGLE
     ===================== */
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
  }, [navigation]);

  /* =====================
     NAVIGATION HANDLERS
     ===================== */

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('ServiceList', { categoryId, categoryName });
  };

  const handleNavigateToService = (service: typeof SERVICES[0]) => {
    Alert.alert('Service Selected', service.serviceName);
  };

  const handleNavigateToForumList = () => {
    navigation.navigate('ForumList');
  };

  const handleNavigateToAbout = () => {
    Alert.alert('About Us', 'Local Legends helps you find trusted local services.');
  };

  const handleNavigateToPrivacy = () => {
    Alert.alert('Privacy Policy', 'Your data is safe with us.');
  };

  /* =====================
     AUTH MOCK ACTIONS
     ===================== */

  const handleLogin = () => {
    setIsLoggedIn(true);
    Alert.alert('Login', 'User logged in (mock)');
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    Alert.alert('Admin Login', 'Admin logged in (mock)');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    Alert.alert('Logout', 'Logged out');
  };

  /* =====================
     UI
     ===================== */

  return (
    <View style={globalStyles.container}>
      {/* 🔥 Promotions Section */}
      <PromotionsBanner />

      {/* 🔲 Categories Grid */}
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
            {/* ➕ Unlisted Service */}
            <TouchableOpacity
              style={styles.unlistedButton}
              onPress={() => navigation.navigate('UnlistedService')}
            >
              <Text style={styles.unbuttonEmojiIcon}>➕</Text>
              <Text style={styles.unlistedButtonText}>
                Request Unlisted Service
              </Text>
            </TouchableOpacity>

            {/* 🛠 Admin Dashboard */}
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <Text style={styles.adminButtonText}>
                Go to Admin Dashboard
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ☰ Header Menu */}
      <HeaderMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        onNavigateToService={handleNavigateToService}
        onNavigateToForumList={handleNavigateToForumList}
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
    elevation: 6,
  },
  unbuttonEmojiIcon: {
    fontSize: 22,
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
    opacity: 0.85,
  },
  adminButtonText: {
    color: Colors.cardBackground,
    fontWeight: '600',
  },
});

export default HomeScreen;
