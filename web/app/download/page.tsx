import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Smartphone, Apple, Star, Download, QrCode } from "lucide-react"

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">YanKapı</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Smartphone className="w-20 h-20 mx-auto mb-6 text-green-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Uygulamayı{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">İndirin</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YanKapı'yı cebinizde taşıyın ve komşularınızla her an bağlantıda kalın. iOS ve Android için ücretsiz.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="text-center space-y-6">
                <Apple className="w-16 h-16 mx-auto text-gray-800" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">iOS için İndir</h3>
                  <p className="text-gray-600 mb-4">iPhone ve iPad uyumlu</p>
                  <a
                    href="#"
                    className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Apple className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </a>
                </div>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <span>•</span>
                  <span>iOS 12.0+</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="text-center space-y-6">
                <svg className="w-16 h-16 mx-auto text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Android için İndir</h3>
                  <p className="text-gray-600 mb-4">Android telefonlar için</p>
                  <a
                    href="#"
                    className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                    <span>4.7</span>
                  </div>
                  <span>•</span>
                  <span>Android 6.0+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="p-8 text-center">
            <CardContent className="space-y-6">
              <QrCode className="w-16 h-16 mx-auto text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">QR Kod ile İndir</h3>
                <p className="text-gray-600 mb-4">
                  Telefonunuzun kamerasıyla QR kodu okutun ve direkt indirme sayfasına gidin
                </p>
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Web Version */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <CardContent className="space-y-6">
              <Download className="w-12 h-12 mx-auto text-green-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Web Sürümü</h3>
                <p className="text-gray-600 mb-4">
                  Mobil uygulama indirmek istemiyorsanız, web sürümümüzü kullanabilirsiniz
                </p>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Web'de Kullan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
