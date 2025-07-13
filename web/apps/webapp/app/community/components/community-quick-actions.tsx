"use client"

import { Button } from "@/components/ui/button"
import { UserPlus, CalendarPlus, MessageSquarePlus } from "lucide-react"

export function CommunityQuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <Button
        variant="outline"
        className="flex flex-col h-auto py-4 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
      >
        <UserPlus className="h-6 w-6 mb-1" />
        <span className="text-xs font-medium">Üye Davet Et</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col h-auto py-4 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
      >
        <CalendarPlus className="h-6 w-6 mb-1" />
        <span className="text-xs font-medium">Etkinlik Oluştur</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col h-auto py-4 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
      >
        <MessageSquarePlus className="h-6 w-6 mb-1" />
        <span className="text-xs font-medium">Tartışma Başlat</span>
      </Button>
    </div>
  )
}
