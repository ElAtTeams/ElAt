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
  Search,
  MapPin,
  Users,
  Gift,
  MessageSquare,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  Mail,
  Share2,
  Flag,
  MoreHorizontal,
  ArrowRight,
  Calendar,
  Bookmark,
  User,
  MessageCircle,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("members");
  const [selectedMember, setSelectedMember] = useState(null);
  const [radius, setRadius] = useState(20);
  
  // Topluluk verileri
  const community = {
    name: "Kadıköy Topluluğu",
    members: 13249,
    radius: radius,
    stats: {
      gifts: 56,
      asks: 8,
      gratitudes: 12,
      connections: 109,
    },
    builder: {
      name: "Ayşe K. (Moda)",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      posts: 23,
      raves: 5,
      bio: "Komşuları bir araya getirme ve yerel destek ağları oluşturma tutkusu olan bir topluluk yöneticisi.",
    },
    membersList: [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Moda",
        posts: 12,
        active: "2 gün önce",
        bio: "Merhaba, ben Ahmet. Bahçıvanlık yapmayı ve komşulara ev projelerinde yardım etmeyi seviyorum.",
      },
      {
        id: 2,
        name: "Zeynep Demir",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        location: "Feneryolu",
        posts: 5,
        active: "1 hafta önce",
        bio: "Bölgeye yeni taşındım ve dost canlısı komşularla tanışmak istiyorum.",
      },
      {
        id: 3,
        name: "Mehmet Kaya",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        location: "Caddebostan",
        posts: 28,
        active: "Bugün",
        bio: "Küçük tamiratlar ve tavsiyeler konusunda yardımcı olmaktan mutluluk duyan yerel bir tamirci.",
      },
      {
        id: 4,
        name: "Deniz Arslan",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        location: "Erenköy",
        posts: 3,
        active: "3 hafta önce",
        bio: "Yemek sever ve ara sıra komşularla ekstra yemekler paylaşan bir fırıncı.",
      },
      {
        id: 5,
        name: "Selin Öztürk",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
        location: "Göztepe",
        posts: 45,
        active: "Dün",
        bio: "Emekli öğretmen, ders verme ve kitap önerileri sunuyor.",
      },
      {
        id: 6,
        name: "Can Aydın",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        location: "Kozyatağı",
        posts: 7,
        active: "4 gün önce",
        bio: "Merhaba, ben Can. Topluluğumla bağlantı kurmayı seviyorum.",
      },
    ],
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleBackToList = () => {
    setSelectedMember(null);
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
              onClick={selectedMember ? handleBackToList : null}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">
              {selectedMember ? selectedMember.name : "Topluluğum"}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" /> Paylaş
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" /> Şikayet Et
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 overflow-y-auto">
        {!selectedMember ? (
          <div className="space-y-4 p-4">
            {/* Topluluk Bilgileri */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members.toLocaleString()} üye • {radius} km
                        çapında
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Değiştir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer mb-6"
                />
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {community.stats.gifts}
                    </div>
                    <p className="text-sm text-muted-foreground">İyilik</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {community.stats.asks}
                    </div>
                    <p className="text-sm text-muted-foreground">Talep</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-500">
                      {community.stats.gratitudes}
                    </div>
                    <p className="text-sm text-muted-foreground">Teşekkür</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {community.stats.connections}
                    </div>
                    <p className="text-sm text-muted-foreground">Bağlantı</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Topluluk Yöneticisi */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Yakındaki Topluluk Yöneticisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={community.builder.avatar} />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{community.builder.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {community.builder.posts} gönderi • {community.builder.raves}{" "}
                      takdir
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {community.builder.bio}
                </p>
              </CardContent>
            </Card>

            {/* Hızlı Eylemler */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12">
                <Plus className="h-4 w-4 mr-2" /> Arkadaş Davet Et
              </Button>
              <Button variant="outline" className="h-12">
                <Search className="h-4 w-4 mr-2" /> Üye Bul
              </Button>
            </div>

            {/* Sekmeler */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg p-1 gap-1">
                <TabsTrigger
                  value="members"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Üyeler
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Aktivite
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none"
                >
                  Harita
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Üyeler Listesi */}
            {activeTab === "members" && (
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Topluluğunuzdaki İnsanlar</h3>
                  <p className="text-sm text-muted-foreground">Son katılanlar</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {community.membersList.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleMemberClick(member)}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {member.name}{" "}
                              <span className="text-sm text-muted-foreground">
                                ({member.location})
                              </span>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {member.posts} gönderi • Son aktivite:{" "}
                              {member.active}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full h-12 rounded-none text-emerald-600 hover:text-emerald-700"
                  >
                    Daha Fazla Göster <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Aktivite Sekmesi */}
            {activeTab === "activity" && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                    <Gift className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Henüz Aktiviteniz Yok
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Topluluğunuzdaki son aktiviteler burada görünecek
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Yeni Gönderi Paylaş
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Harita Sekmesi */}
            {activeTab === "map" && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                    <MapPin className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Harita Görünümü</h3>
                  <p className="text-muted-foreground mb-6">
                    Yakınınızdaki topluluk üyelerini haritada görün
                  </p>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" /> Haritayı Aç
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Üye Profil Sayfası */
          <div className="p-4 space-y-4">
            {/* Profil Bilgileri */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={selectedMember.avatar} />
                  <AvatarFallback>
                    {selectedMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">
                  Merhaba, Ben {selectedMember.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedMember.bio}
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  <Button variant="outline" className="rounded-full">
                    <Mail className="h-4 w-4 mr-2" /> Mesaj Gönder
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    <Gift className="h-4 w-4 mr-2" /> Hediye Gönder
                  </Button>
                </div>
                <Button variant="outline" className="rounded-full">
                  <Star className="h-4 w-4 mr-2" />{" "}
                  {selectedMember.name.split(" ")[0]} hakkında yorum yap
                </Button>
              </CardContent>
            </Card>

            {/* Topluluk Bilgileri */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <h3 className="font-semibold">
                  Topluluk: {selectedMember.location}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground mb-4">
                  <span className="mr-3">Gönderiler</span>
                  <Badge variant="outline">{selectedMember.posts}</Badge>
                  <span className="mx-3">•</span>
                  <span>Aktif: {selectedMember.active}</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <Button variant="ghost" className="flex-col h-auto">
                    <Gift className="h-5 w-5 mb-1" />
                    <span className="text-xs">Hediyeler</span>
                  </Button>
                  <Button variant="ghost" className="flex-col h-auto">
                    <MessageSquare className="h-5 w-5 mb-1" />
                    <span className="text-xs">Gönderiler</span>
                  </Button>
                  <Button variant="ghost" className="flex-col h-auto">
                    <Heart className="h-5 w-5 mb-1" />
                    <span className="text-xs">Beğeniler</span>
                  </Button>
                  <Button variant="ghost" className="flex-col h-auto">
                    <Bookmark className="h-5 w-5 mb-1" />
                    <span className="text-xs">Kaydedilenler</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Son Aktivite */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <h3 className="font-semibold">Son Aktivite</h3>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <Gift className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="text-muted-foreground mb-4">Henüz aktivite yok</p>
                <Button variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" /> Tüm geçmişi gör
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="flex justify-around items-center py-3">
          <Button variant="ghost" className="flex flex-col items-center justify-center text-gray-500">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Anasayfa</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center text-gray-500">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Topluluk</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center text-gray-500">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Mesajlar</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center text-gray-500">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Etkinlikler</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center text-gray-500"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}