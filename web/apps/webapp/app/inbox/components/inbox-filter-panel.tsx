"use client"

import { Button } from "@/components/ui/button"
import { Filter, MessageSquare, Heart, Star } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface InboxFilterPanelProps {
  onFilterChange: (filter: string) => void
}

export function InboxFilterPanel({ onFilterChange }: InboxFilterPanelProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    onFilterChange(filter)
    setShowFilterSheet(false)
  }

  return (
    <>
      <div className="p-3 border-b bg-white">
        <Button
          variant="outline"
          className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          onClick={() => setShowFilterSheet(true)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtrele
        </Button>
      </div>

      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="right" className="pt-12">
          <SheetHeader>
            <SheetTitle>Filtreler</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mesaj Tipi</h3>
              <RadioGroup value={selectedFilter} onValueChange={handleFilterSelect} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="filter-all" />
                  <Label htmlFor="filter-all" className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-green-600" />
                    Tüm Mesajlar
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unread" id="filter-unread" />
                  <Label htmlFor="filter-unread" className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-green-600" />
                    Okunmamış Mesajlar
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="starred" id="filter-starred" />
                  <Label htmlFor="filter-starred" className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-green-600" />
                    Yıldızlı Mesajlar
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowFilterSheet(false)}
            >
              Uygula
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
