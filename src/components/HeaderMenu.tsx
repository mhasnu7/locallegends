import React, { useEffect, useRef } from 'react';
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
  onLogin,
  onAdminLogin,
  onLogout,
  isLoggedIn,
  isAdmin,
  services,
}) => {
  const [shouldRender, setShouldRender] = React.useState(isVisible);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [isVisible, animatedValue]);

  if (!shouldRender) {
    return null;
  }

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const menuItems = [
    { label: isLoggedIn ? 'Logout' : 'User Login', onPress: isLoggedIn ? onLogout : onLogin },
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
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <ScrollView style={styles.scrollView} bounces={false}>
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
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuContainer: {
    position: 'absolute',
    top: 60, // Adjust based on header height
    right: Spacing.md,
    width: 250,
    maxHeight: SCREEN_HEIGHT * 0.7,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  scrollView: {
    flexGrow: 0,
  },
});

export default HeaderMenu;
