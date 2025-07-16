"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type AuthResponse = {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
  };
};

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (url: string, body: any): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu");
      }

      return {
        success: true,
        token: data.token,
        refreshToken: data.refreshToken,
        user: data.user,
        message: data.message
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const result = await handleRequest("/auth/login", { email, password });
    
    if (result.success && result.token && result.user) {
      setCookie("token", result.token, {
        maxAge: 15 * 60, // 15 dakika (access token süresi)
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });

      setCookie("refreshToken", result.refreshToken, {
        maxAge: 7 * 24 * 60 * 60, // 7 gün
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });

      localStorage.setItem("user", JSON.stringify(result.user));
      router.push("/dashboard");
    }

    return result;
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const result = await handleRequest("/auth/register", { firstName, lastName, email, password });
    
    if (result.success) {
      // Kayıt sonrası otomatik giriş yap
      return await login(email, password);
    }

    return result;
  };

  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      // Client tarafında temizlik
      deleteCookie("token");
      deleteCookie("refreshToken");
      localStorage.removeItem("user");

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Çıkış yaparken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    setError
  };
};