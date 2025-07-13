"use client"

import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"

import type React from "react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // Corrected import
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Truck, MapPin, Bookmark, ChevronDown, Camera, Info } from "lucide-react"

const HelpRequestModal = ({ show, onHide }) => {
  const [isGlobal, setIsGlobal] = useState(false)
  const [offerShipping, setOfferShipping] = useState(false)
  const [location, setLocation] = useState("")
  const [saveTemplate, setSaveTemplate] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [postContent, setPostContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const themeColors = {
    primary: "#10b983",
    dark: "#000",
    light: "#fff",
  }

  const handleSubmit = () => {
    if (!location.trim() || !postContent.trim()) {
      // Add validation feedback if needed
      return
    }

    console.log({
      postContent,
      isGlobal,
      offerShipping,
      location,
      saveTemplate,
      image: selectedImage,
    })

    onHide()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 200)

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  return (
    <>
      {/* Main Modal */}
      <Dialog open={show} onOpenChange={onHide}>
        <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
          <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
            <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
              <ArrowLeft size={24} />
            </Button>
            <DialogTitle className="text-center font-bold text-lg" style={{ color: themeColors.dark }}>
              Yardım Talebi Oluştur
            </DialogTitle>
            <Button
              variant="default"
              className="px-3 py-1 rounded-md font-medium"
              disabled={!location.trim() || !postContent.trim()}
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.primary,
                minWidth: "80px",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
              }}
              onClick={handleSubmit}
            >
              Gönder
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-5">
            {/* User Info */}
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <Image src="/placeholder.svg" alt="User" width={48} height={48} className="h-12 w-12 rounded-full" />
                <Badge
                  variant="default"
                  className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"
                />
              </div>
              <div>
                <div className="font-bold">Kullanıcı Adı</div>
                <div className="text-gray-600 text-sm">Konum • Şimdi</div>
              </div>
            </div>

            <form>
              {/* Post Content */}
              <div className="mb-4">
                <Textarea
                  rows={4}
                  placeholder="Bugün neye ihtiyacınız var?"
                  className="w-full border-0 p-0 text-lg resize-none focus:ring-0 focus:border-0"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              {selectedImage && (
                <div className="mb-4 relative">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Post content"
                    width={500}
                    height={300}
                    className="w-full rounded-lg object-cover max-h-[300px]"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full p-2"
                    onClick={removeImage}
                  >
                    <Trash2 size={16} />
                  </Button>
                  {isUploading && <Progress value={uploadProgress} className="mt-2 h-1.5" />}
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: themeColors.light + "40" }}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="global-visible" className="flex items-center text-gray-700 font-medium">
                      <Globe className="mr-2 h-5 w-5" style={{ color: themeColors.primary }} />
                      Bu gönderiyi herkese görünür yap
                    </Label>
                    <Switch id="global-visible" checked={isGlobal} onCheckedChange={setIsGlobal} />
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: themeColors.light + "40" }}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="offer-shipping" className="flex items-center text-gray-700 font-medium">
                      <Truck className="mr-2 h-5 w-5" style={{ color: themeColors.primary }} />
                      Kargo ile göndermeyi teklif et
                    </Label>
                    <Switch id="offer-shipping" checked={offerShipping} onCheckedChange={setOfferShipping} />
                  </div>
                </div>

                {/* Location Input */}
                <div className="mb-4">
                  <Label
                    className="text-xs uppercase tracking-wider font-semibold mb-2"
                    style={{ color: themeColors.primary }}
                  >
                    TESLİMAT KONUMU
                  </Label>
                  <div className="relative">
                    <MapPin
                      className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
                      style={{ color: themeColors.primary }}
                    />
                    <Input
                      type="text"
                      placeholder="Önemli bir yer veya kesişen sokaklar"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full py-2 pl-10 pr-3 rounded-lg bg-gray-100 border-l-2 focus:ring-0 focus:border-l-2"
                      style={{ borderLeftColor: themeColors.primary }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: themeColors.light + "40" }}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="save-template" className="flex items-center text-gray-700 font-medium">
                      <Bookmark className="mr-2 h-5 w-5" style={{ color: themeColors.primary }} />
                      Bunu sonraki sefer için kaydet
                    </Label>
                    <Switch id="save-template" checked={saveTemplate} onCheckedChange={setSaveTemplate} />
                  </div>
                </div>

                {/* Status Select */}
                <div
                  className="p-3 rounded-lg cursor-pointer border-l-2"
                  style={{ borderLeftColor: themeColors.primary, backgroundColor: themeColors.light + "40" }}
                  onClick={() => setShowStatusModal(true)}
                >
                  <Label
                    className="text-xs uppercase tracking-wider font-semibold mb-1"
                    style={{ color: themeColors.primary }}
                  >
                    GÖNDERİ DURUMU
                  </Label>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Belirtilmedi</span>
                    <ChevronDown style={{ color: themeColors.primary }} />
                  </div>
                </div>
              </div>
            </form>

            {/* Camera Button */}
            <div className="fixed bottom-5 left-0 right-0 flex justify-center p-4 bg-gradient-to-t from-white via-white/70 to-transparent">
              <label htmlFor="post-image-upload" className="cursor-pointer">
                <Button
                  variant="default"
                  size="icon"
                  className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: themeColors.primary, borderColor: themeColors.primary }}
                >
                  <Camera size={22} />
                </Button>
              </label>
              <input
                id="post-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="w-full h-full max-w-none rounded-none sm:max-w-[500px] p-4 text-center">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-2xl mx-auto" style={{ color: themeColors.dark }}>
              Gönderi Durumu
            </DialogTitle>
          </DialogHeader>

          <div className="px-5 pb-4">
            <div
              className="w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-4"
              style={{ backgroundColor: themeColors.light }}
            >
              <Info size={60} style={{ color: themeColors.primary }} />
            </div>
            <h5 className="font-bold text-xl mb-3" style={{ color: themeColors.dark }}>
              Sürdürülebilir Üye Olun
            </h5>
            <p className="text-gray-600 mb-4 px-3 leading-relaxed">
              Gönderi durumunu ayarlayabilmek ve premium özelliklerin kilidini açmak için sürdürülebilir üye olun.
              Üyelik avantajlarından yararlanarak daha fazla özelliğe erişebilirsiniz.
            </p>

            <div className="flex flex-col gap-3 mb-3 px-4">
              <Button variant="link" className="font-medium text-green-600 hover:underline">
                Daha Fazla Bilgi Al
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStatusModal(false)}
                className="py-2 rounded-lg border-green-600 text-green-600 hover:bg-green-50"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HelpRequestModal
