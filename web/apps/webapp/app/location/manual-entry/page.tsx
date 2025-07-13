"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Search } from "lucide-react"

export default function ManualEntryPage() {
  const router = useRouter()
  const [address, setAddress] = useState("")

  const handleSearch = () => {
    if (address.trim()) {
      console.log("Manuel adres girişi:", address)
      router.push("/location/community-naming")
    } else {
      alert("Lütfen bir adres girin.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-700">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Manuel Konum Girişi</h1>
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
            <MapPin className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Adresinizi Girin</h2>
          <p className="mx-auto mb-6 text-gray-600" style={{ maxWidth: "400px" }}>
            Lütfen tam adresinizi veya önemli bir yer işaretini girin.
          </p>

          <div className="w-full max-w-sm">
            <Label htmlFor="address" className="sr-only">
              Adres
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <Input
                id="address"
                type="text"
                placeholder="Örn: Bağdat Caddesi, Kadıköy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-4 rounded-lg border-gray-300 py-3 pl-10 pr-3 text-lg focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={handleSearch}
              className="w-full rounded-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
            >
              ARA
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
