"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, X } from "lucide-react"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onLocationSet: (locationData: { city: string; district: string }) => void
}

export function LocationModal({ isOpen, onClose, onLocationSet }: LocationModalProps) {
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setIsSuccess(false)

    if (!city || !district) {
      setError("Lütfen şehir ve ilçe seçin.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onLocationSet({ city, district })
      setIsSuccess(true)
      setCity("")
      setDistrict("")
      setTimeout(onClose, 1500) // Close modal after a short delay on success
    } catch (err) {
      setError("Konum kaydedilirken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setCity("")
    setDistrict("")
    setError("")
    setIsSuccess(false)
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Konumunuzu Ayarlayın</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Size en yakın yardımları ve talepleri görmek için konumunuzu seçin.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Başarılı!</h3>
              <p className="text-gray-600">Konumunuz başarıyla ayarlandı.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
              <div>
                <Label htmlFor="city">Şehir</Label>
                <Select value={city} onValueChange={setCity} disabled={isLoading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="istanbul">İstanbul</SelectItem>
                    <SelectItem value="ankara">Ankara</SelectItem>
                    <SelectItem value="izmir">İzmir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">İlçe</Label>
                <Select value={district} onValueChange={setDistrict} disabled={isLoading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="İlçe seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {city === "istanbul" && (
                      <>
                        <SelectItem value="kadikoy">Kadıköy</SelectItem>
                        <SelectItem value="besiktas">Beşiktaş</SelectItem>
                        <SelectItem value="sisli">Şişli</SelectItem>
                      </>
                    )}
                    {city === "ankara" && (
                      <>
                        <SelectItem value="cankaya">Çankaya</SelectItem>
                        <SelectItem value="etimesgut">Etimesgut</SelectItem>
                      </>
                    )}
                    {city === "izmir" && (
                      <>
                        <SelectItem value="bornova">Bornova</SelectItem>
                        <SelectItem value="karsiyaka">Karşıyaka</SelectItem>
                      </>
                    )}
                    {!city && (
                      <SelectItem value="" disabled>
                        Önce şehir seçin
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                  İptal
                </Button>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Konumu Ayarla"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
