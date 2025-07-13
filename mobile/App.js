"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { AuthProvider, useAuth } from "./src/contexts/AuthContext"

// Auth Screens
import WelcomeScreen from "./src/screens/WelcomeScreen"
import LoginScreen from "./src/screens/auth/LoginScreen"
import RegisterScreen from "./src/screens/auth/RegisterScreen"
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen"
import ResetPasswordScreen from "./src/screens/auth/ResetPasswordScreen"
import ChangePasswordScreen from "./src/screens/auth/ChangePasswordScreen"

// Main Screens
import HomeScreen from "./src/screens/HomeScreen"
import ExploreScreen from "./src/screens/ExploreScreen"
import MessagesScreen from "./src/screens/MessagesScreen"
import NotificationsScreen from "./src/screens/NotificationsScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import PostNewScreen from "./src/screens/PostNewScreen"
import PostDetailScreen from "./src/screens/PostDetailScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline"
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Ana Sayfa" }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: "Keşfet" }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: "Mesajlar" }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: "Bildirimler" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
    </Tab.Navigator>
  )
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="PostNew" component={PostNewScreen} options={{ title: "Yeni Gönderi" }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: "Gönderi Detayı" }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return null // You can add a loading screen here
  }

  return <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}
