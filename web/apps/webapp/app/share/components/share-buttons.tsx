"use client"

import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, Mail, Copy } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ShareButtons() {
  const [showShareModal, setShowShareModal] = useState(false)
  const { toast } = useToast()
  const shareUrl = "https://www.eluzat.com" // Replace with actual URL

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link Kopyalandı!",
      description: "Paylaşım linki panoya kopyalandı.",
    })
    setShowShareModal(false)
  }

  return (
    <>
      <Button
        variant="default"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setShowShareModal(true)}
      >
        <Share2 className="mr-2 h-5 w-5" />
        Paylaş
      </Button>

      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="w-full h-full max-w-none rounded-none p-4">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900">Paylaş</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}
              >
                <Facebook className="h-8 w-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, "_blank")}
              >
                <Twitter className="h-8 w-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => window.open(`mailto:?body=${shareUrl}`, "_blank")}
              >
                <Mail className="h-8 w-8" />
              </Button>
            </div>

            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="share-link" className="text-gray-700">
                Veya linki kopyala:
              </Label>
              <div className="relative flex items-center">
                <Input id="share-link" type="text" value={shareUrl} readOnly className="pr-10" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10 text-gray-600 hover:bg-transparent"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
