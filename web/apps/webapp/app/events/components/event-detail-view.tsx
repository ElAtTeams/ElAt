"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Calendar, Users, Share2, X } from "lucide-react"

interface EventDetailViewProps {
  event: any
  show: boolean
  onHide: () => void
}

export function EventDetailView({ event, show, onHide }: EventDetailViewProps) {
  if (!event) return null

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <X size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Etkinlik Detayı</DialogTitle>
          <Button variant="ghost" size="icon" className="text-gray-900">
            <Share2 size={20} />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {event.image && (
            <div className="relative w-full h-[250px]">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-4">{event.description}</p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-700">
                <Calendar size={18} className="mr-2 text-green-600" />
                <span>
                  {event.date}, {event.time}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-2 text-green-600" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Users size={18} className="mr-2 text-green-600" />
                <span>{event.participants} Katılımcı</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-3">Etkinlik Detayları</h3>
            <p className="text-gray-700 mb-6">
              Bu etkinlik, topluluğumuzun bir araya gelerek çevreye katkıda bulunması amacıyla düzenlenmektedir. Tüm
              katılımcılarımıza teşekkür ederiz. Lütfen rahat kıyafetler giyin ve hava durumuna göre hazırlıklı gelin.
            </p>

            <Button variant="default" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Etkinliğe Katıl
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
