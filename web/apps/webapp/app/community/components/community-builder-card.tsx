"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function CommunityBuilderCard() {
  return (
    <Card className="border-0 shadow-sm mb-4 bg-green-50">
      <CardContent className="p-4 text-center">
        <PlusCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Topluluğunuzu İnşa Edin</h3>
        <p className="text-gray-700 mb-4">Yeni üyeler davet edin, etkinlikler düzenleyin ve tartışmalar başlatın.</p>
        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
          Topluluğu Geliştir
        </Button>
      </CardContent>
    </Card>
  )
}
