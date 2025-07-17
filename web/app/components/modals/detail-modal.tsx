"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, MessageCircle, X, Heart, Bookmark, Send, Smile, Share2, Flag, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface Post {
  id: number
  user: {
    name: string
    avatar: string
    location: string // Added location to user object
  }
  timeAgo: string // Changed from 'time' to 'timeAgo' for consistency with DashboardPage
  images: string[]
  title: string
  content: string
  type: "yardim" | "talep"
  location: string // This seems redundant if user.location is used, but keeping for now
  detailedLocation: string
  status: "active" | "completed"
  comments: { user: string; avatar: string; content: string; time: string }[]
  likes: number
  saved: boolean
  category: string
  distance: string
}

interface DetailModalProps {
  post: Post | null
  show: boolean
  onHide: () => void
  onSave: (postId: number) => void
  onLike: (postId: number) => void
  isLiked: { [key: number]: boolean }
  isSaved: { [key: number]: boolean }
}

export function DetailModal({ post, show, onHide, onSave, onLike, isLiked, isSaved }: DetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!post) return null

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length)
  }

  const handleLikeClick = () => {
    onLike(post.id)
  }

  const handleSaveClick = () => {
    onSave(post.id)
  }

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="sm:max-w-[700px] p-0 rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image Carousel */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
            <Image
              src={post.images[currentImageIndex] || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-contain"
            />
            {post.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={handlePrevImage}
                >
                  {"<"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={handleNextImage}
                >
                  {">"}
                </Button>
                <div className="absolute bottom-2 flex space-x-1">
                  {post.images.map((_, index) => (
                    <span
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content Area */}
          <div className="w-full md:w-1/2 flex flex-col p-4 overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-bold text-gray-900 line-clamp-1">{post.title}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onHide} className="rounded-full">
                <X className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Kapat</span>
              </Button>
            </DialogHeader>

            <div className="flex-1 py-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={post.user.avatar || "/placeholder.svg"}
                    alt={post.user.name}
                    fill
                    className="rounded-full border-2 border-emerald-200 object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{post.user.name}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>
                      {post.detailedLocation} • {post.distance} uzakta
                    </span>
                  </div>
                </div>
                <Badge className="ml-auto bg-emerald-600 hover:bg-emerald-700 shadow-md">
                  {post.type === "yardim" ? "YARDIM" : "TALEP"}
                </Badge>
              </div>

              {/* Post Content */}
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center border-t border-b border-gray-100 py-3">
                <div className="flex space-x-4">
                  <button
                    className="flex items-center space-x-1 hover:scale-110 transition-transform"
                    onClick={handleLikeClick}
                  >
                    <Heart
                      className="h-6 w-6"
                      fill={isLiked[post.id] ? "#ef4444" : "none"}
                      stroke={isLiked[post.id] ? "#ef4444" : "currentColor"}
                    />
                    <span className="text-sm text-gray-600">{post.likes + (isLiked[post.id] ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm text-gray-600">{post.comments.length}</span>
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <Send className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border border-gray-200">
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2">
                      <Share2 className="h-4 w-4 mr-2" /> Paylaş
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2" onClick={handleSaveClick}>
                      <Bookmark className="h-4 w-4 mr-2" />
                      {isSaved[post.id] ? "Kaydı Kaldır" : "Kaydet"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2 text-red-500">
                      <Flag className="h-4 w-4 mr-2" /> Şikayet Et
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Comments Section */}
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {post.comments.length === 0 && <p className="text-sm text-gray-500 text-center">Henüz yorum yok.</p>}
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="relative h-8 w-8 flex-shrink-0">
                      <Image
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.user}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-900">{comment.user}</span>{" "}
                        <span className="text-gray-700">{comment.content}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{comment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment Input */}
            <DialogFooter className="flex items-center border-t border-gray-100 pt-3 mt-auto">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Yorum ekle..."
                  className="rounded-full pl-4 pr-10 bg-gray-50 border-none text-sm h-9 focus-visible:ring-1 focus-visible:ring-emerald-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors">
                  <Smile className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <Button className="ml-2 p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors">
                <Send className="h-5 w-5" />
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
