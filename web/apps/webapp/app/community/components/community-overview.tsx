"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Calendar } from "lucide-react"

export function CommunityOverview() {
  return (
    <Card className="border-0 shadow-sm mb-4 bg-white">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Topluluğumuza Hoş Geldiniz!</h2>
        <p className="text-gray-700 mb-4">
          Burada, çevrenizdeki insanlarla bağlantı kurabilir, yardım taleplerini ve tekliflerini görebilir, etkinliklere
          katılabilir ve tartışmalara katılabilirsiniz.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Users className="h-8 w-8 text-green-600 mx-auto mb-1" />
            <div className="font-bold text-lg text-gray-900">250+</div>
            <div className="text-sm text-gray-600">Üye</div>
          </div>
          <div>
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-1" />
            <div className="font-bold text-lg text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Tartışma</div>
          </div>
          <div>
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-1" />
            <div className="font-bold text-lg text-gray-900">10+</div>
            <div className="text-sm text-gray-600">Etkinlik</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
