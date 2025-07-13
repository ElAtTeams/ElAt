"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { X, MapPin, MessageCircle, Heart, Bookmark, Gift, MoreHorizontal, Send, Smile } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DetailModalProps {
  post: any
  show: boolean
  onHide: () => void
  onSave: (postId: number) => void
}

export function DetailModal({ post, show, onHide, onSave }: DetailModalProps) {
  if (!post) return null

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="w-full h-full max-w-none rounded-none flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-0 border-b-0">
          <Button variant="link" onClick={onHide} className="p-0 text-muted text-lg">
            <X size={24} />
          </Button>
          <DialogTitle className="text-center font-bold text-lg text-gray-900">Gönderi Detayı</DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-900">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Paylaş</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSave(post.id)}>
                {post.saved ? "Kaydetmeyi Kaldır" : "Kaydet"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Rapor Et</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Post Header */}
          <div className="bg-white flex flex-row items-center p-3 border-b">
            <Image
              src={post.avatar || "/placeholder.svg"}
              alt={post.user}
              width={48}
              height={48}
              className="rounded-full mr-3 border border-green-600"
            />
            <div className="flex-grow">
              <div className="font-bold text-gray-900">{post.user}</div>
              <small className="text-gray-600 flex items-center">
                <MapPin size={12} className="mr-1" /> {post.location} • {post.time}
              </small>
            </div>
          </div>

          {/* Post Image */}
          {post.images && post.images.length > 0 && (
            <div className="relative w-full h-[350px]">
              <Image src={post.images[0] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              {post.type === "yardim" && (
                <Badge className="absolute top-2 left-2 bg-green-600 text-white">Yardım Talebi</Badge>
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="p-3">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
            <p className="text-gray-700 mb-3">{post.content}</p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-3">
              <small className="text-gray-600 flex items-center">
                <MapPin className="mr-1 text-green-600" size={14} />
                {post.detailedLocation}
              </small>
              <Button
                variant={post.type === "yardim" ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-3 ${
                  post.type === "yardim"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {post.type === "yardim" ? "İlgileniyorum" : "Yardım Edebilirim"}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mb-3 border-t pt-3">
              <h3 className="font-bold text-gray-900 mb-2">Yorumlar ({post.comments.length})</h3>
              {post.comments.length > 0 ? (
                post.comments.map((comment: any, index: number) => (
                  <div key={index} className="flex mb-2 text-gray-700">
                    <strong className="mr-2">{comment.user}:</strong>
                    <span>{comment.content}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">Henüz yorum yok.</p>
              )}
            </div>

            {/* Comment Input */}
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-gray-600"
                onClick={() => {
                  /* Implement emoji picker logic if needed */
                }}
              >
                <Smile size={20} />
              </Button>
              <Input
                type="text"
                placeholder="Yorum yaz..."
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

            {/* Interaction Icons */}
            <div className="border-t pt-3 flex justify-around text-gray-700">
              <Button variant="link" className="text-gray-700 p-0 flex items-center">
                <MessageCircle size={20} className="text-green-600 mr-1" />
                <span>{post.comments.length}</span>
              </Button>
              <Button variant="link" className="text-gray-700 p-0 flex items-center">
                <Heart size={20} className="text-green-600 mr-1" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="link" className="text-gray-700 p-0 flex items-center" onClick={() => onSave(post.id)}>
                <Bookmark size={20} className="text-green-600 mr-1" />
              </Button>
              <Button variant="link" className="text-gray-700 p-0 flex items-center">
                <Gift size={20} className="text-green-600 mr-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
