import type React from "react"
import "../globals.css"
import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "YanKapı - Komşuluk Platformu",
  description:
    "YanKapı ile mahallenizdeki komşularınızla güvenli bir şekilde tanışın, yardımlaşın ve dayanışmayı güçlendirin.",
  generator: "Next.js",
}

function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-600">YanKapı</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Özellikler
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Nasıl Çalışır
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Topluluk
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-emerald-600 transition-colors">
              S.S.S.
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Giriş
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Katıl</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">YanKapı</span>
            </Link>
            <p className="text-gray-400">
              Mahalle kültürünü yeniden canlandırıyor, komşuluk ilişkilerini güçlendiriyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Özellikler
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Nasıl Çalışır
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Topluluk
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  S.S.S.
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>iletisim@yankapi.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>0850 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 YanKapı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
