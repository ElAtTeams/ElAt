"use client"

import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from "expo-location"
import * as Google from "expo-auth-session/providers/google"
import { __DEV__ } from "react-native"

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
  const [error, setError] = useState(null)

  // API Base URL - Change this to your backend URL
  const API_BASE_URL ="http://10.0.2.2:3001";
  // Test API connection
  const testApiConnection = async () => {
    try {
      console.log("Testing API connection...")
      const response = await fetch(`${API_BASE_URL}/health`)
      const data = await response.json()
      console.log("API health check response:", data)
      return true
    } catch (error) {
      console.error("API connection test failed:", error)
      return false
    }
  }

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
    testApiConnection() // Test API connection on mount
  }, [])

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      handleGoogleSignIn(authentication)
    }
  }, [response])

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const userData = await AsyncStorage.getItem("user")

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
      console.log("Login attempt:", { email, apiUrl: `${API_BASE_URL}/auth/login` })

      // Test API connection first
      const isApiAvailable = await testApiConnection()
      if (!isApiAvailable) {
        throw new Error("API sunucusuna bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.")
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("Login response status:", response.status)
      const data = await response.json()
      console.log("Login response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Giriş yapılamadı")
      }

      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      setUser(data.user)
      return { success: true }
    } catch (error) {
      console.error("Login error details:", error)
      return { 
        success: false, 
        error: error.message || "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." 
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (firstName, lastName, email, password) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Kayıt olunamadı")
      }

      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      setUser(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("token")

      if (!token) {
        throw new Error("Oturum bulunamadı")
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Şifre değiştirilemedi")
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Şifre sıfırlama bağlantısı gönderilemedi")
      }

      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Şifre sıfırlanamadı")
      }

      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      
      if (!token) {
        throw new Error("Oturum bulunamadı")
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Token yenilenemedi")
      }

      await AsyncStorage.setItem("token", data.token)
      if (data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    location,
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
    signInWithGoogle: () => promptAsync(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
