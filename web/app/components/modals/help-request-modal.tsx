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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, X } from "lucide-react"

interface HelpRequestModalProps {
  show: boolean
  onHide: () => void
  onCreate: (data: { title: string; category: string; description: string }) => void
}

const HelpRequestModal = ({ show, onHide, onCreate }: HelpRequestModalProps) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setIsSuccess(false)

    if (!title || !category || !description) {
      setError("Lütfen tüm alanları doldurun.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onCreate({ title, category, description })
      setIsSuccess(true)
      setTitle("")
      setCategory("")
      setDescription("")
      setTimeout(onHide, 1500) // Close modal after a short delay on success
    } catch (err) {
      setError("Yardım talebi oluşturulurken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setTitle("")
    setCategory("")
    setDescription("")
    setError("")
    setIsSuccess(false)
    setIsLoading(false)
    onHide()
  }

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Yardım Talep Et</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Topluluğunuzdan ne tür bir yardıma ihtiyacınız var?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Başarılı!</h3>
              <p className="text-gray-600">Yardım talebiniz başarıyla oluşturuldu.</p>
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
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  placeholder="Örn: Market Alışverişi, Ders Desteği"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Bir kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alisveris">Alışveriş</SelectItem>
                    <SelectItem value="egitim">Eğitim Desteği</SelectItem>
                    <SelectItem value="tamirat">Küçük Tamirat</SelectItem>
                    <SelectItem value="cocuk-bakimi">Çocuk Bakımı</SelectItem>
                    <SelectItem value="evcil-hayvan">Evcil Hayvan Bakımı</SelectItem>
                    <SelectItem value="tasima">Taşıma/Nakliye</SelectItem>
                    <SelectItem value="diger">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  placeholder="Yardım talebinizin detaylarını açıklayın..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                  İptal
                </Button>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    "Talep Oluştur"
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

export default HelpRequestModal
export { HelpRequestModal }
