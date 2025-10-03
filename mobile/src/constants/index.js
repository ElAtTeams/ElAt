// API Base URL
export const API_BASE_URL = 'http://10.0.2.2:4000/api';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  COMPLETE_PROFILE: '/auth/complete-profile',
  PROFILE: '/auth/profile',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_TOKEN: '/auth/verify-token',
  UPDATE_PASSWORD: '/auth/update-password',
  REFRESH_TOKEN: '/auth/refresh-token',
  GOOGLE: '/auth/google',
};

// App Colors
export const COLORS = {
  PRIMARY: '#10b981',
  SECONDARY: '#f0fdf4',
  WHITE: '#ffffff',
  BLACK: '#1a1a1a',
  GRAY: '#666666',
  LIGHT_GRAY: '#f8f9fa',
  ERROR: '#ef4444',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
};

// App Theme
export const THEME = {
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
    EXTRA_LARGE: 24,
  },
  SHADOW: {
    SMALL: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    MEDIUM: {
      shadowColor: COLORS.PRIMARY,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};