import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ServiceListScreen from '../screens/ServiceListScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import CreateRequestScreen from '../screens/CreateRequestScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import UnlistedServiceScreen from '../screens/UnlistedServiceScreen';
import ForumListScreen from '../screens/forum/ForumListScreen';
import ForumDetailScreen from '../screens/forum/ForumDetailScreen';
import CreateForumPostScreen from '../screens/forum/CreateForumPostScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { Colors } from '../theme/colors';
import { ForumPost } from '../data/forumMockData';
import { Spacing } from '../theme/spacing';
import { TouchableOpacity, Text } from 'react-native';

// Define the parameter list for the root stack navigator
export type RootStackParamList = {
  Splash: undefined;
  Home: { toggleMenu: () => void } | undefined;
  ServiceList: { categoryId: string; categoryName: string };
  ServiceDetail: { serviceId: string };
  AddRequest: { serviceName: string }; // Changed from CreateRequest to AddRequest based on usage in AddRequestScreen
  CreateRequest: { serviceId: string; serviceName: string }; // Keeping CreateRequest for compatibility if it's used elsewhere
  AdminDashboard: undefined;
  UnlistedService: undefined;
  ForumList: undefined;
  CreateForumPost: undefined;
  ForumDetail: { post: ForumPost };
  Gallery: { categoryId: string; categoryTitle: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.cardBackground,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'LocalLegends',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: '900',
              fontSize: 22,
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  (navigation.getState().routes.find(r => r.name === 'Home')?.params as any)?.toggleMenu();
                }}
                style={{ paddingHorizontal: Spacing.md }}
              >
                <Text style={{ fontSize: 24, color: Colors.cardBackground }}>☰</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ServiceList"
          component={ServiceListScreen}
          options={({ route }) => ({ title: route.params.categoryName })}
        />
        <Stack.Screen
          name="ServiceDetail"
          component={ServiceDetailScreen}
          options={{ title: 'Service Details' }}
        />
        <Stack.Screen
          name="CreateRequest"
          component={CreateRequestScreen}
          options={{ title: 'New Service Request' }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ title: 'Admin Dashboard' }}
        />
        <Stack.Screen
          name="UnlistedService"
          component={UnlistedServiceScreen}
          options={{ title: 'Request Unlisted Service' }}
        />
        <Stack.Screen
          name="ForumList"
          component={ForumListScreen}
          options={{ title: 'Community Forum' }}
        />
        <Stack.Screen
          name="CreateForumPost"
          component={CreateForumPostScreen}
          options={{ title: 'Ask a Question' }}
        />
        <Stack.Screen
          name="ForumDetail"
          component={ForumDetailScreen}
          options={{ title: 'Question Details' }}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={({ route }) => ({ title: route.params.categoryTitle + ' Gallery' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
