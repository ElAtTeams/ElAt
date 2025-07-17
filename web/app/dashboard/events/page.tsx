"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, MapPin, Clock, Users, Plus, Edit, Trash2, Loader2, CheckCircle, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog" // Corrected imports

export default function EventsPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Mahalle Pikniği",
      date: new Date(2025, 6, 22), // July 22, 2025
      time: "14:00",
      location: "Moda Sahili",
      description: "Geleneksel mahalle pikniğimiz için bir araya geliyoruz. Herkes davetlidir!",
      attendees: 45,
    },
    {
      id: 2,
      title: "Kitap Kulübü Toplantısı",
      date: new Date(2025, 6, 25), // July 25, 2025
      time: "19:00",
      location: "Kadıköy Halk Kütüphanesi",
      description: "Ayın kitabı 'Sineklerin Tanrısı' üzerine tartışmak için buluşuyoruz.",
      attendees: 12,
    },
    {
      id: 3,
      title: "Çocuklar İçin Oyun Günü",
      date: new Date(2025, 7, 5), // August 5, 2025
      time: "10:00",
      location: "Özgürlük Parkı",
      description: "Çocuklarımız için eğlenceli oyunlar ve aktivitelerle dolu bir gün.",
      attendees: 20,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null) // For editing
  const [formState, setFormState] = useState({
    title: "",
    date: null,
    time: "",
    location: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleDateSelect = (date) => {
    setFormState((prev) => ({ ...prev, date }))
  }

  const handleOpenModal = (event = null) => {
    if (event) {
      setCurrentEvent(event)
      setFormState({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
      })
    } else {
      setCurrentEvent(null)
      setFormState({
        title: "",
        date: null,
        time: "",
        location: "",
        description: "",
      })
    }
    setError("")
    setIsSuccess(false)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsLoading(false)
    setError("")
    setIsSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setIsSuccess(false)

    if (!formState.title || !formState.date || !formState.time || !formState.location || !formState.description) {
      setError("Lütfen tüm alanları doldurun.")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      if (currentEvent) {
        // Edit existing event
        setEvents((prev) =>
          prev.map((event) =>
            event.id === currentEvent.id
              ? { ...formState, id: currentEvent.id, attendees: currentEvent.attendees }
              : event,
          ),
        )
        setIsSuccess(true)
      } else {
        // Add new event
        const newEvent = {
          id: events.length + 1,
          ...formState,
          attendees: 0, // New events start with 0 attendees
        }
        setEvents((prev) => [...prev, newEvent])
        setIsSuccess(true)
      }
      setTimeout(handleCloseModal, 1500)
    } catch (err) {
      setError("Etkinlik kaydedilirken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      setEvents((prev) => prev.filter((event) => event.id !== id))
    } catch (err) {
      setError("Etkinlik silinirken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Etkinlikler</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" /> Yeni Etkinlik Oluştur
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {event.title}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(event)}>
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Düzenle</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)} disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      <span className="sr-only">Sil</span>
                    </Button>
                  </div>
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <CalendarIcon className="w-4 h-4 mr-1" /> {format(event.date, "dd MMMM yyyy")}
                  <Clock className="w-4 h-4 ml-4 mr-1" /> {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {event.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" /> {event.attendees} Katılımcı
                  </div>
                  <Button size="sm" variant="outline">
                    Katıl
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Henüz bir etkinlik yok. İlk etkinliği siz oluşturun!
          </p>
        )}
      </div>

      {/* Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {currentEvent ? "Etkinliği Düzenle" : "Yeni Etkinlik Oluştur"}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">Etkinlik detaylarını girin.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Başarılı!</h3>
                <p className="text-gray-600">Etkinlik başarıyla kaydedildi.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    placeholder="Etkinlik Başlığı"
                    value={formState.title}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !formState.date && "text-muted-foreground"
                        }`}
                        disabled={isLoading}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formState.date ? format(formState.date, "PPP") : <span>Bir tarih seçin</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={formState.date} onSelect={handleDateSelect} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Saat</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formState.time}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input
                    id="location"
                    placeholder="Etkinlik Konumu"
                    value={formState.location}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    placeholder="Etkinlik hakkında detaylar..."
                    value={formState.description}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : currentEvent ? (
                    "Değişiklikleri Kaydet"
                  ) : (
                    "Etkinlik Oluştur"
                  )}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
