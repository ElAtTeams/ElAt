"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, MessageCircle, Heart, Bookmark, Gift, MoreHorizontal, Send, Smile } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface ProfileTabsContentProps {
  posts: any[]
  savedPosts: any[]
}

export function ProfileTabsContent({ posts, savedPosts }: ProfileTabsContentProps) {
  const toggleSavePost = (postId: number) => {
    console.log(`Post ${postId} saved/unsaved`)
  }

  return (
    <Tabs defaultValue="posts" className="w-full">
      <div className="sticky top-[56px] bg-white pt-3 pb-2 border-b z-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Gönderilerim</TabsTrigger>
          <TabsTrigger value="saved">Kaydedilenler</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="posts" className="p-3 space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="border-0 rounded-none shadow-sm mb-0 overflow-hidden">
              <CardHeader className="bg-white border-0 flex flex-row items-center p-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-full mr-3 border border-green-600"
                />
                <div className="flex-grow">
                  <div className="font-bold text-gray-900">Ayşe Yılmaz</div>
                  <small className="text-gray-600 flex items-center">
                    <MapPin size={12} className="mr-1" /> Kadıköy, İstanbul • {post.date}
                  </small>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-900">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Paylaş</DropdownMenuItem>
                    <DropdownMenuItem>Düzenle</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Sil</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              {post.image && (
                <div className="relative w-full h-[250px]">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}

              <CardContent className="pb-2 p-3">
                <CardTitle className="text-xl font-bold mb-2 text-gray-900">{post.title}</CardTitle>
                <p className="text-gray-700 mb-3">{post.content}</p>

                <div className="flex items-center mb-2">
                  <Button variant="ghost" size="icon" className="mr-2 text-gray-600">
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

                <div className="border-t pt-3 flex justify-around text-gray-700">
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <MessageCircle size={20} className="text-green-600 mr-1" />
                    <span>0</span>
                  </Button>
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <Heart size={20} className="text-green-600 mr-1" />
                    <span>0</span>
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray-700 p-0 flex items-center"
                    onClick={() => toggleSavePost(post.id)}
                  >
                    <Bookmark size={20} className="text-green-600 mr-1" />
                  </Button>
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <Gift size={20} className="text-green-600 mr-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 p-4">Henüz bir gönderiniz yok.</p>
        )}
      </TabsContent>
      <TabsContent value="saved" className="p-3 space-y-4">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <Card key={post.id} className="border-0 rounded-none shadow-sm mb-0 overflow-hidden">
              <CardHeader className="bg-white border-0 flex flex-row items-center p-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-full mr-3 border border-green-600"
                />
                <div className="flex-grow">
                  <div className="font-bold text-gray-900">Ayşe Yılmaz</div>
                  <small className="text-gray-600 flex items-center">
                    <MapPin size={12} className="mr-1" /> Kadıköy, İstanbul • {post.date}
                  </small>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-900">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Paylaş</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Kaydetmeyi Kaldır</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              {post.image && (
                <div className="relative w-full h-[250px]">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}

              <CardContent className="pb-2 p-3">
                <CardTitle className="text-xl font-bold mb-2 text-gray-900">{post.title}</CardTitle>
                <p className="text-gray-700 mb-3">{post.content}</p>

                <div className="flex items-center mb-2">
                  <Button variant="ghost" size="icon" className="mr-2 text-gray-600">
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

                <div className="border-t pt-3 flex justify-around text-gray-700">
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <MessageCircle size={20} className="text-green-600 mr-1" />
                    <span>0</span>
                  </Button>
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <Heart size={20} className="text-green-600 mr-1" />
                    <span>0</span>
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray-700 p-0 flex items-center"
                    onClick={() => toggleSavePost(post.id)}
                  >
                    <Bookmark size={20} className="text-green-600 mr-1" />
                  </Button>
                  <Button variant="link" className="text-gray-700 p-0 flex items-center">
                    <Gift size={20} className="text-green-600 mr-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 p-4">Kaydedilen gönderiniz yok.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
