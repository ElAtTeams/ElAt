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
  ChevronLeft,
  Plus,
  Mail,
  Star,
  StarIcon,
  Pin,
  PinIcon,
  Paperclip,
  Send,
  Smile,
  ArrowRight,
  User,
  Users,
  Filter,
  Trash2,
  Reply,
  Share2,
  MoreHorizontal,
  MessageSquare,
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
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [starredMessages, setStarredMessages] = useState([2, 4]);
  const [pinnedMessages, setPinnedMessages] = useState([1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyContent, setReplyContent] = useState("");
  
  // Mesaj verileri
  const messages = [
    {
      id: 1,
      sender: "Ayşe Yılmaz",
      senderLocation: "Ankara",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      subject: "Köpeğinizi yürütebilirim",
      preview:
        "Merhaba, bu hafta sonu köpeğinizi yürütebilirim. Kendim de golden retriever sahibiyim...",
      time: "2 saat önce",
      read: false,
      type: "help-offer",
      category: "community",
      attachments: [],
    },
    {
      id: 2,
      sender: "Mehmet Kaya",
      senderLocation: "İstanbul",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      subject: "Eski kitaplarımı paylaşıyorum",
      preview:
        "Merhaba, kullanmadığım birkaç kitabım var. İlgilenirseniz getirebilirim...",
      time: "1 gün önce",
      read: true,
      type: "share",
      category: "individual",
      attachments: [{ name: "kitap-listesi.pdf", size: "2.4MB" }],
    },
    {
      id: 3,
      sender: "El Uzat Topluluğu",
      senderLocation: "",
      avatar: "/community-logo.png",
      subject: "Topluluk kuralları güncellendi",
      preview:
        "Sevgili üyelerimiz, topluluk kurallarımızda küçük güncellemeler yapılmıştır...",
      time: "3 gün önce",
      read: true,
      type: "system",
      category: "community",
      attachments: [{ name: "yeni-kurallar.pdf", size: "1.2MB" }],
    },
    {
      id: 4,
      sender: "Zeynep Demir",
      senderLocation: "İzmir",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      subject: "Yardım teklifinizi kabul ediyorum",
      preview:
        "Teşekkür ederim! Yardım teklifinizi kabul etmek istiyorum. Detayları konuşabilir miyiz?",
      time: "5 gün önce",
      read: true,
      type: "help-accept",
      category: "individual",
      attachments: [],
    },
  ];
  
  // Filtrelenmiş mesajlar
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      searchQuery === "" ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "inbox") return matchesSearch;
    if (activeTab === "starred")
      return starredMessages.includes(msg.id) && matchesSearch;
    if (activeTab === "pinned")
      return pinnedMessages.includes(msg.id) && matchesSearch;
    if (activeTab === "unread") return !msg.read && matchesSearch;
    return matchesSearch;
  });
  
  // Mesajı yıldızla
  const toggleStar = (id) => {
    if (starredMessages.includes(id)) {
      setStarredMessages(starredMessages.filter((msgId) => msgId !== id));
    } else {
      setStarredMessages([...starredMessages, id]);
    }
  };
  
  // Mesajı sabitle
  const togglePin = (id) => {
    if (pinnedMessages.includes(id)) {
      setPinnedMessages(pinnedMessages.filter((msgId) => msgId !== id));
    } else {
      setPinnedMessages([...pinnedMessages, id]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100"
              onClick={() => setSelectedMessage(null)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedMessage ? selectedMessage.subject : "Mesajlar"}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {!selectedMessage && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:bg-gray-100"
                onClick={() => setShowComposeModal(true)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Ana İçerik */}
      <main className="flex-1 overflow-hidden">
        {!selectedMessage ? (
          <div className="space-y-4 p-4">
            {/* Arama ve Filtreleme */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Mesajlarda ara..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg p-1 gap-1">
                  <TabsTrigger
                    value="inbox"
                    className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    Tümü
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    Okunmamış
                  </TabsTrigger>
                  <TabsTrigger
                    value="starred"
                    className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    Yıldızlı
                  </TabsTrigger>
                  <TabsTrigger
                    value="pinned"
                    className="py-1 text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    Sabitlenen
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* Mesaj Listesi */}
            {filteredMessages.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto bg-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                    <MailOpen className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Mesaj bulunamadı
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Arama kriterlerinize uygun mesaj bulunamadı
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("inbox");
                    }}
                  >
                    Filtreyi temizle
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex flex-col items-center space-y-1 pt-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(message.id);
                              }}
                            >
                              {starredMessages.includes(message.id) ? (
                                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ) : (
                                <Star className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(message.id);
                              }}
                            >
                              {pinnedMessages.includes(message.id) ? (
                                <PinIcon className="h-4 w-4 text-emerald-600 fill-emerald-600" />
                              ) : (
                                <Pin className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>
                              {message.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  !message.read ? "text-gray-900" : "text-gray-600"
                                }`}
                              >
                                {message.sender}
                                {message.senderLocation && (
                                  <span className="text-gray-500 font-normal">
                                    {" "}
                                    ({message.senderLocation})
                                  </span>
                                )}
                              </h4>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {message.time}
                              </span>
                            </div>
                            <h5
                              className={`text-sm truncate ${
                                !message.read ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {message.subject}
                            </h5>
                            <p className="text-sm text-gray-500 truncate">
                              {message.preview}
                            </p>
                            <div className="flex gap-2 mt-2">
                              {message.category === "community" && (
                                <Badge
                                  variant="outline"
                                  className="flex items-center px-2 py-0.5 text-xs"
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Topluluk
                                </Badge>
                              )}
                              {message.attachments.length > 0 && (
                                <Badge
                                  variant="outline"
                                  className="flex items-center px-2 py-0.5 text-xs"
                                >
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  Ek
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-3"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Mesaj Detay Sayfası */
          <div className="h-full flex flex-col">
            {/* Mesaj Başlık */}
            <div className="border-b p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedMessage(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {pinnedMessages.includes(selectedMessage.id) && (
                      <PinIcon className="inline h-4 w-4 text-emerald-600 fill-emerald-600 mr-2" />
                    )}
                    {selectedMessage.subject}
                  </h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => toggleStar(selectedMessage.id)}
                    >
                      {starredMessages.includes(selectedMessage.id) ? (
                        <>
                          <StarIcon className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                          Yıldızı kaldır
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Yıldızla
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => togglePin(selectedMessage.id)}
                    >
                      {pinnedMessages.includes(selectedMessage.id) ? (
                        <>
                          <PinIcon className="h-4 w-4 mr-2 text-emerald-600 fill-emerald-600" />
                          Sabitlemeyi kaldır
                        </>
                      ) : (
                        <>
                          <Pin className="h-4 w-4 mr-2" />
                          Sabitle
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Reply className="h-4 w-4 mr-2" />
                      Yanıtla
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      İlet
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* Mesaj İçeriği */}
            <div className="flex-1 overflow-auto p-4 space-y-6">
              {/* Gönderen Bilgisi */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedMessage.avatar} />
                  <AvatarFallback>
                    {selectedMessage.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {selectedMessage.sender}
                      {selectedMessage.senderLocation && (
                        <span className="text-gray-500 font-normal">
                          {" "}
                          ({selectedMessage.senderLocation})
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {selectedMessage.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedMessage.category === "community"
                      ? "Topluluk Mesajı"
                      : "Bireysel Mesaj"}
                  </p>
                </div>
              </div>
              {/* Mesaj Body */}
              <div className="prose prose-sm max-w-none">
                <p>Merhaba,</p>
                <p>
                  {selectedMessage.preview} Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nullam euismod, nisl eget
                  aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl
                  nunc eu nisl.
                </p>
                <p>
                  Saygılarımla,
                  <br />
                  {selectedMessage.sender.split(" ")[0]}
                </p>
              </div>
              {/* Ekler */}
              {selectedMessage.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Ekler ({selectedMessage.attachments.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMessage.attachments.map((file, index) => (
                      <Card key={index} className="hover:bg-gray-50">
                        <CardContent className="p-3 flex items-center">
                          <div className="bg-emerald-100 rounded-full p-2 mr-3">
                            <Paperclip className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.size}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {/* Yardım Teklifi Özel */}
              {selectedMessage.type === "help-offer" && (
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-emerald-100 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-emerald-600"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-800">
                          Yardım Teklifi
                        </h4>
                        <p className="text-sm text-emerald-700">
                          Bu kişi size yardım teklif ediyor
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Teklifi Kabul Et
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Teşekkür Edip Reddet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* Yanıt Formu */}
            <div className="border-t p-4 bg-white">
              <Textarea
                placeholder="Yanıt yazın..."
                className="min-h-[100px] mb-3"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Gönder
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Yeni Mesaj Modalı */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold">Yeni Mesaj</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowComposeModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium">Alıcı</label>
                <Input placeholder="İsim veya e-posta girin" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Konu</label>
                <Input placeholder="Mesaj konusu" />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Mesaj</label>
                <Textarea
                  placeholder="Mesajınızı buraya yazın..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="border rounded-lg p-4 text-center bg-gray-50">
                <Paperclip className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-3">
                  Dosyaları buraya sürükleyip bırakın veya
                </p>
                <Button variant="outline" size="sm">
                  Dosya Seç
                </Button>
                <p className="text-xs text-gray-400 mt-3">
                  PDF, JPG, PNG formatlarında, max 10MB
                </p>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowComposeModal(false)}
              >
                İptal
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Gönder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}