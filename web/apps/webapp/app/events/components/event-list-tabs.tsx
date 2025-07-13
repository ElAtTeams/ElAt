"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Calendar, Users, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EventListTabsProps {
  onEventClick: (event: any) => void
}

export function EventListTabs({ onEventClick }: EventListTabsProps) {
  const sampleEvents = [
    {
      id: 1,
      title: "Kadıköy Sahil Temizliği",
      date: "15 Haz",
      time: "10:00 - 13:00",
      location: "Kadıköy Sahil Parkı",
      image: "/placeholder.svg?height=200&width=300",
      participants: 25,
      description: "Kadıköy sahilini temizlemek için bir araya geliyoruz. Eldiven ve çöp torbası sağlanacaktır.",
    },
    {
      id: 2,
      title: "Çocuklar İçin Kitap Okuma Günü",
      date: "20 Haz",
      time: "14:00 - 16:00",
      location: "Moda Parkı Kütüphanesi",
      image: "/placeholder.svg?height=200&width=300",
      participants: 15,
      description: "Çocuklarımıza kitap sevgisi aşılamak için hikaye okuma etkinliği düzenliyoruz.",
    },
    {
      id: 3,
      title: "Yaşlılara Yardım Ziyareti",
      date: "22 Haz",
      time: "09:00 - 12:00",
      location: "Huzurevi (Özel Adres)",
      image: "/placeholder.svg?height=200&width=300",
      participants: 10,
      description: "Yerel huzurevindeki yaşlılarımızı ziyaret ederek onlara moral veriyoruz.",
    },
  ]

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="sticky top-[56px] bg-white pt-3 pb-2 border-b z-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Yaklaşan</TabsTrigger>
          <TabsTrigger value="past">Geçmiş</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="upcoming" className="p-3 space-y-4">
        {sampleEvents.map((event) => (
          <Card key={event.id} className="border-0 shadow-sm overflow-hidden">
            <div className="relative w-full h-[200px] cursor-pointer" onClick={() => onEventClick(event)}>
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar size={14} className="mr-1" /> {event.date}, {event.time}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin size={14} className="mr-1" /> {event.location}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-900">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Paylaş</DropdownMenuItem>
                    <DropdownMenuItem>Takvime Ekle</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Rapor Et</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600 text-sm">
                  <Users size={16} className="mr-1" /> {event.participants} Katılımcı
                </div>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Katıl
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="past" className="p-3 space-y-4">
        <p className="text-center text-gray-600">Geçmiş etkinlik bulunmamaktadır.</p>
      </TabsContent>
    </Tabs>
  )
}
