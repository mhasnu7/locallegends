import React, { useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';

interface MenuItemProps {
  label: string;
  onPress: () => void;
  index: number;
  style?: ViewStyle;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onPress, index, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [index, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  text: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

export default MenuItem;
