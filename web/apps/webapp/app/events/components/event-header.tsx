"use client"

import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EventCreationModal } from "@/app/components/modals/event-creation-modal"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

export function EventHeader() {
  const router = useRouter()
  const [showEventModal, setShowEventModal] = useState(false)
  const [showSearchSheet, setShowSearchSheet] = useState(false)

  const handleCreateEvent = (data: any) => {
    console.log("Event created:", data)
    setShowEventModal(false)
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b py-2 px-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold mr-2 text-green-600 text-2xl">Etkinlikler</span>
          <div
            className="border border-green-600 rounded-full px-3 py-1 cursor-pointer"
            onClick={() => router.push("/location")}
          >
            <div className="flex items-center">
              <span className="text-green-600 font-medium">Kadıköy</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#28a745"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-9 h-9 mr-2 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            onClick={() => setShowSearchSheet(true)}
          >
            <Search size={18} />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-9 h-9 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowEventModal(true)}
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>

      <EventCreationModal show={showEventModal} onHide={() => setShowEventModal(false)} onCreate={handleCreateEvent} />

      {/* Search Offcanvas */}
      <Sheet open={showSearchSheet} onOpenChange={setShowSearchSheet}>
        <SheetContent side="top" className="pt-12">
          <SheetHeader>
            <SheetTitle>Etkinlik Ara</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <Input type="search" placeholder="Etkinlik adı veya konum..." className="mb-3" />
            <div className="text-gray-600 text-sm">Örneğin: "temizlik günü", "park buluşması"</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
