"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HelpCenterPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Yardım Merkezi</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nasıl Yardımcı Olabiliriz?</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <Input type="search" placeholder="Yardım ara..." className="pl-10" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Sıkça Sorulan Sorular</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                Nasıl yardım talebi oluşturabilirim?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Ana sayfada bulunan "Talep Et" butonuna tıklayarak veya "Paylaş" sekmesinden yardım talebi
                oluşturabilirsiniz. Gerekli bilgileri doldurduktan sonra talebinizi yayınlayabilirsiniz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                Yardım teklifimi nasıl düzenleyebilirim?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Profil sayfanızdaki "Gönderilerim" sekmesinden ilgili yardım teklifinizi bulup düzenleyebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                Konumumu nasıl değiştirebilirim?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Ayarlar menüsünden "Konum Ayarları" bölümüne giderek konumunuzu güncelleyebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                Bir üyeyi nasıl rapor edebilirim?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                İlgili gönderinin veya üyenin profilinde bulunan üç nokta (...) menüsüne tıklayarak "Rapor Et"
                seçeneğini kullanabilirsiniz.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Bize Ulaşın</h3>
          <p className="text-gray-700 mb-4">
            Yukarıdaki sorulara yanıt bulamadıysanız veya daha fazla yardıma ihtiyacınız varsa, bizimle iletişime
            geçebilirsiniz.
          </p>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start py-6 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              <Mail className="mr-3 h-5 w-5" />
              destek@eluzat.com
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start py-6 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              <Phone className="mr-3 h-5 w-5" />
              +90 555 123 45 67
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
