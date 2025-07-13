"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Corrected import
import { ArrowLeft, Camera } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface EditProfileModalProps {
  show: boolean
  onHide: () => void
}

export function EditProfileModal({ show, onHide }: EditProfileModalProps) {
  const [name, setName] = useState("Ayşe Yılmaz")
  const [username, setUsername] = useState("@ayseyilmaz")
  const [bio, setBio] = useState("Yardımlaşmayı seven bir topluluk gönüllüsü. Herkese destek olmaya çalışıyorum.")
  const [location, setLocation] = useState("Kadıköy, İstanbul")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")

  const handleSave = () => {
    console.log("Profil kaydedildi:", { name, username, bio, location, avatar })
    onHide()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <ArrowLeft size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Profili Düzenle</DialogTitle>
          <Button
            variant="default"
            className="px-3 py-1 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSave}
          >
            Kaydet
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Image
                src={avatar || "/placeholder.svg"}
                alt="Profil Resmi"
                width={120}
                height={120}
                className="rounded-full border-4 border-green-600 object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 cursor-pointer border-2 border-white"
              >
                <Camera size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Ad Soyad
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="username" className="text-gray-700">
                Kullanıcı Adı
              </Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-700">
                Biyografi
              </Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>
            <div>
              <Label htmlFor="location" className="text-gray-700">
                Konum
              </Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
