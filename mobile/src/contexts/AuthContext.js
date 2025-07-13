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

  // API Base URL - Change this to your backend URL
  const API_BASE_URL = __DEV__ ? "http://localhost:3000" : "https://your-production-domain.com"

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
        // Verify token with backend
        const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          // Token is invalid, clear storage
          await clearAuthData()
        }
      }
    } catch (error) {
      console.error("Auth check error:", error)
      await clearAuthData()
    } finally {
      setLoading(false)
    }
  }

  const clearAuthData = async () => {
    await AsyncStorage.multiRemove(["userToken", "refreshToken", "userData", "rememberMe"])
    setUser(null)
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

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("refreshToken", data.refreshToken)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))

        if (rememberMe) {
          await AsyncStorage.setItem("rememberMe", "true")
        }

        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." }
    } finally {
      setLoading(false)
    }
  }

  const register = async (firstName, lastName, email, password) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("refreshToken", data.refreshToken)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, error: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." }
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      return { success: false, error: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." }
    }
  }

  const resetPassword = async (token, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Reset password error:", error)
      return { success: false, error: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." }
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = await AsyncStorage.getItem("userToken")

      if (!token) {
        return { success: false, error: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." }
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, message: data.message }
      } else {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshResult = await refreshToken()
          if (refreshResult.success) {
            // Retry with new token
            return await changePassword(currentPassword, newPassword)
          } else {
            await logout()
            return { success: false, error: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." }
          }
        }
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Change password error:", error)
      return { success: false, error: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." }
    }
  }

  const handleGoogleSignIn = async (authentication) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authentication.accessToken }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("refreshToken", data.refreshToken)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Google sign in error:", error)
      return { success: false, error: "Google ile giriş yapılamadı" }
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const refreshTokenValue = await AsyncStorage.getItem("refreshToken")

      if (!refreshTokenValue) {
        throw new Error("No refresh token")
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token)
        await AsyncStorage.setItem("userData", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        // Refresh token is invalid, logout user
        await logout()
        return { success: false }
      }
    } catch (error) {
      console.error("Refresh token error:", error)
      await logout()
      return { success: false }
    }
  }

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken")

      // Call logout API
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      await clearAuthData()
    } catch (error) {
      console.error("Logout error:", error)
      await clearAuthData()
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
