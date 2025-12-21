import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/theme/colors';

const App: React.FC = () => {
  return (
    // SafeAreaView is used to ensure content doesn't overlap status bar/notches
    <SafeAreaView style={styles.safeArea}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary, // Color of the status bar area
  },
});

export default App;
