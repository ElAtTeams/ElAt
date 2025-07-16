"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle, MapPin, Home, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CommunityConfirmationPage() {
  const router = useRouter();
  
  const handleConfirm = () => {
    router.push("/home");
  };
  
  const handleEdit = () => {
    router.push("/location/community-naming");
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
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Topluluk Onayı</h1>
          <div className="w-10" /> {/* Hizalama için yer tutucu */}
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex flex-grow flex-col items-center justify-center p-4">
        <div className="my-auto flex flex-col items-center text-center max-w-md w-full">
          {/* Başarı İkonu */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 shadow-lg">
            <CheckCircle className="h-16 w-16 text-emerald-600" />
          </div>
          
          {/* Başlık */}
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Topluluğunuz Hazır!</h2>
          
          {/* Açıklama Metni */}
          <p className="mb-6 text-gray-600">
            Konumunuz başarıyla ayarlandı. Artık çevrenizdeki yardım taleplerini ve tekliflerini görebilirsiniz.
          </p>
          
          {/* Topluluk Bilgileri Kartı */}
          <Card className="w-full mb-6 bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-emerald-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Seçilen Topluluk:</h3>
                  <p className="text-lg text-gray-700">Kadıköy Dayanışma Ağı</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                      <MapPin className="h-3 w-3 mr-1" />
                      İstanbul, Türkiye
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Butonlar */}
          <div className="w-full space-y-3">
            <Button
              variant="default"
              size="lg"
              onClick={handleConfirm}
              className="w-full rounded-full py-4 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md"
            >
              ANA SAYFAYA GİT
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleEdit}
              className="w-full rounded-full py-4 text-lg font-bold border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              DÜZENLE
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}