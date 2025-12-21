import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import LottieView from 'lottie-react-native';

const SplashScreen: React.FC<StackScreenProps<RootStackParamList, 'Splash'>> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2500); // Increased duration to enjoy the animation
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/splash/splash.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
      <Text style={styles.title}>LocalLegends</Text>
      <Text style={styles.subtitle}>Your Trusted Local Services Partner</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  lottieContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: '80%',
    height: '80%',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
    zIndex: 1,
    marginTop: 200, // Push text down to not overlap main animation area
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    zIndex: 1,
  },
});

export default SplashScreen;
