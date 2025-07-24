"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  gender: string
  birthDate: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading, error, setError } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "diğer",
    birthDate: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validasyonlar
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      return
    }

    // Doğum tarihi kontrolü
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 18) {
      setError("18 yaşından küçükler kayıt olamaz")
      return
    }

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      birthDate: formData.birthDate
    })

    if (result.success) {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Hesap Oluştur</h2>
          <p className="text-gray-600">Yeni bir hesap oluşturmak için bilgilerinizi girin</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Ad</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Adınız"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Soyad</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Soyadınız"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Doğum Tarihi</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="gender">Cinsiyet</Label>
            <select
              id="gender"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
            >
              <option value="erkek">Erkek</option>
              <option value="kadın">Kadın</option>
              <option value="diğer">Diğer</option>
            </select>
          </div>

          <div>
            <Label htmlFor="password">Şifre</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Giriş yapın
          </Link>
        </div>
      </div>
    </div>
  )
}
