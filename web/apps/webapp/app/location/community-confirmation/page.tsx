"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle, MapPin } from "lucide-react"

export default function CommunityConfirmationPage() {
  const router = useRouter()

  const handleConfirm = () => {
    router.push("/home")
  }

  const handleEdit = () => {
    router.push("/location/community-naming")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <MapPin size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Topluluk Onayı</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col p-4">
        <div className="my-auto flex flex-col items-center justify-center text-center">
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-4 shadow-md"
            aria-hidden="true"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Topluluğunuz Hazır!</h2>
          <p className="mx-auto mb-6 text-gray-600" style={{ maxWidth: "400px" }}>
            Konumunuz başarıyla ayarlandı. Artık çevrenizdeki yardım taleplerini ve tekliflerini görebilirsiniz.
          </p>

          <div className="w-full max-w-sm">
            <div className="mb-4 rounded-lg border border-gray-300 bg-white p-4 text-left shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Seçilen Topluluk:</h3>
              <p className="text-lg text-gray-700">Kadıköy Dayanışma Ağı</p>
              <p className="text-sm text-gray-500">İstanbul, Türkiye</p>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={handleConfirm}
              className="mb-3 w-full rounded-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
            >
              ANA SAYFAYA GİT
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleEdit}
              className="w-full rounded-full py-6 text-lg font-bold border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              DÜZENLE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
