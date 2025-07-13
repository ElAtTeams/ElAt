"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Gizlilik Politikası</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">El Uzat Gizlilik Politikası</h2>
          <p className="text-gray-700 mb-4">
            Bu Gizlilik Politikası, El Uzat mobil uygulaması ve web sitesi ("Platform") aracılığıyla topladığımız,
            kullandığımız ve paylaştığımız bilgileri açıklamaktadır. Platformumuzu kullanarak, bu politikada açıklanan
            uygulamaları kabul etmiş olursunuz.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Topladığımız Bilgiler</h3>
          <p className="text-gray-700 mb-2">Platformumuzu kullandığınızda, aşağıdaki türde bilgileri toplayabiliriz:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>
              **Kişisel Tanımlayıcı Bilgiler:** Adınız, e-posta adresiniz, telefon numaranız, profil resminiz ve doğum
              tarihiniz gibi doğrudan sizi tanımlayan bilgiler.
            </li>
            <li>
              **Konum Bilgileri:** Cihazınızın GPS, Wi-Fi veya diğer teknolojiler aracılığıyla sağladığı kesin veya
              yaklaşık konum bilgileri. Bu bilgiler, size yakındaki yardım taleplerini ve tekliflerini göstermek için
              kullanılır.
            </li>
            <li>
              **Kullanım Bilgileri:** Platformu nasıl kullandığınıza dair bilgiler, örneğin ziyaret ettiğiniz sayfalar,
              tıkladığınız bağlantılar, gerçekleştirdiğiniz aramalar ve etkileşimde bulunduğunuz içerikler.
            </li>
            <li>
              **Cihaz Bilgileri:** Cihazınızın türü, işletim sistemi, benzersiz cihaz tanımlayıcıları ve mobil ağ
              bilgileri gibi teknik bilgiler.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">2. Bilgileri Nasıl Kullanıyoruz?</h3>
          <p className="text-gray-700 mb-2">Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Platformun işlevselliğini sağlamak ve hizmetlerimizi sunmak.</li>
            <li>Yardım taleplerini ve tekliflerini konumunuza göre eşleştirmek.</li>
            <li>Kullanıcı deneyimini kişiselleştirmek ve iyileştirmek.</li>
            <li>Platformun güvenliğini sağlamak ve dolandırıcılığı önlemek.</li>
            <li>Müşteri desteği sağlamak ve sorularınıza yanıt vermek.</li>
            <li>Yeni özellikler ve hizmetler geliştirmek.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Bilgileri Nasıl Paylaşıyoruz?</h3>
          <p className="text-gray-700 mb-2">Bilgilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>
              **Diğer Kullanıcılarla:** Yardım talepleri veya teklifleri ile ilgili olarak, adınız, profil resminiz ve
              yaklaşık konumunuz gibi belirli bilgileri diğer kullanıcılarla paylaşabiliriz.
            </li>
            <li>
              **Hizmet Sağlayıcılarla:** Platformun işletilmesi için bize yardımcı olan üçüncü taraf hizmet
              sağlayıcılarla (örneğin, barındırma, veri analizi, müşteri hizmetleri) bilgi paylaşabiliriz.
            </li>
            <li>
              **Yasal Yükümlülükler:** Yasal bir zorunluluk veya mahkeme kararı gereği bilgilerinizi açıklayabiliriz.
            </li>
            <li>
              **İş Transferleri:** Birleşme, satın alma veya varlık satışı gibi durumlarda bilgileriniz transfer
              edilebilir.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">4. Veri Güvenliği</h3>
          <p className="text-gray-700 mb-4">
            Bilgilerinizi yetkisiz erişim, kullanım veya ifşadan korumak için makul güvenlik önlemleri alıyoruz. Ancak,
            internet üzerinden hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olduğunu garanti
            edemeyiz.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Haklarınız</h3>
          <p className="text-gray-700 mb-2">Kişisel bilgilerinizle ilgili olarak belirli haklara sahipsiniz:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Bilgilerinize erişme ve düzeltme hakkı.</li>
            <li>Bilgilerinizin silinmesini talep etme hakkı.</li>
            <li>Bilgilerinizin işlenmesine itiraz etme hakkı.</li>
          </ul>
          <p className="text-gray-700 mt-2">Bu haklarınızı kullanmak için lütfen bizimle iletişime geçin.</p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">6. Bu Politikadaki Değişiklikler</h3>
          <p className="text-gray-700 mb-4">
            Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişiklik durumunda, güncellenmiş
            politikayı Platformumuzda yayınlayarak sizi bilgilendireceğiz.
          </p>

          <p className="text-gray-700 mt-6">**Son Güncelleme Tarihi:** 13 Temmuz 2025</p>
        </div>
      </div>
    </div>
  )
}
