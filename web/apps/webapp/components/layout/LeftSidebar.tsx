"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { HelpOfferModal } from "@/app/modals/help-offer-modal"
import { HelpRequestModal } from "@/app/modals/help-request-modal"

export function LeftSidebar({
  showOfferModal,
  setShowOfferModal,
  showRequestModal,
  setShowRequestModal,
  handleOfferSubmit,
}: {
  showOfferModal: boolean
  setShowOfferModal: (show: boolean) => void
  showRequestModal: boolean
  setShowRequestModal: (show: boolean) => void
  handleOfferSubmit: (data: any) => void
}) {
  return (
    <div className="flex flex-col w-full lg:w-1/4 p-4 bg-green-50 border-r sticky top-0 h-screen overflow-y-auto">
      <div className="flex flex-col h-full">
        <div>
          <Card className="border-0 bg-white shadow-sm mb-4 w-full text-center">
            <CardContent className="p-4">
              <Button
                variant="default"
                size="icon"
                className="mb-3 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowOfferModal(true)}
              >
                <Image src="/placeholder.svg?height=28&width=28" width={28} height={28} alt="Yardım Et" />
              </Button>
              <h6 className="font-bold text-gray-900">Yardım Et</h6>
            </CardContent>
          </Card>

          <HelpOfferModal show={showOfferModal} onHide={() => setShowOfferModal(false)} onCreate={handleOfferSubmit} />

          <Card className="border-0 bg-white shadow-sm mb-4 w-full text-center">
            <CardContent className="p-4">
              <Button
                variant="outline"
                size="icon"
                className="mb-3 rounded-full w-14 h-14 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => setShowRequestModal(true)}
              >
                <Image src="/placeholder.svg?height=28&width=28" width={28} height={28} alt="Talep Et" />
              </Button>
              <h6 className="font-bold text-gray-900">Talep Et</h6>
            </CardContent>
          </Card>

          <HelpRequestModal show={showRequestModal} onHide={() => setShowRequestModal(false)} />
        </div>

        <div className="mt-auto text-center text-sm text-gray-600">
          <Link href="/community-rules" passHref>
            <Button variant="link" className="text-green-600 hover:underline p-0 mb-1 block mx-auto">
              Topluluk Kuralları
            </Button>
          </Link>
          <Link href="/help-center" passHref>
            <Button variant="link" className="text-green-600 hover:underline p-0 block mx-auto">
              Yardım Merkezi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}