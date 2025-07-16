"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Info, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function CommunityNamingPage() {
  const router = useRouter();
  const [communityName, setCommunityName] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleNext = () => {
    if (communityName.trim()) {
      router.push("/location/community-confirmation");
    } else {
      // Daha kullanıcı dostu bir geri bildirim
      alert("Lütfen bir topluluk adı girin.");
    }
  };

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
          <h1 className="text-lg font-bold text-gray-900">Topluluk Adı</h1>
          <div className="w-10" /> {/* Hizalama için yer tutucu */}
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex flex-grow flex-col items-center justify-center p-4">
        <div className="my-auto flex flex-col items-center text-center max-w-md w-full">
          {/* İkon */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 shadow-lg">
            <MapPin className="h-16 w-16 text-emerald-600" />
          </div>
          
          {/* Başlık */}
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Topluluğunuza Bir İsim Verin</h2>
          
          {/* Açıklama Metni */}
          <p className="mb-6 text-gray-600">
            Bu, diğer kullanıcıların sizi haritada görmesini sağlayacak ve topluluğunuzu daha kolay bulmalarına yardımcı olacaktır.
          </p>
          
          {/* Form */}
          <Card className="w-full bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="community-name" className="text-sm font-medium text-gray-700 mb-1 block">
                    Topluluk Adı
                  </Label>
                  <Input
                    id="community-name"
                    type="text"
                    placeholder="Örn: Kadıköy Dayanışma Ağı"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-3 text-lg focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                {/* Buton */}
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleNext}
                  className="w-full rounded-full py-4 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md"
                >
                  İLERİ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bilgi Butonu */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-white shadow-lg"
          onClick={() => setShowInfoModal(true)}
        >
          <Info size={28} className="text-emerald-600" />
        </Button>
      </main>

      {/* Bilgi Modalı */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="w-full max-w-md rounded-lg overflow-hidden">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-lg mx-auto">Topluluk Adı Bilgisi</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowInfoModal(false)} className="p-0">
              <X size={24} />
            </Button>
          </DialogHeader>
          <DialogContent className="py-6">
            <div className="text-center mb-4">
              <div className="mx-auto bg-emerald-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Info size={32} className="text-emerald-600" />
              </div>
              <h5 className="font-semibold text-lg mb-3">Topluluk Adı Neden Önemli?</h5>
              <p className="text-gray-600 mb-4">
                Topluluk adı, diğer kullanıcıların sizi haritada görmesini ve topluluğunuzu daha kolay bulmalarını sağlar.
                Bu, yerel yardımlaşma ağınızı güçlendirmek için önemlidir.
              </p>
            </div>
          </DialogContent>
          <DialogFooter className="border-t-0 pt-0">
            <Button
              variant="default"
              className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
              onClick={() => setShowInfoModal(false)}
            >
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}