"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Info, X } from "lucide-react"
import Image from "next/image"
import Dialog from "@/components/ui/dialog"
import DialogContent from "@/components/ui/dialog-content"
import DialogHeader from "@/components/ui/dialog-header"
import DialogTitle from "@/components/ui/dialog-title"

export default function CommunityNamingPage() {
  const router = useRouter()
  const [communityName, setCommunityName] = useState("")
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleNext = () => {
    if (communityName.trim()) {
      console.log("Topluluk adı:", communityName)
      router.push("/location/community-confirmation")
    } else {
      alert("Lütfen bir topluluk adı girin.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Topluluk Adı</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col p-4">
        <div className="my-auto flex flex-col items-center justify-center text-center">
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-4 shadow-md"
            aria-hidden="true"
          >
            <MapPin className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Topluluğunuza Bir İsim Verin</h2>
          <p className="mx-auto mb-6 text-gray-600" style={{ maxWidth: "400px" }}>
            Bu, diğer kullanıcıların sizi haritada görmesini sağlayacak ve topluluğunuzu daha kolay bulmalarına yardımcı
            olacaktır.
          </p>

          <div className="w-full max-w-sm">
            <Label htmlFor="community-name" className="sr-only">
              Topluluk Adı
            </Label>
            <Input
              id="community-name"
              type="text"
              placeholder="Örn: Kadıköy Dayanışma Ağı"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="mb-4 rounded-lg border-gray-300 p-3 text-lg focus:border-green-500 focus:ring-green-500"
            />
            <Button
              variant="default"
              size="lg"
              onClick={handleNext}
              className="w-full rounded-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
            >
              İLERİ
            </Button>
          </div>
        </div>

        {/* Info Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white shadow-lg"
          onClick={() => setShowInfoModal(true)}
        >
          <Info size={24} className="text-green-600" />
        </Button>
      </div>

      {/* Info Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="w-full h-full max-w-none rounded-none p-4 text-center">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-lg mx-auto">Topluluk Adı Bilgisi</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowInfoModal(false)} className="p-0">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="py-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Info Icon"
              className="mx-auto mb-3"
              width={80}
              height={80}
            />
            <h5 className="font-semibold text-lg mb-3">Topluluk Adı Neden Önemli?</h5>
            <p className="text-gray-600 mb-4">
              Topluluk adı, diğer kullanıcıların sizi haritada görmesini ve topluluğunuzu daha kolay bulmalarını sağlar.
              Bu, yerel yardımlaşma ağınızı güçlendirmek için önemlidir.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              className="px-4 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowInfoModal(false)}
            >
              Tamam
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
