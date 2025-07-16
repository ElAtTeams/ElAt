"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareButtons } from "@/app/share/components/share-buttons";
import { ArrowLeft, Gift, Users, MessageSquare, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SharePage() {
  const router = useRouter();
  
  // Paylaşım seçenekleri
  const shareOptions = [
    { icon: <Users className="h-6 w-6" />, title: "WhatsApp ile Paylaş", color: "bg-green-500" },
    { icon: <MessageSquare className="h-6 w-6" />, title: "Telegram ile Paylaş", color: "bg-blue-500" },
    { icon: <Share2 className="h-6 w-6" />, title: "Diğer Platformlar", color: "bg-gray-500" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()} 
            className="text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Paylaş</h1>
          <div className="w-10" /> {/* Hizalama için yer tutucu */}
        </div>
      </header>
      
      {/* Ana İçerik */}
      <main className="flex flex-grow flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Paylaşım Kartı */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">El Uzat'ı Paylaşın!</h2>
              <p className="text-gray-700 mb-6">
                Topluluğumuzu büyütmek için El Uzat uygulamasını arkadaşlarınızla ve ailenizle paylaşın. Ne kadar çok kişi
                katılırsa, o kadar çok yardımlaşabiliriz!
              </p>
              
              {/* Paylaşım Butonları */}
              <div className="space-y-3">
                {shareOptions.map((option, index) => (
                  <Button 
                    key={index}
                    className={`w-full flex items-center justify-center py-3 ${
                      option.color
                    } hover:opacity-90 transition-opacity text-white font-medium rounded-lg`}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Faydalar Bölümü */}
          <div className="w-full space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Paylaşmanın Faydaları</h3>
            
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 flex items-start">
                <div className="bg-emerald-100 rounded-full p-3 mr-4 mt-1">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Daha Fazla Üye</h4>
                  <p className="text-sm text-gray-700">Daha fazla yardım talebi ve teklifi.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 flex items-start">
                <div className="bg-emerald-100 rounded-full p-3 mr-4 mt-1">
                  <MessageSquare className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Daha Canlı Tartışmalar</h4>
                  <p className="text-sm text-gray-700">Topluluk içinde daha fazla etkileşim.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Yardım Butonu (Mobil için) */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <Button className="rounded-full bg-emerald-600 text-white shadow-lg p-4 hover:bg-emerald-700 transition-colors">
          <Share2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}