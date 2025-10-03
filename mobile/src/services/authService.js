import { API_BASE_URL, AUTH_ENDPOINTS } from '../constants';

class AuthService {
  // Helper to safely parse JSON responses and handle BOM/invalid JSON
  async _parseResponse(response) {
    const text = await response.text();
    const cleaned = typeof text === 'string' ? text.replace(/^\uFEFF/, '').trim() : text;
    if (!cleaned) return {};
    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.error('Failed to parse JSON response. Raw text:', cleaned);
      // Throw a clearer error so callers can show a useful message
      throw new Error('Sunucudan beklenmeyen cevap (geçersiz JSON).');
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Kayıt işlemi başarısız');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await this._parseResponse(response);
      console.log('Login Response:', data); // Debug için

      if (!response.ok) {
        throw new Error(data.error || 'Giriş işlemi başarısız');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async completeProfile(profileData, token) {
    try {
      console.log('Complete Profile - Token:', token); // Debug için
      console.log('Complete Profile - Data:', profileData); // Debug için
      
      if (!token) {
        throw new Error('Token bulunamadı');
      }
      
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.COMPLETE_PROFILE}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Profil güncelleme başarısız');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async getProfile(userId, token) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.PROFILE}/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Profil bilgileri alınamadı');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.FORGOT_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Şifre sıfırlama kodu gönderilemedi');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // OTP kod doğrulama
  async verifyOTP(email, otpCode) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.VERIFY_OTP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otpCode }),
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'OTP doğrulama başarısız');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Şifre sıfırlama (reset token ile)
  async resetPasswordWithToken(resetToken, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.RESET_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await this._parseResponse(response);

      if (!response.ok) {
        throw new Error(data.error || 'Şifre sıfırlama başarısız');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new AuthService();