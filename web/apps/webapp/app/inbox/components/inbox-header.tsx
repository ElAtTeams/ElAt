"use client"

import { Button } from "@/components/ui/button"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface InboxHeaderProps {
  onComposeClick: () => void
}

export function InboxHeader({ onComposeClick }: InboxHeaderProps) {
  const router = useRouter()
  const [showSearchSheet, setShowSearchSheet] = useState(false)

  return (
    <div className="sticky top-0 z-10 bg-white border-b py-2 px-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Gelen Kutusu</h1>
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
            onClick={onComposeClick}
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>

      {/* Search Offcanvas */}
      <Sheet open={showSearchSheet} onOpenChange={setShowSearchSheet}>
        <SheetContent side="top" className="pt-12">
          <SheetHeader>
            <SheetTitle>Mesaj Ara</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <Input type="search" placeholder="Mesajlarda ara..." className="mb-3" />
            <div className="text-gray-600 text-sm">Örneğin: "bebek bezi", "yardım"</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
