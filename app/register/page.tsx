"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ArrowLeft } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    neighborhood: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler eşleşmiyor!")
      return
    }
    // Register logic will be implemented with backend
    console.log("Register attempt:", formData)
  }

  const handleGoogleRegister = () => {
    // Google OAuth register
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Animated Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white space-y-6 p-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold">YanKapı</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Mahalle
              <br />
              <span className="text-green-400">Topluluğuna Katılın</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-md">
              Komşularınızla yardımlaşın, paylaşın ve güçlü bir topluluk oluşturun.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">Hesap Oluşturun</h2>
            <p className="text-gray-400">Mahalle topluluğuna katılın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  Ad
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Adınız"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Soyad
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Soyadınız"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="neighborhood" className="text-gray-300">
                Mahalle
              </Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder="Mahalleniz"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Şifre Tekrar
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-gray-800 text-green-500 focus:ring-green-500"
                required
              />
              <span className="ml-2 text-sm text-gray-300">
                <Link href="/terms" className="text-green-400 hover:text-green-300">
                  Kullanım Şartları
                </Link>{" "}
                ve{" "}
                <Link href="/privacy" className="text-green-400 hover:text-green-300">
                  Gizlilik Politikası
                </Link>
                'nı kabul ediyorum
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
            >
              Hesap Oluştur
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">veya</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleRegister}
              variant="outline"
              className="w-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google ile Kayıt Ol
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold">
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
