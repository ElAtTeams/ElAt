"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  List,
  Grid3X3,
  MoreHorizontal,
  MessageCircle,
  Heart,
  Bookmark,
  X,
  LifeBuoy,
  FilePlus,
  HandHelping,
  Flag,
  Share2,
  Send,
  Smile,
  Home,
  Users,
  Calendar,
  Gift,
  ShoppingBag,
  Baby,
  Shirt,
  BookOpen,
  Utensils,
  User,
} from "lucide-react";
import Image from "next/image";
import HelpOfferModal from "@/app/components/modals/help-offer-modal";
import HelpRequestModal from "@/app/components/modals/help-request-modal";
import { DetailModal } from "@/app/components/modals/detail-modal";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("active");
  const [viewMode, setViewMode] = useState("detailed");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Kadıköy");
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isLiked, setIsLiked] = useState({});
  const [isSaved, setIsSaved] = useState({});

  const samplePosts = [
    {
      id: 1,
      user: "Elif Kaya",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "9 saat önce",
      images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
        "https://images.unsplash.com/photo-1596704017256-17930792d2f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1604917018615-8ec3321db931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      ],
      title: "Bebek salıncağı - iyi durumda, fazladan var",
      content:
        "Fazladan bebek salıncağımız var, iyi durumda ve ücretsiz veriyoruz. Kullanılmış ama temiz ve sağlam durumda. İhtiyacı olan aileler için hazırladık.",
      type: "yardim",
      location: "George Mason Üniversitesi yakını",
      detailedLocation: "Kadıköy, İstanbul",
      status: "active",
      comments: [
        {
          user: "G07",
          avatar: "https://randomuser.me/api/portraits/women/33.jpg",
          content:
            "1 yaşında çocuğum var, kullanabiliriz. Nasıl iletişim kurabiliriz?",
          time: "2 saat önce",
        },
        {
          user: "Ahmet Y.",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          content: "Hala müsait mi? Yarın alabilirim.",
          time: "5 dakika önce",
        },
      ],
      likes: 12,
      saved: false,
      category: "bebek-urunleri",
      distance: "1.2 km",
    },
    {
      id: 2,
      user: "Mehmet Demir",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "2 gün önce",
      images: [
        "https://images.unsplash.com/photo-1590845947676-fa2576f401d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1583947581924-a31d1c01e6a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      ],
      title: "Kullanılmamış bebek bezi - 3 numara",
      content:
        "Fazla aldığım bebek bezlerini ihtiyacı olan ailelere verebilirim. 3 paket kullanılmamış bebek bezi var. Marka: Huggies.",
      type: "yardim",
      location: "Beşiktaş Meydan",
      detailedLocation: "Beşiktaş, İstanbul",
      status: "active",
      comments: [
        {
          user: "Ayşe K.",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg",
          content: "Çok ihtiyacım var, nasıl ulaşabilirim?",
          time: "1 gün önce",
        },
      ],
      likes: 8,
      saved: false,
      category: "bebek-urunleri",
      distance: "3.5 km",
    },
    {
      id: 3,
      user: "Zeynep Şahin",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      time: "1 gün önce",
      images: [
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      ],
      title: "Çocuk kitapları - hediye",
      content:
        "5-8 yaş arası çocuklar için hikaye kitaplarım var. Yaklaşık 20 kitap, hepsi iyi durumda. Eğitim amaçlı kitaplar da var.",
      type: "yardim",
      location: "Üsküdar Sahil",
      detailedLocation: "Üsküdar, İstanbul",
      status: "active",
      comments: [],
      likes: 5,
      category: "egitim",
      distance: "2.1 km",
    },
    {
      id: 4,
      user: "Can Aydın",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      time: "5 saat önce",
      images: [
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1604917018615-8ec3321db931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      ],
      title: "Bebek arabası arıyorum",
      content:
        "İkinci el temiz bir bebek arabası arıyorum, 0-3 yaş için. Bütçem kısıtlı olduğu için ücretsiz veya çok uygun fiyatlı olanları değerlendirebilirim.",
      type: "talep",
      location: "Şişli Metro",
      detailedLocation: "Şişli, İstanbul",
      status: "active",
      comments: [
        {
          user: "Deniz T.",
          avatar: "https://randomuser.me/api/portraits/women/29.jpg",
          content: "Kullanmadığım bir araba var, fotoğraf atabilirim.",
          time: "1 saat önce",
        },
      ],
      likes: 3,
      saved: false,
      category: "bebek-urunleri",
      distance: "4.7 km",
    },
    {
      id: 5,
      user: "Ayşe Nur",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      time: "1 gün önce",
      images: [
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
      title: "Kadın ve çocuk kıyafetleri",
      content:
        "Temiz ve iyi durumda kadın ve çocuk kıyafetleri veriyorum. Mevsimlik kıyafetler var. Ölçüler: Kadın 38-40, çocuk 6-8 yaş.",
      type: "yardim",
      location: "Kadıköy Çarşı",
      detailedLocation: "Kadıköy, İstanbul",
      status: "active",
      comments: [],
      likes: 7,
      category: "giyim",
      distance: "0.8 km",
    },
    {
      id: 6,
      user: "Murat Yılmaz",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      time: "3 gün önce",
      images: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
      title: "Günlük yemek desteği",
      content:
        "Restoranımızda her gün 10 kişilik yemek paketi hazırlıyoruz. İhtiyacı olanlar mesaj atabilir. Özellikle depremzede ailelere öncelik veriyoruz.",
      type: "yardim",
      location: "Moda Sahil",
      detailedLocation: "Kadıköy, İstanbul",
      status: "active",
      comments: [
        {
          user: "Sema K.",
          avatar: "https://randomuser.me/api/portraits/women/55.jpg",
          content: "Çok teşekkürler bu güzel hareket için. 3 kişilik aileyiz.",
          time: "2 gün önce",
        },
        {
          user: "Ali V.",
          avatar: "https://randomuser.me/api/portraits/men/36.jpg",
          content: "Yarın gelebilir miyiz?",
          time: "1 gün önce",
        },
      ],
      likes: 24,
      saved: false,
      category: "yiyecek",
      distance: "1.5 km",
    },
  ];

  const categories = [
    {
      name: "Tüm Kategoriler",
      icon: <Home className="w-5 h-5" />,
      value: "all",
    },
    {
      name: "Bebek Ürünleri",
      icon: <Baby className="w-5 h-5" />,
      value: "bebek-urunleri",
    },
    { name: "Giyim", icon: <Shirt className="w-5 h-5" />, value: "giyim" },
    {
      name: "Yiyecek",
      icon: <Utensils className="w-5 h-5" />,
      value: "yiyecek",
    },
    { name: "Eğitim", icon: <BookOpen className="w-5 h-5" />, value: "egitim" },
    {
      name: "Ev Eşyaları",
      icon: <ShoppingBag className="w-5 h-5" />,
      value: "ev-esyalari",
    },
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const toggleLike = (postId) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleSavePost = (postId) => {
    setIsSaved((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleOfferSubmit = (data) => {
    console.log("Yardım teklifi gönderildi:", data);
    setShowOfferModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 px-4 shadow-lg">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HandHelping className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">El Uzat</h1>
            </div>

            <div
              className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => setShowLocationModal(true)}
            >
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                {selectedLocation}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() =>
                setViewMode(viewMode === "detailed" ? "grid" : "detailed")
              }
              className="p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block"
            >
              {viewMode === "detailed" ? (
                <Grid3X3 className="h-5 w-5 text-white" />
              ) : (
                <List className="h-5 w-5 text-white" />
              )}
            </button>
            <button
              onClick={() => setShowOfferModal(true)}
              className="hidden md:flex items-center space-x-1 px-4 py-2 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <HandHelping className="h-4 w-4" />
              <span>Yardım Et</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Arama Modalı */}
      <Sheet open={showSearch} onOpenChange={setShowSearch}>
        <SheetContent side="top" className="pt-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Ne aramak istiyorsunuz? (bebek bezi, mobilya, kitap...)"
                className="pl-10 py-6 text-base border-2 border-emerald-500 focus-visible:ring-0"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Arama Önerileri */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                POPÜLER ARAMALAR
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "bebek bezi",
                  "kıyafet",
                  "kitap",
                  "mobilya",
                  "oyuncak",
                  "elektronik",
                  "gıda",
                  "kadın giyim",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>


      {/* Ana İçerik */}
      <div className="flex flex-1 w-full">
        {/* Sol Sidebar - Detaylı Görünümde */}
        {viewMode === "detailed" && (
          <aside className="hidden lg:block w-72 sticky top-[64px] h-[calc(100vh-64px)] bg-white border-r border-gray-200 overflow-y-auto">
            <div className="h-full flex flex-col p-4">
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
                  <p className="text-sm text-gray-500">Kadıköy, İstanbul</p>
                </div>
              </div>

              {/* Yardım Et / Talep Et Butonları */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setShowOfferModal(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg shadow hover:shadow-emerald-200/50 transition-all"
                >
                  <HandHelping className="w-5 h-5" />
                  <span>Yardım Et</span>
                </button>

                <button
                  onClick={() => setShowRequestModal(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold text-emerald-700 border-2 border-emerald-600 bg-white rounded-lg hover:bg-emerald-50 transition"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>Talep Et</span>
                </button>
              </div>

              {/* Kategoriler */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  KATEGORİLER
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                    >
                      <span className="text-emerald-600">{category.icon}</span>
                      <span className="font-medium text-gray-700">
                        {category.name}
                      </span>
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
                    <h4 className="text-sm font-semibold text-emerald-900 mb-1">
                      Yardım & Destek
                    </h4>
                    <p className="text-xs text-gray-700 mb-2">
                      Sorularınız mı var? Yardıma mı ihtiyacınız var?
                    </p>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
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
              <h2 className="text-lg font-bold text-gray-900">
                Topluluk Yardımlaşmaları
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                  {selectedLocation}
                </span>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg p-1 gap-1">
                <TabsTrigger
                  value="active"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Aktifler
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Tümü
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Kaydettiklerim
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Gönderiler */}
          {viewMode === "detailed" ? (
            <div className="divide-y divide-gray-200">
              {samplePosts
                .filter((post) => {
                  if (activeTab === "active") return post.status === "active";
                  if (activeTab === "saved") return isSaved[post.id];
                  return true;
                })
                .map((post) => (
                  <article
                    key={post.id}
                    className="bg-white hover:shadow-sm transition-shadow"
                  >
                    {/* Gönderi Başlığı */}
                    <header className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10">
                          <Image
                            src={post.avatar}
                            alt={post.user}
                            fill
                            className="rounded-full border-2 border-emerald-200 object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {post.user}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>
                              {post.location} • {post.distance} uzakta
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
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-xl shadow-lg border border-gray-200"
                        >
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
                    <div
                      className="relative w-full h-80 cursor-pointer group"
                      onClick={() => handlePostClick(post)}
                    >
                      <Image
                        src={post.images[0]}
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
                          <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart
                              className="h-6 w-6"
                              fill={isLiked[post.id] ? "#ef4444" : "none"}
                              stroke={
                                isLiked[post.id] ? "#ef4444" : "currentColor"
                              }
                            />
                          </button>
                          <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => handlePostClick(post)}
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
                            stroke={
                              isSaved[post.id] ? "#059669" : "currentColor"
                            }
                          />
                        </button>
                      </div>

                      <div className="text-sm font-medium mb-2">
                        {post.likes + (isLiked[post.id] ? 1 : 0)} beğenme
                      </div>

                      <div className="mb-2">
                        <h3 className="font-semibold text-base mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {post.content}
                        </p>
                      </div>

                      {post.comments.length > 0 && (
                        <button
                          className="text-sm text-gray-500 mb-2 hover:underline"
                          onClick={() => handlePostClick(post)}
                        >
                          {post.comments.length} yorumun tümünü gör
                        </button>
                      )}

                      <div className="text-xs text-gray-400 uppercase">
                        {post.time}
                      </div>

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
              {samplePosts
                .filter((post) => {
                  if (activeTab === "active") return post.status === "active";
                  if (activeTab === "saved") return isSaved[post.id];
                  return true;
                })
                .map((post) => (
                  <article
                    key={post.id}
                    className="relative aspect-square bg-white rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handlePostClick(post)}
                  >
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="text-white">
                        <h3 className="font-medium line-clamp-1 text-sm">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-xs mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{post.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                          {post.type === "yardim" ? "YARDIM" : "TALEP"}
                        </Badge>
                        <span className="text-xs text-white/80">
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </main>

        {/* Sağ Sidebar - Detaylı Görünümde */}
        {viewMode === "detailed" && (
          <aside className="hidden xl:block w-96 sticky top-[64px] h-[calc(100vh-64px)] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="h-full flex flex-col p-4 space-y-5">
              {/* Topluluk Gündemi */}
              <section className="bg-white border border-emerald-100 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-emerald-800 text-base">
                    Topluluk Gündemi
                  </h3>
                </div>
                <div className="relative h-28 mb-3 rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
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
                  <h3 className="font-semibold text-emerald-800 text-base">
                    Yaklaşan Etkinlikler
                  </h3>
                </div>

                <div className="space-y-3 mb-3">
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex flex-col items-center justify-center mr-3 text-sm">
                      <span className="font-bold">15</span>
                      <span>HAZ</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800">
                        Topluluk Yardım Günü
                      </h4>
                      <p className="text-sm text-gray-500">Kadıköy • 10:00</p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex flex-col items-center justify-center mr-3 text-sm">
                      <span className="font-bold">20</span>
                      <span>HAZ</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800">
                        Gıda Dağıtımı
                      </h4>
                      <p className="text-sm text-gray-500">
                        Moda Sahili • 14:00
                      </p>
                    </div>
                  </div>
                </div>

                <button className="text-sm text-emerald-600 hover:text-emerald-700 w-full text-left font-medium">
                  Tümünü Gör →
                </button>
              </section>

              {/* Yardım Rehberi */}
              <section className="mt-auto">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-emerald-800 text-base">
                    Yardım Rehberi
                  </h3>
                </div>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block text-sm p-2.5 hover:bg-gray-50 rounded-lg border border-gray-100"
                  >
                    Nasıl Yardım Edebilirim?
                  </a>
                  <a
                    href="#"
                    className="block text-sm p-2.5 hover:bg-gray-50 rounded-lg border border-gray-100"
                  >
                    Güvenli Bağış İpuçları
                  </a>
                </div>
              </section>
            </div>
          </aside>
        )}
      </div>

      {/* Mobil Bottom Navigation */}
      <div className="lg-hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="flex justify-around items-center py-3">
          {/* Anasayfa */}
          <button className="flex flex-col items-center justify-center text-emerald-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Anasayfa</span>
          </button>

          {/* Topluluk */}
          <button className="flex flex-col items-center justify-center text-gray-500">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Topluluk</span>
          </button>

          {/* Mesajlar */}
          <button className="flex flex-col items-center justify-center text-gray-500">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Mesajlar</span>
          </button>

          {/* Etkinlikler */}
          <button className="flex flex-col items-center justify-center text-gray-500">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Etkinlikler</span>
          </button>

          {/* Profil */}
          <button className="flex flex-col items-center justify-center text-gray-500">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </div>
      {/* Mobil Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="flex justify-around items-center py-2">
          <button className="p-2 rounded-full text-emerald-600">
            <Home className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full text-gray-600"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowOfferModal(true)}
            className="p-3 bg-emerald-600 text-white rounded-full shadow-lg -mt-6"
          >
            <HandHelping className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full text-gray-600">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full text-gray-600">
            <Users className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <HelpOfferModal
        show={showOfferModal}
        onHide={() => setShowOfferModal(false)}
        onCreate={handleOfferSubmit}
      />

      <HelpRequestModal
        show={showRequestModal}
        onHide={() => setShowRequestModal(false)}
      />

      <DetailModal
        post={selectedPost}
        show={selectedPost !== null}
        onHide={() => setSelectedPost(null)}
        onSave={toggleSavePost}
        onLike={toggleLike}
        isLiked={isLiked}
        isSaved={isSaved}
      />
    </div>
  );
}
