"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Home, MessageCircle, Calendar, User, Gift, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationModal } from "@/app/components/modals/location-modal"
import HelpOfferModal from "@/app/components/modals/help-offer-modal"
import HelpRequestModal from "@/app/components/modals/help-request-modal"
import { DetailModal } from "@/app/components/modals/detail-modal"

export default function DashboardLayout({ children }) {
  // State for modals, moved search modal state to page.tsx
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleLocationSet = (locationData) => {
    console.log("Konum ayarlandı:", locationData)
    // Burada konum verilerini işleyebilirsiniz (örn. kullanıcı profiline kaydetme)
  }

  const handleOfferSubmit = (offerData) => {
    console.log("Yardım teklifi gönderildi:", offerData)
    // Burada teklif verilerini işleyebilirsiniz
  }

  const handleRequestSubmit = (requestData) => {
    console.log("Yardım talebi gönderildi:", requestData)
    // Burada talep verilerini işleyebilirsiniz
  }

  const openDetailModal = (item) => {
    setSelectedItem(item)
    setIsDetailModalOpen(true)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen w-full flex-col bg-gray-100">
        {/* Header removed from layout, now handled by page.tsx */}
        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 md:gap-8">{children}</main>{" "}
        {/* Removed p-4, md:p-6 to allow full-page content */}
        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 md:hidden z-30">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex flex-col items-center text-emerald-600">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Anasayfa</span>
            </Link>
            {/* Removed Community Link */}
            <Link href="/dashboard/messages" className="flex flex-col items-center text-gray-500">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Mesajlar</span>
            </Link>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center text-gray-500"
              onClick={() => setIsOfferModalOpen(true)}
            >
              <Gift className="w-6 h-6" />
              <span className="text-xs mt-1">Teklif Et</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center text-gray-500"
              onClick={() => setIsRequestModalOpen(true)}
            >
              <Send className="w-6 h-6" />
              <span className="text-xs mt-1">Talep Et</span>
            </Button>
            <Link href="/dashboard/events" className="flex flex-col items-center text-gray-500">
              <Calendar className="w-6 h-6" />
              <span className="text-xs mt-1">Etkinlikler</span>
            </Link>
            <Link href="/dashboard/profile" className="flex flex-col items-center text-gray-500">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profil</span>
            </Link>
          </div>
        </div>
        {/* Modals (kept here as they are global to the dashboard layout) */}
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          onLocationSet={handleLocationSet}
        />
        <HelpOfferModal
          show={isOfferModalOpen}
          onHide={() => setIsOfferModalOpen(false)}
          onCreate={handleOfferSubmit}
        />
        <HelpRequestModal
          show={isRequestModalOpen}
          onHide={() => setIsRequestModalOpen(false)}
          onCreate={handleRequestSubmit}
        />
        <DetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} item={selectedItem} />
      </div>
    </Suspense>
  )
}
