import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Auth Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from './src/screens/HomeScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import PostNewScreen from './src/screens/PostNewScreen';
import ProfileScreen from './src/screens/ProfileScreen';

  import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'PostNew':
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            break;
          case 'Messages':
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      tabBarActiveTintColor: '#10b981',
      tabBarInactiveTintColor: '#9ca3af',
      tabBarShowLabel: true,
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        height: 60,
        paddingBottom: 8,
      },
      headerShown: false,
      })}
    >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Ana Sayfa',
      }}
    />
    <Tab.Screen
      name="PostNew"
      component={PostNewScreen}
      options={{
        title: 'Yeni Görev',
      }}
    />
    <Tab.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        title: 'Mesajlar',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profil',
      }}
    />
    </Tab.Navigator>
  );

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'modal',
            }}
          >
            <Stack.Screen name="MainApp" component={MainTabs} />
            <Stack.Screen
              name="PostDetail"
              component={PostDetailScreen}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}