"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ArrowLeft, Star, Trash2, Send, Smile, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MessageDetailViewProps {
  message: any
  show: boolean
  onHide: () => void
  onStarToggle: (messageId: number) => void
  onDelete: (messageId: number) => void
}

export function MessageDetailView({ message, show, onHide, onStarToggle, onDelete }: MessageDetailViewProps) {
  if (!message) return null

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <ArrowLeft size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Mesaj</DialogTitle>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => onStarToggle(message.id)} className="text-gray-900">
              <Star
                size={20}
                fill={message.starred ? "currentColor" : "none"}
                className={message.starred ? "text-yellow-500" : ""}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDelete(message.id)} className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" /> Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Message Header */}
          <div className="flex items-center mb-4">
            <Image
              src={message.avatar || "/placeholder.svg"}
              alt={message.sender}
              width={48}
              height={48}
              className="rounded-full mr-3 border border-green-600"
            />
            <div>
              <div className="font-bold text-gray-900">{message.sender}</div>
              <div className="text-gray-600 text-sm">{message.time}</div>
            </div>
          </div>

          {/* Message Subject */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">{message.subject}</h2>

          {/* Message Content */}
          <p className="text-gray-700 mb-6">{message.content}</p>

          {/* Reply Input */}
          <div className="flex items-center border-t pt-4">
            <Button variant="ghost" size="icon" className="mr-2 text-gray-600">
              <Smile size={20} />
            </Button>
            <Input
              type="text"
              placeholder="Mesaj yaz..."
              className="rounded-full flex-grow mr-2 bg-gray-100 border-0 focus:ring-0"
            />
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-9 h-9 bg-green-600 hover:bg-green-700 text-white"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
