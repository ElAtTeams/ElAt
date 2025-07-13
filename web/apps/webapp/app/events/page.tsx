"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  Search,
  Plus,
  Calendar,
  MapPin,
  Users,
  Heart,
  Share2,
  ArrowRight,
  Clock,
  User,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Örnek etkinlik verileri
  const upcomingEvents = [
    {
      id: 1,
      title: "Yardım Günü",
      date: "15 Haziran 2023",
      time: "14:00 - 17:00",
      location: "Kadıköy Halk Parkı",
      description:
        "Fazla eşyalarınızı getirip ihtiyacı olanlarla paylaşabileceğiniz bir etkinlik",
      participants: 24,
      category: "topluluk",
      image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Eşya Takas Şenliği",
      date: "22 Haziran 2023",
      time: "11:00 - 16:00",
      location: "Beşiktaş Meydan",
      description:
        "Kullanmadığınız eşyaları takas edebileceğiniz eğlenceli bir etkinlik",
      participants: 18,
      category: "takas",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Kitap Bağış Kampanyası",
      date: "5 Mayıs 2023",
      participants: 32,
      category: "eğitim",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = (events) => {
    if (!searchQuery) return events;
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location &&
        event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 px-4 shadow-lg">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={selectedEvent ? handleBackToList : null}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">
              {selectedEvent ? selectedEvent.title : "Etkinlikler"}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 overflow-y-auto">
        {!selectedEvent ? (
          <div className="space-y-4 p-4">
            {/* Arama ve Filtreleme */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Etkinliklerde ara..."
                className="pl-9 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button className="h-12">
                <Plus className="h-4 w-4 mr-2" /> Yeni Etkinlik
              </Button>
              <Button variant="outline" className="h-12">
                <Calendar className="h-4 w-4 mr-2" /> Takvim
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg p-1 gap-1">
                <TabsTrigger
                  value="upcoming"
                  className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  Yaklaşan
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  Geçmiş
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  Kaydedilen
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Etkinlik Listesi */}
            {activeTab === "upcoming" && (
              <div className="space-y-4">
                {filteredEvents(upcomingEvents).length === 0 ? (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                        <Calendar className="h-10 w-10 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Yaklaşan etkinlik yok
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Yeni etkinlikler eklendiğinde burada görünecek
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Etkinlik Oluştur
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEvents(upcomingEvents).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "past" && (
              <div className="space-y-4">
                {filteredEvents(pastEvents).length === 0 ? (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                        <Calendar className="h-10 w-10 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Geçmiş etkinlik yok
                      </h3>
                      <p className="text-muted-foreground">
                        Katıldığınız etkinlikler burada görünecek
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEvents(pastEvents).map((event) => (
                    <PastEventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "saved" && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                    <Heart className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Kaydedilmiş etkinlik yok
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Beğendiğiniz etkinlikleri kaydedin, burada görünsün
                  </p>
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4 mr-2" /> Etkinliklere Göz At
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Etkinlik Detay Sayfası */
          <div className="p-4 space-y-4">
            {/* Etkinlik Resmi */}
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-white text-emerald-600 hover:bg-white/90">
                {selectedEvent.category}
              </Badge>
            </div>

            {/* Etkinlik Bilgileri */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>{selectedEvent.title}</CardTitle>
                <CardDescription>{selectedEvent.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedEvent.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedEvent.location}</p>
                    <p className="text-sm text-muted-foreground">
                      Konum için haritayı görüntüleyin
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {selectedEvent.participants} katılımcı
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Etkinliğe katılan diğer üyeler
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="rounded-full">
                  <Share2 className="h-4 w-4 mr-2" /> Paylaş
                </Button>
                <Button className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" /> Katıl
                </Button>
              </CardFooter>
            </Card>

            {/* Katılımcılar */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Katılımcılar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="h-10 w-10 border-2 border-white">
                      <AvatarImage
                        src={`https://randomuser.me/api/portraits/${
                          i % 2 === 0 ? "women" : "men"
                        }/${i + 20}.jpg`}
                      />
                      <AvatarFallback>K{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarFallback>
                      +{selectedEvent.participants - 4}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" /> Tümünü Gör
                </Button>
              </CardFooter>
            </Card>

            {/* Konum */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Konum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-gray-400" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" /> Haritada Göster
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white border-t py-2 px-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="flex-col h-auto">
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs">Topluluk</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto text-emerald-600"
          >
            <Calendar className="h-5 w-5 mb-1" />
            <span className="text-xs">Etkinlikler</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto bg-emerald-100 rounded-full -mt-8 w-16 h-16"
          >
            <Plus className="h-6 w-6 mb-1 text-emerald-600" />
          </Button>
          <Button variant="ghost" className="flex-col h-auto">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Mesajlar</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Yardımcı Bileşenler
function EventCard({ event, onClick }) {
  return (
    <Card
      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-white text-emerald-600 hover:bg-white/90">
          {event.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
        <div className="flex items-center mt-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{event.date}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.participants} katılımcı</span>
          </div>
          <Button size="sm" className="rounded-full">
            Katıl
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PastEventCard({ event, onClick }) {
  return (
    <Card
      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover rounded-l-lg"
          />
        </div>
        <div className="p-4 flex-1">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.participants} katılımcı</span>
          </div>
          <Button variant="outline" size="sm" className="mt-3">
            Detayları Gör
          </Button>
        </div>
      </div>
    </Card>
  );
}