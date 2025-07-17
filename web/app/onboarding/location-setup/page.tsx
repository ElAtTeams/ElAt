"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, LocateFixed, ArrowRight, AlertCircle, Loader2 } from "lucide-react"

export default function LocationSetupPage() {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleDetectLocation = async () => {
    setIsLoading(true)
    setError("")
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            // Simulate API call to reverse geocode
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`)
            setIsLoading(false)
            router.push("/dashboard") // Redirect to dashboard after successful setup
          },
          (geoError) => {
            setError(`Konum algılanamadı: ${geoError.message}`)
            setIsLoading(false)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        )
      } else {
        setError("Tarayıcınız konum servislerini desteklemiyor.")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Konum algılama sırasında bir hata oluştu.")
      setIsLoading(false)
    }
  }

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (location.trim() === "") {
      setError("Lütfen bir konum girin veya konumunuzu algılayın.")
      return
    }
    setIsLoading(true)
    // Simulate saving location
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard") // Redirect to dashboard after successful setup
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-blue-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Konumunuzu Ayarlayın</h1>
            <p className="text-gray-600">Size en yakın komşularla bağlantı kurmak için konumunuzu belirleyin.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <Button
              onClick={handleDetectLocation}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Konum Algılanıyor...
                </>
              ) : (
                <>
                  <LocateFixed className="mr-2 h-5 w-5" />
                  Konumumu Algıla
                </>
              )}
            </Button>

            <div className="relative flex items-center justify-center">
              <span className="absolute bg-white px-3 text-gray-500 text-sm">VEYA</span>
              <div className="w-full border-t border-gray-300" />
            </div>

            <form onSubmit={handleManualEntry} className="space-y-4">
              <div>
                <Label htmlFor="manual-location" className="text-gray-700">
                  Konumu Manuel Girin
                </Label>
                <div className="relative">
                  <Input
                    id="manual-location"
                    type="text"
                    placeholder="Örn: Kadıköy, İstanbul"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 pr-10"
                    disabled={isLoading}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || location.trim() === ""}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Devam Et
                  </>
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
