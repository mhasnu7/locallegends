import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Removed: import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Category } from '../data/categories';
import { Spacing } from '../theme/spacing';
import { Colors } from '../theme/colors';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

// Helper function to map icon names to emojis
const getEmojiForCategory = (iconName: string): string => {
  switch (iconName) {
    case 'pipe-wrench': return '🔧'; // Plumbing
    case 'lightning-bolt': return '⚡'; // Electrical
    case 'broom': return '🧹'; // Cleaning
    case 'saw-blade': return '🪚'; // Carpentry
    case 'format-paint': return '🎨'; // Painting
    case 'leaf': return '🍃'; // Gardening
    case 'factory': return '🏭'; // Metal Fabrication
    case 'food-variant': return '🍽️'; // Catering
    case 'warehouse': return '📦'; // Wholesale Goods Purchase
    case 'car': return '🚗'; // Vehicle Rental
    default: return '❓'; // Default unknown icon
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.emojiIcon}>
          {getEmojiForCategory(category.icon)}
        </Text>
      </View>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '45%',
    margin: Spacing.xs,
    padding: Spacing.md,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    // iOS shadow for consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emojiIcon: {
    fontSize: 32, 
    lineHeight: 32,
  },
  name: {
    fontSize: Spacing.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});

export default CategoryCard;
