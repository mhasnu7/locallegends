import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import MenuItem from './MenuItem';
import { Service } from '../data/services';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface HeaderMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigateToService: (service: Service) => void;
  onNavigateToAbout: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToForumList: () => void;
  onLogin: () => void;
  onAdminLogin: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  services: Service[];
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  isVisible,
  onClose,
  onNavigateToService,
  onNavigateToAbout,
  onNavigateToPrivacy,
  onNavigateToForumList,
  onLogin,
  onAdminLogin,
  onLogout,
  isLoggedIn,
  isAdmin,
  services,
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setShouldRender(false);
      });
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const menuItems = [
    { label: 'Forum', onPress: onNavigateToForumList },
    {
      label: isLoggedIn ? 'Logout' : 'User Login',
      onPress: isLoggedIn ? onLogout : onLogin,
    },
    ...(isAdmin ? [{ label: 'Admin Login', onPress: onAdminLogin }] : []),
    ...services.map((service) => ({
      label: service.serviceName,
      onPress: () => onNavigateToService(service),
    })),
    { label: 'About Us', onPress: onNavigateToAbout },
    { label: 'Privacy Policy', onPress: onNavigateToPrivacy },
  ];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={isVisible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.menuContainer,
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <ScrollView bounces={false}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={`${item.label}-${index}`}
              label={item.label}
              onPress={() => {
                item.onPress();
                onClose();
              }}
              index={index}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: Spacing.md,
    width: 260,
    maxHeight: SCREEN_HEIGHT * 0.7,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.sm,
    elevation: 6,
    overflow: 'hidden',
  },
});

export default HeaderMenu;
