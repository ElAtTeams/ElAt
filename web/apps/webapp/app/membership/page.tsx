"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MembershipPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Üyelik</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Sürdürülebilir Üyelik</CardTitle>
            <p className="text-gray-600">Topluluğumuza destek olun ve ayrıcalıklardan yararlanın!</p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Birden fazla konum kaydetme</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Gelişmiş arama filtreleri</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Özel etkinliklere erişim</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Gönderi durumu ayarlama</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Reklamsız deneyim</span>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-4 text-4xl font-bold text-green-600">
                99.99 TL<span className="text-lg text-gray-600">/ay</span>
              </p>
              <Button
                variant="default"
                size="lg"
                className="w-full rounded-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
              >
                ŞİMDİ ÜYE OL
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500">Üyeliğinizi istediğiniz zaman iptal edebilirsiniz.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
