"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CommunityRulesPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Topluluk Kuralları</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">El Uzat Topluluk Kuralları</h2>
          <p className="text-gray-700 mb-4">
            El Uzat platformu, yardımlaşma ve dayanışma ruhuyla hareket eden bir topluluktur. Tüm üyelerimizin güvenli,
            saygılı ve olumlu bir deneyim yaşamasını sağlamak amacıyla aşağıdaki kurallara uyması gerekmektedir.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Saygı ve Nezaket</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>
              Tüm üyelere karşı saygılı ve nazik olun. Hakaret, taciz, tehdit veya ayrımcılık içeren davranışlar
              yasaktır.
            </li>
            <li>Farklı görüşlere sahip olsanız bile yapıcı ve anlayışlı bir dil kullanın.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">2. Güvenilirlik ve Dürüstlük</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Paylaştığınız tüm bilgilerin doğru ve güncel olduğundan emin olun.</li>
            <li>Yardım talepleri ve teklifleri gerçekçi ve ulaşılabilir olmalıdır.</li>
            <li>Dolandırıcılık veya yanıltıcı bilgiler vermek kesinlikle yasaktır.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">3. İlgili İçerik</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Gönderileriniz ve yorumlarınız platformun amacı olan yardımlaşma ve dayanışma ile ilgili olmalıdır.</li>
            <li>Ticari tanıtım, spam veya alakasız içerik paylaşımı yasaktır.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">4. Gizlilik</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Diğer üyelerin kişisel bilgilerini (adres, telefon numarası vb.) izinsiz paylaşmayın.</li>
            <li>Kişisel bilgilerinizi paylaşırken dikkatli olun ve yalnızca güvendiğiniz kişilerle paylaşın.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Yasalara Uygunluk</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Platformu kullanırken Türkiye Cumhuriyeti yasalarına ve uluslararası hukuk kurallarına uyun.</li>
            <li>Yasa dışı faaliyetleri teşvik eden veya kolaylaştıran içerik paylaşımı yasaktır.</li>
          </ul>

          <p className="text-gray-700 mt-6">
            Bu kurallara uymayan üyelerin gönderileri kaldırılabilir ve/veya üyelikleri askıya alınabilir.
            Topluluğumuzun güvenliği ve huzuru için bu kurallara riayet etmeniz büyük önem taşımaktadır.
          </p>
          <p className="text-gray-700 mt-2">
            Herhangi bir kural ihlali gördüğünüzde lütfen "Rapor Et" özelliğini kullanarak bize bildirin.
          </p>
        </div>
      </div>
    </div>
  )
}
