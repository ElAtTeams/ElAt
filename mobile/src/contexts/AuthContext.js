// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);

  // API Configuration
  const API_BASE_URL = __DEV__ 
    ? Platform.OS === 'android' 
      ? "http://10.0.2.2:3001/api" 
      : "http://localhost:3001/api"
    : "https://your-production-api.com";

  // Google OAuth setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthState();
      await requestLocationPermission();
      await checkApiHealth();
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleSignIn(authentication);
    }
  }, [response]);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setApiStatus(data.status === 'ok' ? 'healthy' : 'unhealthy');
      return data.status === 'ok';
    } catch (error) {
      setApiStatus('unreachable');
      return false;
    }
  };

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (token && userData) {
        // Verify token validity before setting user
        const isValid = await verifyToken(token);
        if (isValid) {
          setUser(JSON.parse(userData));
        } else {
          await AsyncStorage.multiRemove(["token", "user"]);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
    } catch (error) {
      console.error("Location permission error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Check API status first
      const isApiHealthy = await checkApiHealth();
      if (!isApiHealthy) {
        throw new Error("API sunucusuna bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.");
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Giriş yapılamadı");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));

      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { 
        success: false, 
        error: error.message || "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          birthDate: userData.birthDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kayıt olunamadı");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));

      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("Oturum bulunamadı");
      }

      const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Şifre değiştirilemedi");
      }

      // Update token if a new one was returned
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      }

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Şifre sıfırlama bağlantısı gönderilemedi");
      }

      return { success: true, message: data.message };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Şifre sıfırlanamadı");
      }

      return { success: true, message: data.message };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      if (!token) {
        throw new Error("Oturum bulunamadı");
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token yenilenemedi");
      }

      await AsyncStorage.setItem("token", data.token);
      if (data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleGoogleSignIn = async (authentication) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: authentication.accessToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google ile giriş yapılamadı");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));

      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    location,
    error,
    apiStatus,
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
    signInWithGoogle: () => promptAsync(),
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};