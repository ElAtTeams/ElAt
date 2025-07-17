"use client"

import type React from "react"

import { useState } from "react"
import {
  Share2,
  LinkIcon,
  QrCode,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  PhoneIcon as Whatsapp,
  Copy,
  CheckCircle,
  X,
  Loader2,
  Home,
  Users,
  Calendar,
  User,
  HandHelping,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import QRCode from "qrcode.react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function SharePage() {
  const [shareLink, setShareLink] = useState("https://www.yankapi.com/invite/your-unique-code")
  const [emailContent, setEmailContent] = useState({
    subject: "YanKapı'ya Katılın!",
    body:
      "Merhaba,\n\nMahallemizdeki komşuluk ilişkilerini güçlendiren harika bir platform olan YanKapı'yı keşfettim. Siz de katılmak ister misiniz? İşte davet bağlantınız: " +
      shareLink +
      "\n\nSevgilerimle,\n[Adınız]",
  })
  const [smsContent, setSmsContent] = useState(
    "YanKapı'ya katılın ve komşularınızla bağlantı kurun! Davet bağlantısı: " + shareLink,
  )
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setIsLinkCopied(true)
    setTimeout(() => setIsLinkCopied(false), 2000)
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("E-posta gönderildi:", emailContent)
      // In a real app, you'd integrate with an email service
      alert("E-posta başarıyla gönderildi (simülasyon).")
    } catch (err) {
      setError("E-posta gönderilirken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      // Simulate sending SMS
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("SMS gönderildi:", smsContent)
      // In a real app, you'd integrate with an SMS service
      alert("SMS başarıyla gönderildi (simülasyon).")
    } catch (err) {
      setError("SMS gönderilirken bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
        <div className="w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:bg-gray-100 p-2 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Davet Et ve Paylaş</h1>
          </div>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Share Link */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5" /> Davet Bağlantısı
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="share-link">Davet Bağlantınız</Label>
              <div className="flex items-center space-x-2">
                <Input id="share-link" value={shareLink} readOnly className="flex-1" />
                <Button onClick={handleCopyLink} disabled={isLinkCopied}>
                  {isLinkCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="sr-only">Bağlantıyı Kopyala</span>
                </Button>
              </div>
              {isLinkCopied && <p className="text-sm text-emerald-600">Kopyalandı!</p>}
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" /> QR Kod
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="p-2 bg-white border rounded-lg shadow-sm">
                <QRCode value={shareLink} size={180} level="H" />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">Telefonunuzla tarayarak hızlıca paylaşın.</p>
            </CardContent>
          </Card>

          {/* Social Media Share */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" /> Sosyal Medyada Paylaş
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
                <Facebook className="w-6 h-6 text-blue-600" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
                <Twitter className="w-6 h-6 text-blue-400" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent">
                <Whatsapp className="w-6 h-6 text-green-500" />
                <span className="sr-only">WhatsApp</span>
              </Button>
              {/* Add more social media buttons as needed */}
            </CardContent>
          </Card>
        </div>

        {/* Email and SMS */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> E-posta ve SMS ile Davet Et
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">E-posta</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="mt-4 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
                <div>
                  <Label htmlFor="email-subject">Konu</Label>
                  <Input
                    id="email-subject"
                    value={emailContent.subject}
                    onChange={(e) => setEmailContent((prev) => ({ ...prev, subject: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="email-body">Mesaj</Label>
                  <Textarea
                    id="email-body"
                    value={emailContent.body}
                    onChange={(e) => setEmailContent((prev) => ({ ...prev, body: e.target.value }))}
                    rows={6}
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={handleSendEmail} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" /> E-posta Gönder
                    </>
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="sms" className="mt-4 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
                <div>
                  <Label htmlFor="sms-content">Mesaj</Label>
                  <Textarea
                    id="sms-content"
                    value={smsContent}
                    onChange={(e) => setSmsContent(e.target.value)}
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={handleSendSms} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" /> SMS Gönder
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
            // onClick={() => setShowOfferModal(true)} // This modal is handled by dashboard/page.tsx
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
          <Link href="/dashboard/profile" className="flex flex-col items-center justify-center text-gray-500">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
