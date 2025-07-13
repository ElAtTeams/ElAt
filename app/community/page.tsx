"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart, Shield, MessageCircle, Star, Clock, Zap, Home, User } from 'lucide-react'
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
  
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Güçlü Bir Topluluk
                <span className="block mt-2">Mutlu Bir Mahalle</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                YanKapı ile mahalle kültürünü yeniden canlandırıyor, komşuluk ilişkilerini güçlendiriyoruz.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="YanKapı Topluluk"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Başarı Hikayeleri
            </h2>
            <p className="text-xl text-gray-600">
              YanKapı sayesinde mahallelerde oluşan güzel hikayeler.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ayşe Hanım'ın Hikayesi</h3>
              <p className="text-gray-600">
                "YanKapı sayesinde mahallemizde yalnız yaşayan yaşlılarla tanıştım. 
                Şimdi her hafta onlara market alışverişinde yardım ediyorum."
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Mehmet Bey'in Hikayesi</h3>
              <p className="text-gray-600">
                "Fazla yemeklerimizi paylaşarak hem israfı önlüyoruz hem de 
                ihtiyacı olan komşularımıza destek oluyoruz."
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Zeynep'in Hikayesi</h3>
              <p className="text-gray-600">
                "Pandemi döneminde YanKapı üzerinden mahallemizde dayanışma grubu 
                kurduk. Birbirimize destek olduk."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80"
                alt="YanKapı Etki"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Sosyal Etki
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                YanKapı ile mahallelerimizde oluşturduğumuz pozitif değişim.
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
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">İletişim</h4>
                    <p className="text-gray-600">Güçlü komşuluk ilişkileri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Siz de Katılın
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              YanKapı ailesine katılın, mahalle dayanışmasını güçlendirin.
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
            <Users className="w-6 h-6 text-emerald-600" />
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
