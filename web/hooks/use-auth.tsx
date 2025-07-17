"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const login = useCallback(
    async (email, password) => {
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
          setUser({ email: data.email || email, token: data.token }) // Store user info and token
          router.push("/dashboard") // Redirect to dashboard on successful login
          return { success: true }
        } else {
          setError(data.error || "Giriş başarısız oldu.")
          return { success: false, error: data.error }
        }
      } catch (err) {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.")
        return { success: false, error: "Bağlantı hatası." }
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const register = useCallback(
    async (firstName, lastName, email, password) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        })

        const data = await response.json()

        if (response.ok) {
          // Optionally log in the user immediately after registration
          // await login(email, password);
          router.push("/login") // Redirect to login after successful registration
          return { success: true, message: data.message }
        } else {
          setError(data.error || "Kayıt başarısız oldu.")
          return { success: false, error: data.error }
        }
      } catch (err) {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.")
        return { success: false, error: "Bağlantı hatası." }
      } finally {
        setLoading(false)
      }
    },
    [router],
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
        router.push("/login") // Redirect to login after logout
        return { success: true }
      } else {
        setError("Çıkış başarısız oldu.")
        return { success: false, error: "Çıkış başarısız oldu." }
      }
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.")
      return { success: false, error: "Bağlantı hatası." }
    } finally {
      setLoading(false)
    }
  }, [router])

  return { user, loading, error, setError, login, register, logout }
}
