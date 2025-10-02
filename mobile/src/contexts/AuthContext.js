// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";
import { API_BASE_URL, AUTH_ENDPOINTS } from '../constants';
import authService from '../services/authService';
import { useAppStore } from '../store/useAppStore';

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
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Use central constants for API base URL
  // (API_BASE_URL imported from constants)
  // If in dev and running on android emulator we rely on constants already set to 10.0.2.2:4000

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
      const storedToken = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      console.log('Stored Token:', storedToken);
      console.log('Stored User:', userData);

      if (storedToken && userData) {
        // Verify token validity before setting user
        const isValid = await verifyToken(storedToken);
        if (isValid) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
          setNeedsOnboarding(!parsedUser.isOnboardingComplete);
          console.log('Auth restored:', { 
            hasUser: !!parsedUser, 
            needsOnboarding: !parsedUser.isOnboardingComplete 
          });
        } else {
          await AsyncStorage.multiRemove(["token", "user"]);
          setIsAuthenticated(false);
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
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.VERIFY_TOKEN}`, {
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
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

      // Token ve user bilgilerini al
      const newToken = data.token || data.data?.token;
      const newUser = data.data?.user || data.user;

      console.log('Login başarılı:', { hasToken: !!newToken, hasUser: !!newUser });

      // AsyncStorage'a kaydet
      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      // State'i güncelle
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      setNeedsOnboarding(!newUser.isOnboardingComplete);

      return { 
        success: true, 
        needsOnboarding: !newUser.isOnboardingComplete 
      };
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
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

      // Token ve user bilgilerini al
      const newToken = data.token || data.data?.token;
      const newUser = data.data?.user || data.user;

      console.log('Register başarılı:', { hasToken: !!newToken, hasUser: !!newUser });

      // AsyncStorage'a kaydet
      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      // State'i güncelle
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      setNeedsOnboarding(true); // Yeni kullanıcı her zaman onboarding'e gider

      return { 
        success: true, 
        needsOnboarding: true 
      };
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
      setToken(null);
      setIsAuthenticated(false);
      setNeedsOnboarding(false);
      console.log('Logout başarılı');
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.UPDATE_PASSWORD}`, {
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.FORGOT_PASSWORD}`, {
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`, {
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
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

      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.GOOGLE}`, {
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

  // Onboarding tamamlandı - artık servis katmanını kullanıyoruz (method ve parsing uyumu için)
  const completeOnboarding = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        throw new Error('Token bulunamadı');
      }

      // authService.completeProfile PUT isteğini yapar ve cevabı güvenle parse eder
      const result = await authService.completeProfile(profileData, storedToken);

      if (!result.success) {
        throw new Error(result.error || 'Profil tamamlanamadı');
      }

      // Güncellenen kullanıcı verisi servis tarafından döndürülebilir
      const updatedUser = result.data?.user || { ...user, ...profileData, isOnboardingComplete: true };

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNeedsOnboarding(false);

      console.log('Onboarding tamamlandı');
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const setAuthFromResponse = async (data) => {
    try {
      if (!data) return { success: false };
      const rawToken = data.token || data.data?.token;
      // sanitize token: trim whitespace and strip surrounding quotes (sometimes backend/client libs add them)
      const newToken = typeof rawToken === 'string' ? rawToken.trim().replace(/^\"|\"$/g, '').replace(/^\'|\'$/g, '') : rawToken;
      const newUser = data.data?.user || data.user;

      if (!newToken || !newUser) return { success: false, error: 'Eksik token veya kullanıcı bilgisi' };

      // Kaydet
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      // Context state
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      setNeedsOnboarding(!newUser.isOnboardingComplete);

      // Sync to zustand store (iletişim için global store kullanan eski App.js'i desteklemek için)
      try {
        const store = useAppStore.getState();
        if (store && typeof store.login === 'function') {
          store.login({ token: newToken, user: newUser });
        }
      } catch (e) {
        // ignore
        console.warn('Zustand store sync failed:', e?.message || e);
      }

      return { success: true, needsOnboarding: !newUser.isOnboardingComplete };
    } catch (error) {
      console.error('setAuthFromResponse error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    // State
    user,
    loading,
    location,
    error,
    apiStatus,
    token,
    isAuthenticated,
    needsOnboarding,
    
    // Methods
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
    completeOnboarding,
    setAuthFromResponse,
    signInWithGoogle: () => promptAsync(),
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};