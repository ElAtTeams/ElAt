"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ManualEntryPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSearch = () => {
    if (address.trim()) {
      router.push("/location/community-naming");
    } else {
      // Daha kullanıcı dostu bir geri bildirim
      alert("Lütfen bir adres girin.");
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
          <h1 className="text-lg font-bold text-gray-900">Manuel Konum Girişi</h1>
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
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Adresinizi Girin</h2>
          
          {/* Açıklama Metni */}
          <p className="mb-6 text-gray-600">
            Lütfen tam adresinizi veya önemli bir yer işaretini girin.
          </p>
          
          {/* Arama Formu */}
          <Card className="w-full bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Örn: Bağdat Caddesi, Kadıköy"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border-gray-300 py-3 pl-10 pr-3 text-lg focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                {/* Buton */}
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSearch}
                  className="w-full rounded-full py-4 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md"
                >
                  ARA
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Yardım Butonu */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-white shadow-lg"
            onClick={() => setShowHelpModal(true)}
          >
            <Search size={28} className="text-emerald-600" />
          </Button>
        </div>
      </main>

      {/* Yardım Modalı */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="w-full max-w-md rounded-lg overflow-hidden">
          <DialogHeader className="border-b-0 pb-0">
            <DialogTitle className="font-bold text-lg mx-auto">Nasıl Adres Girebilirim?</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowHelpModal(false)} className="p-0">
              <X size={24} />
            </Button>
          </DialogHeader>
          <DialogContent className="py-6">
            <div className="text-center mb-4">
              <div className="mx-auto bg-emerald-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Search size={32} className="text-emerald-600" />
              </div>
              <h5 className="font-semibold text-lg mb-3">Adres Girişi İçin İpuçlar</h5>
              <ul className="text-left text-gray-600 space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-emerald-600">•</div>
                  <span>Tam adresinizi (cadde/sokak, mahalle, bina numarası) yazın</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-emerald-600">•</div>
                  <span>Önemli bir yer işaretini (örneğin bir park, meydan) girin</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-emerald-600">•</div>
                  <span>Adresinize yakın bir noktayı seçin</span>
                </li>
              </ul>
            </div>
          </DialogContent>
          <DialogFooter className="border-t-0 pt-0">
            <Button
              variant="default"
              className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
              onClick={() => setShowHelpModal(false)}
            >
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}