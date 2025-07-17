"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart, Shield, MessageCircle, Star, Clock, Zap, User } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const slides = [
  {
    title: "Güvenli İletişim",
    description: "Doğrulanmış komşularınızla güvenli mesajlaşma",
    image: "/images/home-slide-1.png", // Changed to local placeholder
    tags: ["Şifreli", "Güvenli", "Özel"],
  },
  {
    title: "Etkinlik Takvimi",
    description: "Mahalle etkinliklerini takip edin ve katılın",
    image: "/images/home-slide-2.png", // Changed to local placeholder
    tags: ["Sosyal", "Etkinlik", "Topluluk"],
  },
  {
    title: "Yardımlaşma Ağı",
    description: "İhtiyaç sahipleriyle yardımseverleri buluşturuyoruz",
    image: "/images/home-slide-3.png", // Changed to local placeholder
    tags: ["Dayanışma", "Yardım", "Destek"],
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-3xl -top-40 -right-40"></div>
          <div className="absolute w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl -bottom-20 -left-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">
                Komşuluk İlişkilerini
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">
                  Güçlendiriyoruz
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl">
                YanKapı ile mahallenizdeki komşularınızla güvenli bir şekilde tanışın, yardımlaşın ve dayanışmayı
                güçlendirin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-2xl"
                >
                  <Users className="w-6 h-6 mr-2" />
                  Hemen Katıl
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 rounded-2xl bg-transparent"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Daha Fazla Bilgi
                </Button>
              </div>

              {/* Feature Tags */}
              <div className="mt-12">
                <div className="flex flex-wrap gap-3">
                  {slides[currentSlide].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">{slides[currentSlide].title}</h3>
                  <p className="text-gray-600 mt-2">{slides[currentSlide].description}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Image Slider */}
              <div className="relative w-full aspect-[4/3] bg-white rounded-[2rem] overflow-hidden shadow-2xl">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ))}

                {/* Feature Cards */}
                <div className="absolute top-8 -right-4 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300 z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Güvenli Platform</h3>
                      <p className="text-gray-500 text-sm">Doğrulanmış Kullanıcılar</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 top-1/2 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300 z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Aktif Topluluk</h3>
                      <p className="text-gray-500 text-sm">50K+ Kullanıcı</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300 z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Konum Bazlı</h3>
                      <p className="text-gray-500 text-sm">Yakın Komşularla Tanışın</p>
                    </div>
                  </div>
                </div>

                {/* Slider Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Özellikleri */}
      <section className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-[800px] h-[800px] bg-emerald-100/50 rounded-full blur-3xl -top-40 -right-40 opacity-50"></div>
          <div className="absolute w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -bottom-20 -left-20 opacity-50"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
              <span className="text-emerald-600 text-sm font-medium">Platform Özellikleri</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-900 bg-clip-text text-transparent">
              Modern ve Güvenli Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              YanKapı, mahalle dayanışmasını güçlendirmek için tasarlanmış yenilikçi özelliklere sahip bir platformdur.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Konum Bazlı Eşleşme</h3>
              <p className="text-gray-600 leading-relaxed">
                Yakınınızdaki komşularınızla güvenli bir şekilde tanışın ve iletişime geçin.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Güvenli Profiller</h3>
              <p className="text-gray-600 leading-relaxed">
                Doğrulanmış kullanıcılar ile güvenli iletişim kurun ve topluluk güvenini artırın.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Anlık Mesajlaşma</h3>
              <p className="text-gray-600 leading-relaxed">
                Şifreli mesajlaşma sistemi ile güvenli iletişim kurma imkanı.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Puan Sistemi</h3>
              <p className="text-gray-600 leading-relaxed">
                Yardımlaşın, puan kazanın ve özel rozetler ile topluluğa katkınızı gösterin.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Etkinlik Takvimi</h3>
              <p className="text-gray-600 leading-relaxed">
                Mahalle etkinliklerini takip edin ve organizasyonlara katılın.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Hızlı Yardımlaşma</h3>
              <p className="text-gray-600 leading-relaxed">Acil durumlarda hızlı yardımlaşma ve destek sistemi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobil Uygulama */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                <span className="text-emerald-600 text-sm font-medium">Mobil Uygulama</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-900 bg-clip-text text-transparent">
                YanKapı Her Zaman Yanınızda
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                iOS ve Android uygulamalarımız ile mahalle dayanışması her an cebinizde.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#"
                  className="flex items-center bg-black hover:bg-black/90 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-black hover:bg-black/90 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <div className="relative mx-auto w-[280px] h-[580px]">
                <div className="relative w-full h-full bg-black rounded-[3rem] border-[14px] border-black shadow-xl">
                  <div className="absolute top-0 w-full h-6 bg-black">
                    <div className="w-20 h-4 mx-auto bg-black rounded-b-2xl"></div>
                  </div>
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    <img
                      src="/app-screen-1.png" // Changed to local placeholder
                      alt="YanKapı Mobil Uygulama"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topluluk ve Misyon */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="/images/how-it-works-community.png" // Changed to local placeholder
                alt="YanKapı Topluluk"
                className="rounded-2xl shadow-lg object-cover h-[500px] w-full"
              />
            </div>

            <div>
              <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                <span className="text-emerald-600 text-sm font-medium">Topluluk ve Misyon</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Güçlü Bir Topluluk
                <span className="block mt-2">Mutlu Bir Mahalle</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                YanKapı ile mahalle kültürünü yeniden canlandırıyor, komşuluk ilişkilerini güçlendiriyoruz.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Güçlü Topluluk</h4>
                    <p className="text-gray-600">Güvenilir ve aktif kullanıcılar</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sosyal Etki</h4>
                    <p className="text-gray-600">İsrafı önleyen paylaşım ekonomisi</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Güvenli Ortam</h4>
                    <p className="text-gray-600">Doğrulanmış kullanıcılar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Hemen Katılın, Mahalle Dayanışmasını Güçlendirin
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              YanKapı ile komşularınızla güvenli bir şekilde iletişim kurun, yardımlaşın ve dayanışmayı artırın.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Users className="w-5 h-5 mr-2" />
                Hemen Katıl
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 md:hidden z-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center">
            <MapPin className="w-6 h-6 text-emerald-600" />
            <span className="text-xs mt-1">Ana Sayfa</span>
          </Link>
          <Link href="/features" className="flex flex-col items-center">
            <Star className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1">Özellikler</span>
          </Link>
          <Link href="/community" className="flex flex-col items-center">
            <Users className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1">Topluluk</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
