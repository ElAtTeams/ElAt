"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermsOfServicePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Kullanım Şartları</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">El Uzat Kullanım Şartları</h2>
          <p className="text-gray-700 mb-4">
            El Uzat mobil uygulaması ve web sitesi ("Platform") kullanımınız, aşağıdaki Kullanım Şartları'na tabidir.
            Platformu kullanarak, bu şartları kabul etmiş olursunuz. Lütfen bu şartları dikkatlice okuyun.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Hizmetin Tanımı</h3>
          <p className="text-gray-700 mb-4">
            El Uzat, kullanıcıların birbirleriyle yardımlaşma talepleri ve teklifleri oluşturabileceği, etkinliklere
            katılabileceği ve topluluk tartışmalarına katılabileceği bir dayanışma platformudur.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">2. Kullanıcı Sorumlulukları</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Platformu yasalara ve ahlaki değerlere uygun olarak kullanmayı kabul edersiniz.</li>
            <li>Hesabınızın güvenliğinden ve şifrenizin gizliliğinden siz sorumlusunuz.</li>
            <li>Paylaştığınız tüm içeriklerin (metin, görsel vb.) doğru ve yanıltıcı olmadığından emin olmalısınız.</li>
            <li>Diğer kullanıcılara karşı saygılı ve nazik olmalısınız.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Yasaklı Faaliyetler</h3>
          <p className="text-gray-700 mb-2">Platformda aşağıdaki faaliyetler kesinlikle yasaktır:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Yasa dışı, zararlı, tehdit edici, taciz edici, karalayıcı, müstehcen veya ırkçı içerik paylaşımı.</li>
            <li>Dolandırıcılık, kimlik hırsızlığı veya yanıltıcı bilgi verme.</li>
            <li>Virüs, kötü amaçlı yazılım veya diğer zararlı kodları yayma.</li>
            <li>Diğer kullanıcıların kişisel bilgilerini izinsiz toplama veya kullanma.</li>
            <li>Platformun işleyişini bozmaya yönelik her türlü girişim.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">4. Fikri Mülkiyet Hakları</h3>
          <p className="text-gray-700 mb-4">
            Platformdaki tüm içerik (metin, grafikler, logolar, yazılım vb.) El Uzat'a veya lisans verenlerine aittir ve
            telif hakkı yasalarıyla korunmaktadır. İçerikleri izinsiz kopyalamak, dağıtmak veya kullanmak yasaktır.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Sorumluluk Reddi</h3>
          <p className="text-gray-700 mb-4">
            El Uzat, platformda paylaşılan içeriklerin doğruluğu, eksiksizliği veya güvenilirliği konusunda herhangi bir
            garanti vermez. Kullanıcılar arasındaki etkileşimlerden doğabilecek herhangi bir zarardan El Uzat sorumlu
            değildir.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">6. Şartların Değiştirilmesi</h3>
          <p className="text-gray-700 mb-4">
            El Uzat, bu Kullanım Şartları'nı istediği zaman değiştirme hakkını saklı tutar. Değişiklikler, Platformda
            yayınlandığı tarihte yürürlüğe girer. Değişikliklerden sonra Platformu kullanmaya devam etmeniz,
            güncellenmiş şartları kabul ettiğiniz anlamına gelir.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">7. İletişim</h3>
          <p className="text-gray-700 mb-4">
            Bu Kullanım Şartları ile ilgili herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
            destek@eluzat.com
          </p>

          <p className="text-gray-700 mt-6">**Son Güncelleme Tarihi:** 13 Temmuz 2025</p>
        </div>
      </div>
    </div>
  )
}
