"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Calendar, Edit } from "lucide-react"

interface ProfileInfoCardProps {
  profile: {
    name: string
    username: string
    bio: string
    location: string
    memberSince: string
    posts: number
    followers: number
    following: number
    avatar: string
  }
  onEditProfileClick: () => void
}

export function ProfileInfoCard({ profile, onEditProfileClick }: ProfileInfoCardProps) {
  return (
    <Card className="border-0 rounded-none shadow-none mb-4 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative mr-4">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-green-600"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600 text-sm">{profile.username}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 rounded-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              onClick={onEditProfileClick}
            >
              <Edit size={16} className="mr-1" />
              Profili Düzenle
            </Button>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{profile.bio}</p>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-2" />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Calendar size={16} className="mr-2" />
          <span>{profile.memberSince} tarihinden beri üye</span>
        </div>

        <div className="flex justify-around text-center border-t pt-4">
          <div>
            <div className="text-lg font-bold text-gray-900">{profile.posts}</div>
            <div className="text-sm text-gray-600">Gönderi</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{profile.followers}</div>
            <div className="text-sm text-gray-600">Takipçi</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{profile.following}</div>
            <div className="text-sm text-gray-600">Takip Edilen</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
