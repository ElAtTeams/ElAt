"use client"

import { Button } from "@/components/ui/button"
import { Settings, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileHeaderProps {
  onSettingsClick: () => void
}

export function ProfileHeader({ onSettingsClick }: ProfileHeaderProps) {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-10 bg-white border-b py-2 px-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Profil</h1>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-9 h-9 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          onClick={onSettingsClick}
        >
          <Settings size={18} />
        </Button>
      </div>
    </div>
  )
}
