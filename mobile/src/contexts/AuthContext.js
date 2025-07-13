"use client"

import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from "expo-location"
import * as Google from "expo-auth-session/providers/google"

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)

  // Google OAuth setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  })

  useEffect(() => {
    checkAuthState()
    requestLocationPermission()
  }, [])

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      handleGoogleSignIn(authentication)
    }
  }, [response])

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken")
      const userData = await AsyncStorage.getItem("userData")

      if (token && userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setLoading(false)
    }
  }

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation)
      }
    } catch (error) {
      console.error("Location permission error:", error)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      return { success: false, error: "Bağlantı hatası" }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      return { success: false, error: "Bağlantı hatası" }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async (authentication) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authentication.accessToken }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
      }
    } catch (error) {
      console.error("Google sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken")
      await AsyncStorage.removeItem("userData")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const value = {
    user,
    loading,
    location,
    login,
    register,
    logout,
    signInWithGoogle: () => promptAsync(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
