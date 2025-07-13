"use client"

import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"

import type React from "react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, MapPin, Calendar, Camera } from "lucide-react"

const EventCreationModal = ({ show, onHide, onCreate }) => {
  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [isPublic, setIsPublic] = useState(true)
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
    if (!eventName.trim() || !eventDescription.trim() || !eventLocation.trim() || !eventDate.trim()) {
      // Add validation feedback if needed
      return
    }

    onCreate({
      eventName,
      eventDescription,
      eventLocation,
      eventDate,
      isPublic,
      image: selectedImage,
    })
    // Reset form
    setEventName("")
    setEventDescription("")
    setEventLocation("")
    setEventDate("")
    setIsPublic(true)
    setSelectedImage(null)
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
              Etkinlik Oluştur
            </DialogTitle>
            <Button
              variant="default"
              className="px-3 py-1 rounded-md font-medium"
              disabled={!eventName.trim() || !eventDescription.trim() || !eventLocation.trim() || !eventDate.trim()}
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.primary,
                minWidth: "80px",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
              }}
              onClick={handleSubmit}
            >
              Oluştur
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
              {/* Event Name */}
              <div className="mb-4">
                <Label htmlFor="eventName" className="text-gray-700 font-medium">
                  Etkinlik Adı
                </Label>
                <Input
                  id="eventName"
                  type="text"
                  placeholder="Etkinliğinizin adı nedir?"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border-0 p-0 text-lg resize-none focus:ring-0 focus:border-0"
                />
              </div>

              {/* Event Description */}
              <div className="mb-4">
                <Label htmlFor="eventDescription" className="text-gray-700 font-medium">
                  Açıklama
                </Label>
                <Textarea
                  id="eventDescription"
                  rows={4}
                  placeholder="Etkinliğiniz hakkında detaylı bilgi verin."
                  className="w-full border-0 p-0 text-lg resize-none focus:ring-0 focus:border-0"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              {selectedImage && (
                <div className="mb-4 relative">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Event content"
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
                    <Label htmlFor="public-event" className="flex items-center text-gray-700 font-medium">
                      <Globe className="mr-2 h-5 w-5" style={{ color: themeColors.primary }} />
                      Bu etkinliği herkese açık yap
                    </Label>
                    <Switch id="public-event" checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                </div>

                {/* Location Input */}
                <div className="mb-4">
                  <Label
                    className="text-xs uppercase tracking-wider font-semibold mb-2"
                    style={{ color: themeColors.primary }}
                  >
                    ETKİNLİK KONUMU
                  </Label>
                  <div className="relative">
                    <MapPin
                      className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
                      style={{ color: themeColors.primary }}
                    />
                    <Input
                      type="text"
                      placeholder="Etkinlik adresi veya buluşma noktası"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full py-2 pl-10 pr-3 rounded-lg bg-gray-100 border-l-2 focus:ring-0 focus:border-l-2"
                      style={{ borderLeftColor: themeColors.primary }}
                    />
                  </div>
                </div>

                {/* Date Input */}
                <div className="mb-4">
                  <Label
                    className="text-xs uppercase tracking-wider font-semibold mb-2"
                    style={{ color: themeColors.primary }}
                  >
                    ETKİNLİK TARİHİ
                  </Label>
                  <div className="relative">
                    <Calendar
                      className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
                      style={{ color: themeColors.primary }}
                    />
                    <Input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full py-2 pl-10 pr-3 rounded-lg bg-gray-100 border-l-2 focus:ring-0 focus:border-l-2"
                      style={{ borderLeftColor: themeColors.primary }}
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Camera Button */}
            <div className="fixed bottom-5 left-0 right-0 flex justify-center p-4 bg-gradient-to-t from-white via-white/70 to-transparent">
              <label htmlFor="event-image-upload" className="cursor-pointer">
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
                id="event-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { EventCreationModal }
