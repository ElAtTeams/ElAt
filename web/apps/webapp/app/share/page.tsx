"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShareButtons } from "@/app/share/components/share-buttons"
import { ArrowLeft, Gift, Users, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SharePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Paylaş</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Gift className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">El Uzat'ı Paylaşın!</h2>
            <p className="text-gray-700 mb-6">
              Topluluğumuzu büyütmek için El Uzat uygulamasını arkadaşlarınızla ve ailenizle paylaşın. Ne kadar çok kişi
              katılırsa, o kadar çok yardımlaşabiliriz!
            </p>
            <ShareButtons />
          </CardContent>
        </Card>

        <div className="mt-8 w-full max-w-md space-y-4">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="font-bold text-gray-900">Daha Fazla Üye</h3>
                <p className="text-sm text-gray-700">Daha fazla yardım talebi ve teklifi.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="font-bold text-gray-900">Daha Canlı Tartışmalar</h3>
                <p className="text-sm text-gray-700">Topluluk içinde daha fazla etkileşim.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
