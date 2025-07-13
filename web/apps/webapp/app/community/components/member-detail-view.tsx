"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X, MapPin, Calendar, MessageSquare, Heart, UserPlus } from "lucide-react"

interface MemberDetailViewProps {
  member: any
  show: boolean
  onHide: () => void
}

export function MemberDetailView({ member, show, onHide }: MemberDetailViewProps) {
  if (!member) return null

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <X size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Üye Detayı</DialogTitle>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col items-center mb-6">
            <Image
              src={member.avatar || "/placeholder.svg"}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-green-600 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{member.role}</p>
            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
              <UserPlus className="mr-2 h-4 w-4" />
              Takip Et
            </Button>
          </div>

          <p className="text-gray-700 text-center mb-6">{member.bio}</p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center text-gray-700">
              <MapPin size={18} className="mr-2 text-green-600" />
              <span>{member.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar size={18} className="mr-2 text-green-600" />
              <span>{member.memberSince || "Bilinmiyor"} tarihinden beri üye</span>
            </div>
          </div>

          <div className="flex justify-around text-center border-t pt-4">
            <div>
              <div className="text-lg font-bold text-gray-900">{member.posts}</div>
              <div className="text-sm text-gray-600">Gönderi</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{member.followers}</div>
              <div className="text-sm text-gray-600">Takipçi</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{member.following}</div>
              <div className="text-sm text-gray-600">Takip Edilen</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
              <MessageSquare className="mr-2 h-4 w-4" />
              Mesaj Gönder
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
              <Heart className="mr-2 h-4 w-4" />
              Yardım Et
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
