"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface EventSearchSheetProps {
  show: boolean
  onHide: () => void
}

export function EventSearchSheet({ show, onHide }: EventSearchSheetProps) {
  return (
    <Sheet open={show} onOpenChange={onHide}>
      <SheetContent side="top" className="pt-12">
        <SheetHeader>
          <SheetTitle>Etkinlik Ara</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <Input type="search" placeholder="Etkinlik adı veya konum..." className="mb-3" />
          <div className="text-gray-600 text-sm">Örneğin: "temizlik günü", "park buluşması"</div>
          <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
            <Search className="mr-2 h-4 w-4" />
            Ara
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
