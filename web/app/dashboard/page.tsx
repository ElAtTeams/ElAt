"use client"

import { Calendar } from "@/components/ui/calendar"

import { X, Menu, Bell } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"
import {
  MapPin,
  Gift,
  Send,
  Users,
  Home,
  MessageCircle,
  User,
  MoreHorizontal,
  Share2,
  Bookmark,
  Flag,
  Heart,
  Smile,
  Search,
  List,
  Grid3X3,
  LifeBuoy,
  FilePlus,
} from "lucide-react"
import { LocationModal } from "@/app/components/modals/location-modal"
import HelpOfferModal from "@/app/components/modals/help-offer-modal"
import HelpRequestModal from "@/app/components/modals/help-request-modal"
import { DetailModal } from "@/app/components/modals/detail-modal"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { format } from "date-fns"

export default function DashboardPage() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeTab, setActiveTab] = useState("active")
  const [viewMode, setViewMode] = useState("detailed")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Kadıköy")
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({})
  const [isSaved, setIsSaved] = useState<{ [key: number]: boolean }>({})

  const user = {
    name: "Ayşe Yılmaz",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Kadıköy, İstanbul",
    rating: 4.8,
    reviews: 120,
  }

  const recentActivities = [
    {
      id: 1,
      type: "offer",
      title: "Evcil Hayvan Bakımı",
      category: "Evcil Hayvan",
      description: "Seyahat ederken kedinize bakabilirim. Mama ve su değişimi, oyun oynama.",
      user: {
        name: "Zeynep Demir",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        location: "Moda",
        rating: 4.9,
        reviews: 95,
      },
      timeAgo: "2 saat önce",
      status: "Aktif",
      images: ["https://images.unsplash.com/photo-1514888717193-b77d056a4072?auto=format&fit=crop&w=800&q=80"],
      detailedLocation: "Moda, Kadıköy",
      distance: "0.5 km",
      comments: [],
      likes: 5,
      saved: false,
    },
    {
      id: 2,
      type: "request",
      title: "Market Alışverişi",
      category: "Alışveriş",
      description: "Yaşlı komşum için market alışverişi yapacak birine ihtiyacım var.",
      user: {
        name: "Mehmet Kaya",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        location: "Feneryolu",
        rating: 4.7,
        reviews: 70,
      },
      timeAgo: "5 saat önce",
      status: "active",
      images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"],
      detailedLocation: "Feneryolu, Kadıköy",
      distance: "1.2 km",
      comments: [],
      likes: 3,
      saved: false,
    },
    {
      id: 3,
      type: "offer",
      title: "Küçük Tamiratlar",
      category: "Tamirat",
      description: "Evdeki küçük tamirat işlerinde (musluk, priz vb.) yardımcı olabilirim.",
      user: {
        name: "Can Aydın",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        location: "Caddebostan",
        rating: 4.5,
        reviews: 50,
      },
      timeAgo: "1 gün önce",
      status: "active",
      images: ["https://images.unsplash.com/photo-1581092917101-e0118921129d?auto=format&fit=crop&w=800&q=80"],
      detailedLocation: "Caddebostan, Kadıköy",
      distance: "2.0 km",
      comments: [],
      likes: 8,
      saved: false,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Mahalle Pikniği",
      date: new Date(2025, 6, 22), // July 22, 2025
      time: "14:00",
      location: "Moda Sahili",
      attendees: 45,
      description: "Geleneksel mahalle pikniğimiz için bir araya geliyoruz. Herkes davetlidir!",
    },
    {
      id: 2,
      title: "Kitap Kulübü Toplantısı",
      date: new Date(2025, 6, 25), // July 25, 2025
      time: "19:00",
      location: "Kadıköy Halk Kütüphanesi",
      attendees: 12,
      description: "Ayın kitabı 'Sineklerin Tanrısı' üzerine tartışmak için buluşuyoruz.",
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
  ]

  const categories = [
    {
      name: "Tüm Kategoriler",
      icon: <Home className="w-5 h-5" />,
      value: "all",
    },
    {
      name: "Bebek Ürünleri",
      icon: <MoreHorizontal className="w-5 h-5" />,
      value: "bebek-urunleri",
    },
    { name: "Giyim", icon: <Share2 className="w-5 h-5" />, value: "giyim" },
    {
      name: "Yiyecek",
      icon: <Bookmark className="w-5 h-5" />,
      value: "yiyecek",
    },
    { name: "Eğitim", icon: <Flag className="w-5 h-5" />, value: "egitim" },
    {
      name: "Ev Eşyaları",
      icon: <Heart className="w-5 h-5" />,
      value: "ev-esyalari",
    },
  ]

  const handleLocationSet = (locationData: any) => {
    console.log("Konum ayarlandı:", locationData)
    setIsLocationModalOpen(false)
  }

  const handleOfferSubmit = (offerData: any) => {
    console.log("Yardım teklifi gönderildi:", offerData)
    setIsOfferModalOpen(false)
  }

  const handleRequestSubmit = (requestData: any) => {
    console.log("Yardım talebi gönderildi:", requestData)
    setIsRequestModalOpen(false)
  }

  const openDetailModal = (item: any) => {
    setSelectedItem(item)
    setIsDetailModalOpen(true)
  }

  const toggleLike = (postId: number) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const toggleSavePost = (postId: number) => {
    setIsSaved((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      {/* Header - Now fully managed by DashboardPage */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 px-4 shadow-lg">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Navigasyonu Aç/Kapat</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link href="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Heart className="h-6 w-6" />
                    <span className="sr-only">YanKapı</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900"
                  >
                    <Home className="h-5 w-5" />
                    Anasayfa
                  </Link>
                  <Link
                    href="/dashboard/community"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900"
                  >
                    <Users className="h-5 w-5" />
                    Topluluk
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Mesajlar
                  </Link>
                  <Link
                    href="/dashboard/events"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900"
                  >
                    <Calendar className="h-5 w-5" />
                    Etkinlikler
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900"
                  >
                    <User className="h-5 w-5" />
                    Profil
                  </Link>
                </nav>
                <div className="mt-auto">
                  <Separator className="my-4" />
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => console.log("Çıkış Yap")}>
                    Çıkış Yap
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">El Uzat</h1>
            </div>
            <div
              className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">{selectedLocation}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
            {/* Desktop Search Input */}
            <div className="relative hidden md:block w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Ara..."
                className="w-full appearance-none bg-gray-100 pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
            <button
              onClick={() => setViewMode(viewMode === "detailed" ? "grid" : "detailed")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block"
            >
              {viewMode === "detailed" ? (
                <Grid3X3 className="h-5 w-5 text-white" />
              ) : (
                <List className="h-5 w-5 text-white" />
              )}
            </button>
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="hidden md:flex items-center space-x-1 px-4 py-2 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span>Yardım Et</span>
            </button>
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent text-white">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Bildirimleri Aç</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Yeni mesajınız var</DropdownMenuItem>
                <DropdownMenuItem>Yeni etkinlikler eklendi</DropdownMenuItem>
                <DropdownMenuItem>Profiliniz görüntülendi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ayarlar</DropdownMenuItem>
                <DropdownMenuItem>Destek</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Çıkış Yap")}>Çıkış Yap</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="p-4">
          <div className="flex items-center space-x-2">
            <Input type="search" placeholder="Ara..." className="flex-1" />
            <Button variant="outline" size="icon" onClick={() => setShowSearch(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ana İçerik */}
      <div className="flex flex-1 w-full">
        {/* Sol Sidebar - Detaylı Görünümde */}
        {viewMode === "detailed" && (
          <aside className="hidden lg:block w-72 sticky top-[64px] h-[calc(100vh-64px)] bg-white border-r border-gray-200 overflow-y-auto">
            <div className="h-full flex flex-col p-4 space-y-5">
              {/* Kullanıcı Profili */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl mb-4">
                <div className="relative h-10 w-10">
                  <Image
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Profil"
                    fill
                    className="rounded-full border-2 border-emerald-200 object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ayşe Nur</h3>
                  <p className="text-xs text-gray-500">Kadıköy, İstanbul</p>
                </div>
              </div>

              {/* Yardım Et / Talep Et Butonları */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setIsOfferModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg shadow hover:shadow-emerald-200/50 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  <span>Yardım Et</span>
                </button>
                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold text-emerald-700 border-2 border-emerald-600 bg-white rounded-lg hover:bg-emerald-50 transition"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>Talep Et</span>
                </button>
              </div>

              {/* Kategoriler */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">KATEGORİLER</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                    >
                      <span className="text-emerald-600">{category.icon}</span>
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Yardım & Destek */}
              <div className="mt-auto bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <LifeBuoy className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-900 mb-1">Yardım & Destek</h4>
                    <p className="text-xs text-gray-700 mb-2">Sorularınız mı var? Yardıma mı ihtiyacınız var?</p>
                    <a
                      href="/support"
                      className="text-xs font-medium text-emerald-700 hover:underline flex items-center"
                    >
                      Destek Sayfası
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Ana Akış */}
        <main
          className={`flex-1 ${
            viewMode === "detailed" ? "lg:flex-[1]" : "w-full"
          } overflow-y-auto h-[calc(100vh-64px)] border-x border-gray-200 bg-gray-50`}
        >
          {/* Akış Başlığı */}
          <div className="sticky top-0 z-20 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">Topluluk Yardımlaşmaları</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                  {selectedLocation}
                </span>
              </div>
            </div>
            {/* Tabs */}
            {/* ... */}
          </div>

          {/* Gönderiler */}
          {viewMode === "detailed" ? (
            <div className="divide-y divide-gray-200">
              {recentActivities
                .filter((post) => {
                  if (activeTab === "active") return post.status === "active"
                  if (activeTab === "saved") return isSaved[post.id]
                  return true
                })
                .map((post) => (
                  <article key={post.id} className="bg-white hover:shadow-sm transition-shadow">
                    {/* Gönderi Başlığı */}
                    <header className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10">
                          <Image
                            src={post.user.avatar || "/placeholder.svg"}
                            alt={post.user.name}
                            fill
                            className="rounded-full border-2 border-emerald-200 object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{post.user.name}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>
                              {post.user.location} • {post.distance} uzakta
                            </span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border border-gray-200">
                          <DropdownMenuItem className="cursor-pointer rounded-lg py-2">
                            <Share2 className="h-4 w-4 mr-2" /> Paylaş
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer rounded-lg py-2"
                            onClick={() => toggleSavePost(post.id)}
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            {isSaved[post.id] ? "Kaydı Kaldır" : "Kaydet"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-lg py-2 text-red-500">
                            <Flag className="h-4 w-4 mr-2" /> Şikayet Et
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </header>

                    {/* Gönderi Görseli */}
                    <div className="relative w-full h-80 cursor-pointer group" onClick={() => openDetailModal(post)}>
                      <Image
                        src={post.images[0] || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700 shadow-md">
                        {post.type === "yardim" ? "YARDIM" : "TALEP"}
                      </Badge>
                      {post.images.length > 1 && (
                        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                          +{post.images.length - 1} fotoğraf
                        </div>
                      )}
                    </div>

                    {/* Gönderi İçeriği */}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex space-x-4">
                          <button className="hover:scale-110 transition-transform" onClick={() => toggleLike(post.id)}>
                            <Heart
                              className="h-6 w-6"
                              fill={isLiked[post.id] ? "#ef4444" : "none"}
                              stroke={isLiked[post.id] ? "#ef4444" : "currentColor"}
                            />
                          </button>
                          <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => openDetailModal(post)}
                          >
                            <MessageCircle className="h-6 w-6" />
                          </button>
                          <button className="hover:scale-110 transition-transform">
                            <Send className="h-6 w-6" />
                          </button>
                        </div>
                        <button
                          className="hover:scale-110 transition-transform"
                          onClick={() => toggleSavePost(post.id)}
                        >
                          <Bookmark
                            className="h-6 w-6"
                            fill={isSaved[post.id] ? "#059669" : "none"}
                            stroke={isSaved[post.id] ? "#059669" : "currentColor"}
                          />
                        </button>
                      </div>

                      <div className="text-sm font-medium mb-2">{post.likes + (isLiked[post.id] ? 1 : 0)} beğenme</div>

                      <div className="mb-2">
                        <h3 className="font-semibold text-base mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-700 line-clamp-2">{post.description}</p>
                      </div>

                      {post.comments.length > 0 && (
                        <button
                          className="text-sm text-gray-500 mb-2 hover:underline"
                          onClick={() => openDetailModal(post)}
                        >
                          {post.comments.length} yorumun tümünü gör
                        </button>
                      )}

                      <div className="text-xs text-gray-400 uppercase">{post.timeAgo}</div>

                      {/* Yorum Ekleme */}
                      <div className="flex items-center border-t border-gray-100 pt-3 mt-3">
                        <div className="flex-1 relative">
                          <Input
                            type="text"
                            placeholder="Yorum ekle..."
                            className="rounded-full pl-4 pr-10 bg-gray-50 border-none text-sm h-9 focus-visible:ring-1 focus-visible:ring-emerald-500"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <Smile className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                        <button className="ml-2 p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors">
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {recentActivities
                .filter((post) => {
                  if (activeTab === "active") return post.status === "active"
                  if (activeTab === "saved") return isSaved[post.id]
                  return true
                })
                .map((post) => (
                  <article
                    key={post.id}
                    className="relative aspect-square bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                    onClick={() => openDetailModal(post)}
                  >
                    <Image src={post.images[0] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="text-white">
                        <h3 className="font-medium line-clamp-1 text-sm">{post.title}</h3>
                        <div className="flex items-center text-xs mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{post.user.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                          {post.type === "yardim" ? "YARDIM" : "TALEP"}
                        </Badge>
                        <span className="text-xs text-white/80">{post.timeAgo}</span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </main>

        {/* Sağ Sidebar - Detaylı Görünümde */}
        {viewMode === "detailed" && (
          <aside className="hidden xl:block w-80 sticky top-[64px] h-[calc(100vh-64px)] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="h-full flex flex-col p-4 space-y-5">
              {/* Topluluk Gündemi */}
              <section className="bg-white border border-emerald-100 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-emerald-800 text-base">Topluluk Gündemi</h3>
                </div>
                <div className="relative h-28 mb-3 rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
                    alt="Topluluk"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  Dayanışma ve iyilikle güçlenen bir topluluğun parçası olun.
                </p>
                <button className="w-full text-sm py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition">
                  Topluluğu Keşfet
                </button>
              </section>

              {/* Yaklaşan Etkinlikler */}
              <section>
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-emerald-800 text-base">Yaklaşan Etkinlikler</h3>
                </div>
                <div className="space-y-3 mb-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex flex-col items-center justify-center mr-3 text-sm">
                        <span className="font-bold">{format(event.date, "dd")}</span>
                        <span>{format(event.date, "MMM").toUpperCase()}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-800">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {event.location} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 w-full text-left font-medium">
                  Tümünü Gör →
                </button>
              </section>

              {/* Yardım Rehberi */}
              <section className="mt-auto">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-emerald-800 text-base">Yardım Rehberi</h3>
                </div>
                <div className="space-y-2">
                  <a href="#" className="block text-sm p-2.5 hover:bg-gray-50 rounded-lg border border-gray-100">
                    Nasıl Yardım Edebilirim?
                  </a>
                  <a href="#" className="block text-sm p-2.5 hover:bg-gray-50 rounded-lg border border-gray-100">
                    Güvenli Bağış İpuçları
                  </a>
                </div>
              </section>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Navigation (kept here as it's part of the page's main content) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex justify-around items-center py-2">
          {/* Anasayfa */}
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-emerald-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Anasayfa</span>
          </Link>

          {/* Mesajlar */}
          <Link href="/dashboard/messages" className="flex flex-col items-center justify-center text-gray-500">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Mesajlar</span>
          </Link>

          {/* YARDIM ET Butonu - Ortada */}
          <button
            onClick={() => setIsOfferModalOpen(true)}
            className="flex flex-col items-center justify-center text-white bg-emerald-600 rounded-full p-2 -mt-4 shadow-lg hover:bg-emerald-700 transition-colors"
          >
            <Heart className="w-7 h-7" />
          </button>

          {/* Etkinlikler */}
          <Link href="/dashboard/events" className="flex flex-col items-center justify-center text-gray-500">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Etkinlikler</span>
          </Link>

          {/* Topluluk (Removed from bottom nav) */}
          {/* <Link href="/dashboard/community" className="flex flex-col items-center justify-center text-gray-500">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Topluluk</span>
          </Link> */}

          {/* Profil */}
          <Link href="/dashboard/profile" className="flex flex-col items-center justify-center text-gray-500">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>

      {/* Modals (kept here as they are global to the dashboard page) */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSet={handleLocationSet}
      />
      <HelpOfferModal show={isOfferModalOpen} onHide={() => setIsOfferModalOpen(false)} onCreate={handleOfferSubmit} />
      <HelpRequestModal
        show={isRequestModalOpen}
        onHide={() => setIsRequestModalOpen(false)}
        onCreate={handleRequestSubmit}
      />
      <DetailModal
        post={selectedItem}
        show={isDetailModalOpen}
        onHide={() => setIsDetailModalOpen(false)}
        onSave={toggleSavePost}
        onLike={toggleLike}
        isLiked={isLiked}
        isSaved={isSaved}
      />
    </div>
  )
}
