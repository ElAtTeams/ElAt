"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  token?: string
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  birthDate: string
}

interface AuthResponse {
  success: boolean
  data?: {
    user: User
    token: string
  }
  error?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (data: RegisterData) => Promise<AuthResponse>
  logout: () => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (response.ok) {
          setUser({
            id: data.data.user.id,
            firstName: data.data.user.firstName,
            lastName: data.data.user.lastName,
            email: data.data.user.email,
            token: data.token
          })
          router.push("/dashboard")
          return { success: true, data }
        } else {
          const error = data.error || "Giriş başarısız oldu."
          setError(error)
          return { success: false, error }
        }
      } catch (err) {
        const error = "Bağlantı hatası. Lütfen tekrar deneyin."
        setError(error)
        return { success: false, error }
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const register = useCallback(
    async (data: RegisterData): Promise<AuthResponse> => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (response.ok) {
          return { success: true, data: responseData }
        } else {
          const error = responseData.error || "Kayıt başarısız oldu."
          setError(error)
          return { success: false, error }
        }
      } catch (err) {
        const error = "Bağlantı hatası. Lütfen tekrar deneyin."
        setError(error)
        return { success: false, error }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setUser(null)
        router.push("/login")
        return { success: true }
      } else {
        const error = "Çıkış başarısız oldu."
        setError(error)
        return { success: false, error }
      }
    } catch (err) {
      const error = "Bağlantı hatası. Lütfen tekrar deneyin."
      setError(error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }, [router])

  const value = {
    user,
    loading,
    error,
    setError,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
