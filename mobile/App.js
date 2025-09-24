"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { View, StatusBar } from "react-native"
import { useAppStore } from "./src/store/useAppStore"
import { useThemeMeta } from "./src/store/themeStore"

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
import ProfileScreen from "./src/screens/ProfileScreen"
import PostNewScreen from "./src/screens/PostNewScreen"
import PostDetailScreen from "./src/screens/PostDetailScreen"
import NotificationsScreen from "./src/screens/NotificationsScreen"
import ChatScreen from "./src/screens/ChatScreen"
import ProfileEditScreen from "./src/screens/ProfileEditScreen"
import SettingsScreen from "./src/screens/SettingsScreen"
import ExploreAllScreen from "./src/screens/ExploreAllScreen"
import PrivacyPolicyScreen from "./src/screens/legal/PrivacyPolicyScreen"
import TermsScreen from "./src/screens/legal/TermsScreen"
import KvkkScreen from "./src/screens/legal/KvkkScreen"
import NotificationSettingsScreen from "./src/screens/settings/NotificationSettingsScreen"
import SupportScreen from "./src/screens/settings/SupportScreen"
import HelpScreen from "./src/screens/HelpScreen"
import FeedbackScreen from "./src/screens/FeedbackScreen"
import ReportIssueScreen from "./src/screens/ReportIssueScreen"
import SuccessScreen from "./src/screens/SuccessScreen"
import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  const { colors: ui } = useThemeMeta()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Home") iconName = focused ? "home" : "home-outline"
          else if (route.name === "Explore") iconName = focused ? "compass" : "compass-outline"
          else if (route.name === "PostNew") iconName = "add"
          else if (route.name === "Messages") iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline"

          if (route.name === "PostNew") {
            return (
              <View style={{
                width: 56, height: 56, borderRadius: 28, backgroundColor: ui.primary,
                justifyContent: "center", alignItems: "center", marginTop: -20,
                shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3,
                shadowRadius: 8, elevation: 8,
              }}>
                <Ionicons name={iconName} size={24} color="white" />
              </View>
            )
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: ui.primary,
        tabBarInactiveTintColor: ui.subtext,
        headerShown: false,
        tabBarStyle: { height: 80, paddingBottom: 20, paddingTop: 10, backgroundColor: ui.surface, borderTopColor: ui.border, borderTopWidth: 1 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Ana Sayfa" }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: "Keşfet" }} />
      <Tab.Screen name="PostNew" component={PostNewScreen} options={{ title: "", tabBarLabel: () => null }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: "Mesajlar" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { isLoggedIn, needsOnboarding } = useAppStore()
  const { colors: ui, isDark } = useThemeMeta()

  const navTheme = {
    dark: isDark,
    colors: {
      primary: ui.primary,
      background: ui.background,
      card: ui.surface,
      text: ui.text,
      border: ui.border,
      notification: ui.primary,
    },
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={ui.background} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        ) : needsOnboarding ? (
          // Onboarding Stack
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="ExploreAll" component={ExploreAllScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="KVKK" component={KvkkScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return <AppNavigator />
}
