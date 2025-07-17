import { MapPin, Shield, MessageCircle, Star, Clock, Zap, Users, Heart } from "lucide-react"
import Image from "next/image"

export default function FeaturesPage() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            <span className="text-emerald-600 text-sm font-medium">Özelliklerimiz</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-900 bg-clip-text text-transparent">
            YanKapı&apos;nın Güçlü Özellikleri
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mahalle dayanışmasını güçlendirmek için tasarlanmış yenilikçi ve kullanıcı dostu özellikler.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <Image
              src="/images/features-hero.png" // Corrected to local placeholder
              alt="Konum Bazlı Eşleşme"
              width={800}
              height={600}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
              <span className="text-emerald-600 text-sm font-medium">Konum Bazlı</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Yakınınızdaki Komşularla Tanışın</h2>
            <p className="text-xl text-gray-600 mb-8">
              YanKapı, konum bazlı eşleşme özelliği sayesinde size en yakın komşularınızla güvenli bir şekilde iletişime
              geçmenizi sağlar. Mahallenizdeki yardımlaşma ağını genişletin.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3" />
                <span>Hassas konum tabanlı eşleşme</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Shield className="w-6 h-6 text-emerald-600 mr-3" />
                <span>Güvenli ve doğrulanmış profiller</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MessageCircle className="w-6 h-6 text-emerald-600 mr-3" />
                <span>Anlık ve şifreli mesajlaşma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Puan ve Rozet Sistemi</h3>
            <p className="text-gray-600 leading-relaxed">
              Yardımlaşın, puan kazanın ve özel rozetler ile topluluğa katkınızı gösterin. Aktif kullanıcılar
              ödüllendirilir.
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Etkinlik Takvimi</h3>
            <p className="text-gray-600 leading-relaxed">
              Mahalle etkinliklerini takip edin, kendi etkinliklerinizi düzenleyin ve komşularınızla sosyalleşin.
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Hızlı Yardımlaşma</h3>
            <p className="text-gray-600 leading-relaxed">
              Acil durumlarda veya anlık ihtiyaçlarınızda hızlıca yardım talebinde bulunabilir veya yardım
              edebilirsiniz.
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Aktif Topluluk Forumları</h3>
            <p className="text-gray-600 leading-relaxed">
              Mahallenizdeki konuları tartışın, fikir alışverişinde bulunun ve komşularınızla etkileşimde kalın.
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Yardımseverlik Ağı</h3>
            <p className="text-gray-600 leading-relaxed">
              İhtiyaç sahipleriyle yardımseverleri bir araya getiren güçlü bir dayanışma ağı.
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Özel Mesajlaşma</h3>
            <p className="text-gray-600 leading-relaxed">
              Komşularınızla birebir veya grup halinde güvenli ve özel mesajlaşma imkanı.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
