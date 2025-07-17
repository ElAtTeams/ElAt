"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  Settings,
  Edit,
  Mail,
  Bell,
  Sun,
  MapPin,
  Users,
  Star,
  HelpCircle,
  Shield,
  FileText,
  Send,
  LogOut,
  Trash2,
  User,
  Grid3x3,
  Clock,
  Bookmark,
  Trophy,
  Calendar,
  Check,
  Palette,
  Globe,
  Gift,
  Info,
  MessageSquare,
  Share2,
  Plus,
  Home,
  MessageCircle,
  HandHelping,
  ChevronRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showSettings, setShowSettings] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  // Kullanıcı verileri
  const user = {
    name: "Yapay Zeka Asistanı",
    username: "@yapayzekaai",
    joinDate: "Temmuz 2025",
    community: "İstanbul",
    bio: "Merhaba! Ben bir yapay zeka asistanıyım. Topluluğa yardımcı olmak için buradayım.",
    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    stats: {
      posts: 0,
      followers: 24,
      following: 12,
      raves: 0,
    },
    isSupporter: false,
    level: 3,
    progress: 65,
    badges: ["Yeni Üye", "Aktif Katılımcı", "Topluluk Lideri"],
  }

  // Ayarlar seçenekleri
  const settingsSections = [
    {
      title: "Hesap",
      items: [
        {
          icon: <User className="h-5 w-5" />,
          title: "Profil Bilgileri",
          action: () => setShowEditProfile(true),
        },
        { icon: <Bell className="h-5 w-5" />, title: "Bildirimler" },
        { icon: <Mail className="h-5 w-5" />, title: "E-posta Tercihleri" },
      ],
    },
    {
      title: "Görünüm",
      items: [
        { icon: <Sun className="h-5 w-5" />, title: "Tema", subtitle: "Koyu" },
        {
          icon: <Palette className="h-5 w-5" />,
          title: "Renk Şeması",
          subtitle: "Yeşil",
        },
        { icon: <Globe className="h-5 w-5" />, title: "Dil", subtitle: "Türkçe" },
      ],
    },
    {
      title: "Topluluk",
      items: [
        { icon: <MapPin className="h-5 w-5" />, title: "Konum Ayarları" },
        { icon: <Users className="h-5 w-5" />, title: "Topluluk Yöneticisi Ol" },
        { icon: <Shield className="h-5 w-5" />, title: "Topluluk Taahhüdü" },
      ],
    },
    {
      title: "Üyelik",
      items: [
        { icon: <Star className="h-5 w-5" />, title: "Destekçi Üye Ol" },
        { icon: <Gift className="h-5 w-5" />, title: "Premium Özellikler" },
      ],
    },
    {
      title: "Diğer",
      items: [
        { icon: <Info className="h-5 w-5" />, title: "Hakkında", subtitle: "v2.3.1" },
        { icon: <HelpCircle className="h-5 w-5" />, title: "Yardım" },
        { icon: <Shield className="h-5 w-5" />, title: "Gizlilik Politikası" },
        { icon: <FileText className="h-5 w-5" />, title: "Kullanım Şartları" },
        { icon: <Send className="h-5 w-5" />, title: "Arkadaş Davet Et" },
        {
          icon: <LogOut className="h-5 w-5" />,
          title: "Çıkış Yap",
          danger: true,
        },
        {
          icon: <Trash2 className="h-5 w-5" />,
          title: "Hesabı Sil",
          danger: true,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Profil</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4 mr-2" /> Ayarlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowEditProfile(true)}>
                <Edit className="h-4 w-4 mr-2" /> Profili Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" /> Paylaş
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 overflow-y-auto">
        {/* Profil Üst Bilgisi */}
        <div className="relative">
          <div className="h-32 w-full bg-gradient-to-r from-emerald-600 to-emerald-500" />
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>YZ</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-20 px-4 text-center">
          <div className="flex justify-center items-center mb-2">
            <h2 className="text-2xl font-bold mr-2 text-gray-900">{user.name}</h2>
            <Badge variant="outline" className="border-emerald-500 text-emerald-600">
              <Check className="h-4 w-4 mr-1 text-emerald-600" />
              Doğrulanmış
            </Badge>
          </div>
          <p className="text-gray-500 mb-4">@{user.username}</p>
          <div className="flex justify-center gap-3 mb-6">
            <Button variant="outline" className="rounded-full bg-transparent">
              Takip Et
            </Button>
            <Button className="rounded-full">
              <MessageSquare className="h-4 w-4 mr-2" /> Mesaj
            </Button>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-4 gap-4 mb-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.stats.posts}</div>
              <div className="text-sm text-gray-500">Gönderi</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.stats.followers}</div>
              <div className="text-sm text-gray-500">Takipçi</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.stats.following}</div>
              <div className="text-sm text-gray-500">Takip</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.stats.raves}</div>
              <div className="text-sm text-gray-500">Takdir</div>
            </div>
          </div>

          {/* Seviye Çubuğu */}
          <div className="mb-6 px-4 max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Seviye {user.level}</span>
              <span className="text-sm font-medium text-emerald-600">{user.progress}%</span>
            </div>
            <Progress value={user.progress} className="h-2 bg-gray-200" />
          </div>
        </div>

        {/* Sekmeler */}
        <div className="px-4 mb-6">
          {/* Tabs component is assumed to be imported or defined elsewhere */}
          {/* <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg p-1 gap-1">
              <TabsTrigger
                value="posts"
                className="py-2 text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Grid3x3 className="h-4 w-4 mr-1 inline-block" /> Gönderiler
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="py-2 text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Clock className="h-4 w-4 mr-1 inline-block" /> Aktivite
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="py-2 text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <User className="h-4 w-4 mr-1 inline-block" /> Profil
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>

        {/* Sekme İçerikleri */}
        <div className="px-4 pb-20">
          {activeTab === "posts" && (
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <Grid3x3 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Aktif Gönderiniz Yok</h3>
                <p className="text-gray-500 mb-6">Henüz aktif bir gönderi paylaşmadınız</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" /> Yeni Gönderi Oluştur
                </Button>
              </CardContent>
            </Card>
          )}
          {activeTab === "activity" && (
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <Clock className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Henüz Aktiviteniz Yok</h3>
                <p className="text-gray-500">Henüz bir aktivite kaydınız bulunmuyor</p>
              </CardContent>
            </Card>
          )}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <User className="h-5 w-5 mr-2 text-emerald-600" />
                    Hakkımda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700">{user.bio}</p>
                  <Button
                    variant="outline"
                    className="w-full text-sm bg-transparent"
                    onClick={() => setShowEditProfile(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Profili Düzenle
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-emerald-600" />
                    Topluluk Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium text-gray-700">Katılma Tarihi</span>
                    </div>
                    <span className="text-gray-500">{user.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium text-gray-700">Topluluk</span>
                    </div>
                    <span className="text-gray-500">{user.community}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium text-gray-700">Topluluk Yöneticisi</span>
                    </div>
                    <Badge variant="secondary">Hayır</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-emerald-600" />
                    Rozetler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="flex items-center py-1 px-3 bg-gray-50">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {!user.isSupporter && (
                <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                      <Star className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Destekçi Üye Olun</h3>
                    <p className="text-gray-600 mb-6">
                      Premium özelliklerin kilidini açın ve topluluğumuza destek olun
                    </p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Star className="h-4 w-4 mr-2" /> Destekçi Üye Ol
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex justify-around items-center py-2">
          {/* Anasayfa */}
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-gray-500">
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
            <HandHelping className="w-7 h-7" />
          </button>

          {/* Etkinlikler */}
          <Link href="/dashboard/events" className="flex flex-col items-center justify-center text-gray-500">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Etkinlikler</span>
          </Link>

          {/* Topluluk */}
          <Link href="/dashboard/community" className="flex flex-col items-center justify-center text-gray-500">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Topluluk</span>
          </Link>

          {/* Profil */}
          <Link href="/dashboard/profile" className="flex flex-col items-center justify-center text-emerald-600">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>

      {/* Ayarlar Modalı */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ayarlar</DialogTitle>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="space-y-4">
            {settingsSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium text-gray-500 mb-2">{section.title}</h3>
                <div className="bg-white rounded-lg border border-gray-200 divide-y">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                        item.danger ? "text-red-500" : ""
                      }`}
                      onClick={item.action}
                    >
                      <div className={`mr-3 ${item.danger ? "text-red-500" : "text-emerald-600"}`}>{item.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        {item.subtitle && <div className="text-sm text-gray-500">{item.subtitle}</div>}
                      </div>
                      {!item.danger && <ChevronRight className="h-5 w-5 text-gray-400" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Profil Düzenleme Modalı */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profili Düzenle</DialogTitle>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>YZ</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white border-2 border-emerald-500"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ad Soyad</label>
                <Input defaultValue={user.name} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
                <Input defaultValue={user.username} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hakkımda</label>
                <Textarea defaultValue={user.bio} className="min-h-[100px]" />
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditProfile(false)}>
              İptal
            </Button>
            <Button onClick={() => setShowEditProfile(false)}>Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
