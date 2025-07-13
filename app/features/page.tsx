"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart, Shield, MessageCircle, Star, Clock, Zap, Home, User } from 'lucide-react'
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">


      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Platform Özellikleri
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                YanKapı'nın sunduğu özellikler ile mahalle dayanışmasını güçlendirin.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Platform Özellikleri"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Konum Bazlı Eşleşme</h3>
              <p className="text-gray-600">
                Yakınınızdaki komşularınızla güvenli bir şekilde tanışın ve iletişim kurun.
                Mahallenizdeki yardımlaşma ağına katılın.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Güvenli Profiller</h3>
              <p className="text-gray-600">
                Doğrulanmış kullanıcılar ile güvenli iletişim kurun. Kimlik doğrulama
                sistemi ile güvenliğiniz garanti altında.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Anlık Mesajlaşma</h3>
              <p className="text-gray-600">
                Şifreli mesajlaşma ile güvenli iletişim kurun. Mahalle sakinleri ile
                anlık olarak mesajlaşın.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Puan Sistemi</h3>
              <p className="text-gray-600">
                Yardımlaşın, puan kazanın ve rozet toplayın. Topluluk içindeki
                katkılarınız ödüllendirilsin.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">7/24 Destek</h3>
              <p className="text-gray-600">
                Her an yanınızda olan destek ekibi ile sorunlarınıza hızlı çözümler
                bulun.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Hızlı Eşleşme</h3>
              <p className="text-gray-600">
                Anında yardım bulun veya yardım edin. Acil durumlar için hızlı
                eşleşme sistemi.
              </p>
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
            <Star className="w-6 h-6 text-emerald-600" />
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
