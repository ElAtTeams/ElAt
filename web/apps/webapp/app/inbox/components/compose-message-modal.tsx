"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // Corrected import
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, User } from "lucide-react"
import { useState } from "react"
import { UserListSheet } from "@/app/inbox/components/user-list-sheet"

interface ComposeMessageModalProps {
  show: boolean
  onHide: () => void
  onSend: (message: { to: string; subject: string; content: string }) => void
}

export function ComposeMessageModal({ show, onHide, onSend }: ComposeMessageModalProps) {
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [showUserList, setShowUserList] = useState(false)

  const handleSend = () => {
    if (to.trim() && subject.trim() && content.trim()) {
      onSend({ to, subject, content })
      setTo("")
      setSubject("")
      setContent("")
      onHide()
    } else {
      alert("Lütfen tüm alanları doldurun.")
    }
  }

  const handleUserSelect = (user: any) => {
    setTo(user.name)
    setShowUserList(false)
  }

  return (
    <>
      <Dialog open={show} onOpenChange={onHide}>
        <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
          <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
            <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
              <ArrowLeft size={24} />
            </Button>
            <DialogTitle className="text-center font-bold text-lg text-gray-900">Yeni Mesaj</DialogTitle>
            <Button
              variant="default"
              className="px-3 py-1 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSend}
              disabled={!to.trim() || !subject.trim() || !content.trim()}
            >
              <Send size={16} className="mr-1" />
              Gönder
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <Label htmlFor="to" className="text-gray-700">
                Kime
              </Label>
              <div className="relative">
                <Input
                  id="to"
                  value={to}
                  readOnly
                  placeholder="Kişi seçin"
                  className="pr-10 cursor-pointer"
                  onClick={() => setShowUserList(true)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10 text-gray-600"
                  onClick={() => setShowUserList(true)}
                >
                  <User size={20} />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="subject" className="text-gray-700">
                Konu
              </Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="content" className="text-gray-700">
                Mesaj
              </Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <UserListSheet show={showUserList} onHide={() => setShowUserList(false)} onUserSelect={handleUserSelect} />
    </>
  )
}
