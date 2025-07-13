"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

interface UserListSheetProps {
  show: boolean
  onHide: () => void
  onUserSelect: (user: any) => void
}

export function UserListSheet({ show, onHide, onUserSelect }: UserListSheetProps) {
  const sampleUsers = [
    { id: 1, name: "Elif Kaya", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Mehmet Demir", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Zeynep Şahin", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Can Aydın", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <Sheet open={show} onOpenChange={onHide}>
      <SheetContent side="right" className="pt-12">
        <SheetHeader>
          <SheetTitle>Kişi Seç</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <Input type="search" placeholder="Kişi ara..." className="pl-10" />
          </div>
          <div className="space-y-2">
            {sampleUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className="w-full justify-start py-6"
                onClick={() => onUserSelect(user)}
              >
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3 border border-green-600"
                />
                <span className="font-medium text-gray-900">{user.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
