"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Corrected import
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, HeartHandshake, Camera, Trash2, CheckCircle, X } from "lucide-react" // Added X for close button
import Image from "next/image"
import { Progress } from "@/components/ui/progress" // Ensure Progress is imported

const themeColors = {
  primary: "#FFC107", // Yellow
  light: "#FFF3CD", // Light yellow
  dark: "#E0A800", // Darker yellow
  icon: "#FFC107",
}

interface ThankYouModalProps {
  show: boolean
  onHide: () => void
  onSubmit: (content: string, globalShare: boolean, image: string | null) => void
  onConfirm?: () => void
}

export function ThankYouModal({ show, onHide, onSubmit, onConfirm }: ThankYouModalProps) {
  const [content, setContent] = useState("")
  const [globalShare, setGlobalShare] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = () => {
    if (!content.trim()) {
      // Add validation feedback if needed
      return
    }
    onSubmit(content, globalShare, selectedImage)
    setContent("")
    setGlobalShare(false)
    setSelectedImage(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

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
    <Dialog open={show} onOpenChange={onHide}>
      {onConfirm ? (
        <DialogContent className="w-full h-full max-w-none rounded-none p-4 text-center">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-lg mx-auto">Teşekkür Ederiz!</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onHide} className="p-0">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="py-4">
            <CheckCircle size={64} className="text-green-600 mb-3 mx-auto" />
            <h5 className="font-semibold text-xl mb-3">Yardımınız İçin Teşekkürler!</h5>
            <p className="text-gray-600 mb-4">
              Yardım teklifiniz başarıyla gönderildi. Topluluğumuza katkınız için minnettarız.
            </p>
          </div>

          <div className="flex justify-center">
            <Button variant="default" className="px-6 bg-green-600 hover:bg-green-700 text-white" onClick={onConfirm}>
              Tamam
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
          <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
            <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
              <ArrowLeft size={24} />
            </Button>
            <DialogTitle className="text-center font-bold text-lg" style={{ color: themeColors.dark }}>
              Teşekkür Oluştur
            </DialogTitle>
            <Button
              variant="default"
              className="px-3 py-1 rounded-md font-medium"
              disabled={!content.trim()}
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.primary,
                minWidth: "80px",
                boxShadow: `0 2px 8px ${themeColors.primary}4D`,
              }}
              onClick={handleSubmit}
            >
              Gönder
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-5">
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-green-600"
                />
              </div>
              <div>
                <div className="font-bold">Kullanıcı Adı</div>
                <div className="text-gray-600 text-sm">Konum • Şimdi</div>
              </div>
            </div>

            <form>
              <div className="mb-4">
                <Textarea
                  rows={4}
                  placeholder="Bugün neye minnettarsınız?"
                  className="w-full border-0 p-0 text-lg resize-none focus:ring-0 focus:border-0"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {selectedImage && (
                <div className="mb-4 relative">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Thank you content"
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

              <div className="space-y-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: themeColors.light + "40" }}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="global-visible" className="flex items-center text-gray-700 font-medium">
                      <HeartHandshake className="mr-2 h-5 w-5" style={{ color: themeColors.primary }} />
                      Bu gönderiyi herkese görünür yap
                    </Label>
                    <Switch id="global-visible" checked={globalShare} onCheckedChange={setGlobalShare} />
                  </div>
                </div>
              </div>
            </form>

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
      )}
    </Dialog>
  )
}
