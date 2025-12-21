import { StyleSheet } from 'react-native';

// Basic color palette for a clean look
export const Colors = {
  primary: '#007AFF', // A standard vibrant blue
  secondary: '#5856D6', // A nice purple/indigo for accents
  background: '#F5F5F7', // Light grey background
  cardBackground: '#FFFFFF', // White for cards
  textPrimary: '#1C1C1E', // Dark text
  textSecondary: '#8E8E93', // Grey text for subtitles
  success: '#34C759',
  danger: '#FF3B30',
  border: '#E5E5E5', // Added border color
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Add more base styles as needed
});
