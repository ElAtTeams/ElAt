"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ChevronRight, LogOut, User, Bell, MapPin, Shield, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

interface SettingsModalProps {
  show: boolean
  onHide: () => void
}

export function SettingsModal({ show, onHide }: SettingsModalProps) {
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <ArrowLeft size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Ayarlar</DialogTitle>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Account Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">Hesap Ayarları</h3>
            <Link href="/profile/edit" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5 text-green-600" />
                  Profil Bilgileri
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
              <div className="flex items-center">
                <Bell className="mr-3 h-5 w-5 text-green-600" />
                Bildirimler
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </Button>
            <Link href="/location" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-green-600" />
                  Konum Ayarları
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">Gizlilik ve Güvenlik</h3>
            <Link href="/privacy-policy" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-green-600" />
                  Gizlilik Politikası
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
            <Link href="/terms-of-service" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-green-600" />
                  Kullanım Şartları
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
          </div>

          {/* General */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">Genel</h3>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <Label htmlFor="dark-mode" className="flex items-center text-gray-700 font-medium">
                Karanlık Mod
              </Label>
              <Switch id="dark-mode" />
            </div>
            <Link href="/help-center" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <HelpCircle className="mr-3 h-5 w-5 text-green-600" />
                  Yardım Merkezi
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
            <Link href="/community-rules" passHref>
              <Button variant="ghost" className="w-full justify-between px-3 py-6 text-base">
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-green-600" />
                  Topluluk Kuralları
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Button>
            </Link>
          </div>

          {/* Logout */}
          <Button variant="destructive" className="w-full py-6 text-base font-bold">
            <LogOut className="mr-2 h-5 w-5" />
            Çıkış Yap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
