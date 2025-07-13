"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  List,
  Grid3X3,
  MoreHorizontal,
  MessageCircle,
  Heart,
  Bookmark,
  Gift,
  X,
  Info,
  Send,
  Smile,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HelpOfferModal from "@/app/components/modals/help-offer-modal" // Corrected import
import HelpRequestModal from "@/app/components/modals/help-request-modal" // Corrected import
import { DetailModal } from "@/app/components/modals/detail-modal"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("aktif")
  const [viewMode, setViewMode] = useState("detailed")
  const [selectedPost, setSelectedPost] = useState(null)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Kadıköy")
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [showPostMenu, setShowPostMenu] = useState(false)

  const samplePosts = [
    {
      id: 1,
      user: "Elif Kaya (Kadıköy)",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "9 saat önce",
      images: ["/placeholder.svg?height=350&width=600"],
      title: "Bebek salı - iyi durumda, fazladan var!",
      content: "Bebek salımız fazla geldi, iyi durumda ve ücretsiz veriyoruz.",
      type: "yardim",
      location: "George Mason Üniversitesi yakını",
      detailedLocation: "Kadıköy, İstanbul",
      status: "aktif",
      comments: [
        {
          user: "G07",
          content: "1 yaşında bir çocuğum var, kullanabiliriz.",
        },
        {
          user: "Ahmet Y.",
          content: "Hala müsait mi? Yarın alabilirim.",
        },
      ],
      likes: 12,
      saved: false,
    },
    {
      id: 2,
      user: "Mehmet Demir (Beşiktaş)",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "2 gün önce",
      images: ["/placeholder.svg?height=350&width=600"],
      title: "Kullanılmamış bebek bezi - 3 numara",
      content: "Fazla aldığım bebek bezlerini ihtiyacı olan ailelere verebilirim.",
      type: "yardim",
      location: "Beşiktaş Meydan",
      detailedLocation: "Beşiktaş, İstanbul",
      status: "aktif",
      comments: [
        {
          user: "Ayşe K.",
          content: "Çok ihtiyacım var, nasıl ulaşabilirim?",
        },
      ],
      likes: 8,
      saved: false,
    },
    {
      id: 3,
      user: "Zeynep Şahin (Üsküdar)",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "1 gün önce",
      images: ["/placeholder.svg?height=350&width=600"],
      title: "Çocuk kitapları - hediye",
      content: "5-8 yaş arası çocuklar için hikaye kitaplarım var.",
      type: "yardim",
      location: "Üsküdar Sahil",
      detailedLocation: "Üsküdar, İstanbul",
      status: "aktif",
      comments: [],
      likes: 5,
    },
    {
      id: 4,
      user: "Can Aydın (Şişli)",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "5 saat önce",
      images: ["/placeholder.svg?height=350&width=600"],
      title: "Bebek arabası arıyorum",
      content: "İkinci el temiz bir bebek arabası arıyorum, 0-3 yaş için.",
      type: "talep",
      location: "Şişli Metro",
      detailedLocation: "Şişli, İstanbul",
      status: "aktif",
      comments: [
        {
          user: "Deniz T.",
          content: "Benim kullanmadığım bir araba var, fotoğraf atabilirim.",
        },
      ],
      likes: 3,
      saved: false,
    },
  ]

  const handlePostClick = (post: any) => {
    setSelectedPost(post)
  }

  const toggleSavePost = (postId: number) => {
    // Implement save functionality
    console.log(`Post ${postId} saved/unsaved`)
  }

  // Dummy onCreate function for HelpOfferModal
  const handleOfferSubmit = (data: any) => {
    console.log("Help Offer Submitted:", data)
    setShowOfferModal(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b py-2 px-3 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold mr-2 text-green-600 text-2xl">El Uzat</span>
            <div
              className="border border-green-600 rounded-full px-3 py-1 cursor-pointer"
              onClick={() => setShowLocationModal(true)}
            >
              <div className="flex items-center">
                <span className="text-green-600 font-medium">{selectedLocation}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#28a745"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 mr-2 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              onClick={() => setShowSearch(true)}
            >
              <Search size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              onClick={() => setViewMode(viewMode === "detailed" ? "grid" : "detailed")}
            >
              {viewMode === "detailed" ? <Grid3X3 size={18} /> : <List size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Offcanvas */}
      <Sheet open={showSearch} onOpenChange={setShowSearch}>
        <SheetContent side="top" className="pt-12">
          <SheetHeader>
            <SheetTitle>Ara</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <Input type="search" placeholder="Ne aramak istiyorsunuz?" className="mb-3" />
            <div className="text-gray-600 text-sm">Örneğin: "bebek bezi", "market alışverişi"</div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Location Selection Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="w-full h-full max-w-none rounded-none p-4 text-center">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-lg mx-auto">Kayıtlı Lokasyonlar</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowLocationModal(false)} className="p-0">
              <X size={24} />
            </Button>
          </DialogHeader>
          <div className="py-4">
            <Info size={48} className="text-green-600 mb-3 mx-auto" />
            <h5 className="font-semibold text-lg mb-3">Kayıtlı lokasyon bulunamadı</h5>
            <p className="text-gray-600 mb-4">
              Birden fazla lokasyonu kaydedebilmek ve premium özelliklerin kilidini açmak için sürdürülebilir üye olun.
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="link" className="text-green-600 font-medium hover:underline">
              Daha Fazla Bilgi
            </Button>
            <Button
              variant="default"
              className="px-4 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowLocationModal(false)}
            >
              Tamam
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-grow flex p-0 overflow-hidden">
        {/* Left Menu */}
        {viewMode === "detailed" && (
          <div className="hidden lg:flex flex-col w-1/4 p-4 bg-green-50 border-r sticky top-0 h-screen overflow-y-auto">
            <div className="flex flex-col h-full">
              <div>
                <Card className="border-0 bg-white shadow-sm mb-4 w-full text-center">
                  <CardContent className="p-4">
                    <Button
                      variant="default"
                      size="icon"
                      className="mb-3 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setShowOfferModal(true)}
                    >
                      <Image src="/placeholder.svg?height=28&width=28" width={28} height={28} alt="Yardım Et" />
                    </Button>
                    <h6 className="font-bold text-gray-900">Yardım Et</h6>
                  </CardContent>
                </Card>

                <HelpOfferModal
                  show={showOfferModal}
                  onHide={() => setShowOfferModal(false)}
                  onCreate={handleOfferSubmit}
                />

                <Card className="border-0 bg-white shadow-sm mb-4 w-full text-center">
                  <CardContent className="p-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mb-3 rounded-full w-14 h-14 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() => setShowRequestModal(true)}
                    >
                      <Image src="/placeholder.svg?height=28&width=28" width={28} height={28} alt="Talep Et" />
                    </Button>
                    <h6 className="font-bold text-gray-900">Talep Et</h6>
                  </CardContent>
                </Card>

                <HelpRequestModal show={showRequestModal} onHide={() => setShowRequestModal(false)} />
              </div>

              <div className="mt-auto text-center text-sm text-gray-600">
                <Link href="/community-rules" passHref>
                  <Button variant="link" className="text-green-600 hover:underline p-0 mb-1 block mx-auto">
                    Topluluk Kuralları
                  </Button>
                </Link>
                <Link href="/help-center" passHref>
                  <Button variant="link" className="text-green-600 hover:underline p-0 block mx-auto">
                    Yardım Merkezi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Feed */}
        <div className={`flex-grow ${viewMode === "detailed" ? "lg:w-2/4" : "w-full"} p-0 bg-white overflow-y-auto`}>
          {/* Sticky Header with Tabs */}
          <div className="sticky top-0 bg-white pt-3 pb-2 border-b z-10">
            <div className="flex justify-between items-center px-3 mb-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="aktif">Aktif</TabsTrigger>
                  <TabsTrigger value="tum">Tümü</TabsTrigger>
                  <TabsTrigger value="kaydedilen">Kaydedilenler</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Post List */}
          {viewMode === "detailed" ? (
            <div className="pb-5 divide-y divide-gray-200">
              {samplePosts.map((post) => (
                <Card key={post.id} className="border-0 rounded-none shadow-none mb-0 overflow-hidden">
                  {/* Post Header */}
                  <CardHeader className="bg-white border-0 flex flex-row items-center p-3">
                    <Image
                      src={post.avatar || "/placeholder.svg"}
                      alt={post.user}
                      width={48}
                      height={48}
                      className="rounded-full mr-3 border border-green-600"
                    />
                    <div className="flex-grow">
                      <div className="font-bold text-gray-900">{post.user}</div>
                      <small className="text-gray-600 flex items-center">
                        <MapPin size={12} className="mr-1" /> {post.location} • {post.time}
                      </small>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-900">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Paylaş</DropdownMenuItem>
                        <DropdownMenuItem>Kaydet</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Rapor Et</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>

                  {/* Post Image */}
                  {post.images.length > 0 && (
                    <div className="relative w-full h-[350px]">
                      {" "}
                      {/* Added fixed height for Image fill */}
                      <Image
                        src={post.images[0] || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover cursor-pointer"
                        onClick={() => handlePostClick(post)}
                      />
                      {post.type === "yardim" && (
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white">Yardım Talebi</Badge>
                      )}
                    </div>
                  )}

                  {/* Post Content */}
                  <CardContent className="pb-2 p-3">
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900">{post.title}</CardTitle>
                    <p className="text-gray-700 mb-3">{post.content}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mb-3">
                      <small className="text-gray-600 flex items-center">
                        <MapPin className="mr-1 text-green-600" size={14} />
                        {post.detailedLocation}
                      </small>
                      <Button
                        variant={post.type === "yardim" ? "default" : "outline"}
                        size="sm"
                        className={`rounded-full px-3 ${
                          post.type === "yardim"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "border-green-600 text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {post.type === "yardim" ? "İlgileniyorum" : "Yardım Edebilirim"}
                      </Button>
                    </div>

                    {/* Comments Preview */}
                    {post.comments.length > 0 && (
                      <div className="mb-3">
                        {post.comments.slice(0, 2).map((comment, index) => (
                          <div key={index} className="flex mb-2 text-gray-700">
                            <strong className="mr-2">{comment.user}:</strong>
                            <span>{comment.content}</span>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <Button
                            variant="link"
                            className="p-0 text-gray-600 text-sm hover:underline"
                            onClick={() => handlePostClick(post)}
                          >
                            {post.comments.length - 2} yorum daha göster
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="flex items-center mb-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 text-gray-600"
                        onClick={() => {
                          /* Implement emoji picker logic if needed */
                        }}
                      >
                        <Smile size={20} />
                      </Button>
                      <Input
                        type="text"
                        placeholder="Yorum yaz..."
                        className="rounded-full flex-grow mr-2 bg-gray-100 border-0 focus:ring-0"
                      />
                      <Button
                        variant="default"
                        size="icon"
                        className="rounded-full w-9 h-9 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send size={16} />
                      </Button>
                    </div>

                    {/* Interaction Icons */}
                    <div className="border-t pt-3 flex justify-around text-gray-700">
                      <Button variant="link" className="text-gray-700 p-0 flex items-center">
                        <MessageCircle size={20} className="text-green-600 mr-1" />
                        <span>{post.comments.length}</span>
                      </Button>
                      <Button variant="link" className="text-gray-700 p-0 flex items-center">
                        <Heart size={20} className="text-green-600 mr-1" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="link"
                        className="text-gray-700 p-0 flex items-center"
                        onClick={() => toggleSavePost(post.id)}
                      >
                        <Bookmark size={20} className="text-green-600 mr-1" />
                      </Button>
                      <Button variant="link" className="text-gray-700 p-0 flex items-center">
                        <Gift size={20} className="text-green-600 mr-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Grid View */
            <div className="p-3 pb-5 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {samplePosts.map((post) => (
                  <Card key={post.id} className="h-full border-0 shadow-sm overflow-hidden">
                    <div className="relative w-full h-[180px] cursor-pointer" onClick={() => handlePostClick(post)}>
                      <Image
                        src={post.images[0] || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {post.type === "yardim" && (
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white">Yardım</Badge>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <CardTitle className="text-sm font-bold mb-1 text-gray-900">{post.title}</CardTitle>
                      <small className="text-gray-600 flex items-center mb-2">
                        <MapPin size={12} className="mr-1" /> {post.location}
                      </small>
                      <div className="flex justify-around text-gray-700">
                        <div className="flex items-center">
                          <MessageCircle size={16} className="text-green-600 mr-1" />
                          <small>{post.comments.length}</small>
                        </div>
                        <div className="flex items-center">
                          <Heart size={16} className="text-green-600 mr-1" />
                          <small>{post.likes}</small>
                        </div>
                        <Bookmark size={16} className="text-green-600" />
                        <Gift size={16} className="text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Menu */}
        {viewMode === "detailed" && (
          <div className="hidden lg:flex flex-col w-1/4 p-4 bg-green-50 border-l sticky top-0 h-screen overflow-y-auto">
            <div className="flex flex-col h-full">
              <div>
                <Card className="border-0 bg-white shadow-sm mb-4">
                  <CardContent className="p-4 text-center">
                    <div className="bg-green-100 rounded-full inline-flex items-center justify-center p-3 mb-3">
                      <Gift size={24} className="text-green-600" />
                    </div>
                    <h5 className="font-bold text-lg mb-3 text-gray-900">El Uzat Topluluğu</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      Komşularınızla yardımlaşarak daha güçlü bir topluluk oluşturun.
                    </p>
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Topluluğa Katıl
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white shadow-sm">
                  <CardContent className="p-4">
                    <h6 className="font-bold text-lg mb-3 text-gray-900">Yakındaki Etkinlikler</h6>
                    <div className="flex mb-3">
                      <div className="flex-shrink-0 mr-3">
                        <div className="bg-gray-100 rounded-md p-2 text-center w-12">
                          <div className="font-bold text-green-600">15</div>
                          <div className="text-xs text-gray-600">Haz</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Yardım Günü</div>
                        <small className="text-gray-600">Kadıköy Halk Parkı</small>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      Tüm Etkinlikler
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        post={selectedPost}
        show={selectedPost !== null}
        onHide={() => setSelectedPost(null)}
        onSave={toggleSavePost}
      />
    </div>
  )
}
