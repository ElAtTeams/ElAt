"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setError(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    setIsSubmitted(false)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">YanKapı</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Şifremi Unuttum</h1>
                  <p className="text-gray-600">E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      E-posta Adresi
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    {isLoading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Şifrenizi hatırladınız mı?{" "}
                    <Link href="/login" className="text-green-500 hover:text-green-600 font-semibold">
                      Giriş yapın
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">E-posta Gönderildi!</h1>
                <p className="text-gray-600 mb-6">
                  <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderdik. E-postanızı kontrol edin ve
                  bağlantıya tıklayarak şifrenizi sıfırlayın.
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">E-posta gelmedi mi? Spam klasörünüzü kontrol edin.</p>
                  <Button onClick={handleResend} variant="outline" className="w-full bg-transparent">
                    Tekrar Gönder
                  </Button>
                </div>
                <div className="text-center mt-6">
                  <Link href="/login" className="text-green-500 hover:text-green-600 font-semibold">
                    Giriş sayfasına dön
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
