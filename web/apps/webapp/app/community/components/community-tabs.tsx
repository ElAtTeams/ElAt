"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MessageSquare, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommunityTabsProps {
  members: any[]
  discussions: any[]
  onMemberClick: (member: any) => void
}

export function CommunityTabs({ members, discussions, onMemberClick }: CommunityTabsProps) {
  return (
    <Tabs defaultValue="members" className="w-full">
      <div className="sticky top-[56px] bg-white pt-3 pb-2 border-b z-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Üyeler</TabsTrigger>
          <TabsTrigger value="discussions">Tartışmalar</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="members" className="p-3 space-y-4">
        {members.length > 0 ? (
          members.map((member) => (
            <Card
              key={member.id}
              className="border-0 shadow-sm overflow-hidden cursor-pointer"
              onClick={() => onMemberClick(member)}
            >
              <CardContent className="p-4 flex items-center">
                <Image
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4 border-2 border-green-600"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">
                    {member.role} • {member.location}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Profili Gör
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 p-4">Henüz üye bulunmamaktadır.</p>
        )}
      </TabsContent>
      <TabsContent value="discussions" className="p-3 space-y-4">
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <Card key={discussion.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-600">
                      Başlatan: {discussion.author} • {discussion.date}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-900">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Paylaş</DropdownMenuItem>
                      <DropdownMenuItem>Takip Et</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Rapor Et</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" /> {discussion.comments} Yorum
                </div>
                <Button variant="default" size="sm" className="mt-3 bg-green-600 hover:bg-green-700 text-white">
                  Tartışmaya Katıl
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 p-4">Henüz tartışma bulunmamaktadır.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
