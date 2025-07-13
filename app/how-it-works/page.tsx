"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart, Shield, Download, MessageCircle, Star, Smartphone, ArrowRight, Clock, Zap, Home, User } from 'lucide-react'
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
   

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
              <span className="text-emerald-600 text-sm font-medium">Adım Adım</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              YanKapı Nasıl Çalışır?
            </h1>
            <p className="text-xl text-gray-600">
              Mahalle dayanışmasını dijitalleştiren YanKapı'yı kullanmaya başlamak çok kolay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="relative mx-auto w-[280px] h-[580px]">
                <div className="relative w-full h-full bg-black rounded-[3rem] border-[14px] border-black shadow-xl">
                  <div className="absolute top-0 w-full h-6 bg-black">
                    <div className="w-20 h-4 mx-auto bg-black rounded-b-2xl"></div>
                  </div>
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    <img 
                      src="/app-screen-1.png" 
                      alt="YanKapı Mobil Uygulama"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-emerald-600">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Uygulamayı İndirin</h3>
                  <p className="text-gray-600 mb-4">
                    App Store veya Google Play'den YanKapı uygulamasını indirin. Hızlı ve güvenli bir şekilde hesabınızı oluşturun.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <a href="#" className="flex items-center bg-black hover:bg-black/90 text-white px-6 py-3 rounded-xl transition-colors">
                      <Smartphone className="w-8 h-8 mr-3" />
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-lg font-semibold">App Store</div>
                      </div>
                    </a>
                    <a href="#" className="flex items-center bg-black hover:bg-black/90 text-white px-6 py-3 rounded-xl transition-colors">
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
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Profilinizi Oluşturun</h3>
                  <p className="text-gray-600">
                    Kimlik ve adres doğrulaması yapın. Güvenli bir ortam için tüm kullanıcılarımız doğrulanmış profillere sahiptir.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mahallenizi Keşfedin</h3>
                  <p className="text-gray-600">
                    Yakınınızdaki komşularınızı görün, yardım tekliflerini inceleyin veya kendi teklifinizi oluşturun.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-orange-600">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">İletişime Geçin</h3>
                  <p className="text-gray-600">
                    Güvenli mesajlaşma sistemi ile komşularınızla iletişim kurun ve yardımlaşmaya başlayın.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Güvenli ve Kolay Kullanım</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Doğrulanmış Profiller</h4>
                    <p className="text-gray-600">Tüm kullanıcılar kimlik ve adres doğrulamasından geçer</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Konum Bazlı Eşleşme</h4>
                    <p className="text-gray-600">Sadece yakın çevrenizdeki komşularınızla eşleşin</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Güvenli Mesajlaşma</h4>
                    <p className="text-gray-600">Uçtan uca şifreli mesajlaşma sistemi</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Puanlama Sistemi</h4>
                    <p className="text-gray-600">Şeffaf ve güvenilir kullanıcı puanları</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto w-[280px] h-[580px]">
                <div className="relative w-full h-full bg-black rounded-[3rem] border-[14px] border-black shadow-xl">
                  <div className="absolute top-0 w-full h-6 bg-black">
                    <div className="w-20 h-4 mx-auto bg-black rounded-b-2xl"></div>
                  </div>
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    <img 
                      src="/app-screen-2.png" 
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

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
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
              <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
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
            <Home className="w-6 h-6 text-gray-600" />
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
