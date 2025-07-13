"use client"

import { useState } from "react"
import { ProfileHeader } from "@/app/profile/components/profile-header"
import { ProfileInfoCard } from "@/app/profile/components/profile-info-card"
import { ProfileTabsContent } from "@/app/profile/components/profile-tabs-content"
import { SettingsModal } from "@/app/profile/components/settings-modal"
import { EditProfileModal } from "@/app/profile/components/edit-profile-modal"

export default function ProfilePage() {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const userProfile = {
    name: "Ayşe Yılmaz",
    username: "@ayseyilmaz",
    bio: "Yardımlaşmayı seven bir topluluk gönüllüsü. Herkese destek olmaya çalışıyorum.",
    location: "Kadıköy, İstanbul",
    memberSince: "Ocak 2023",
    posts: 12,
    followers: 150,
    following: 80,
    avatar: "/placeholder.svg?height=100&width=100",
  }

  const userPosts = [
    {
      id: 1,
      type: "yardim",
      title: "Eski kıyafetler",
      content: "İyi durumdaki eski kıyafetlerimi ihtiyacı olanlara vermek istiyorum.",
      image: "/placeholder.svg?height=200&width=300",
      date: "10 Mayıs",
    },
    {
      id: 2,
      type: "talep",
      title: "Ders kitabı arıyorum",
      content: "Üniversite için matematik ders kitabı arıyorum, elinde olan var mı?",
      image: "/placeholder.svg?height=200&width=300",
      date: "05 Mayıs",
    },
  ]

  const userSavedPosts = [
    {
      id: 3,
      type: "yardim",
      title: "Bebek maması",
      content: "Fazla bebek maması var, ihtiyacı olan ailelere verebilirim.",
      image: "/placeholder.svg?height=200&width=300",
      date: "01 Mayıs",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ProfileHeader onSettingsClick={() => setShowSettingsModal(true)} />
      <main className="flex-1 overflow-y-auto">
        <ProfileInfoCard profile={userProfile} onEditProfileClick={() => setShowEditProfileModal(true)} />
        <ProfileTabsContent posts={userPosts} savedPosts={userSavedPosts} />
      </main>

      <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)} />
      <EditProfileModal show={showEditProfileModal} onHide={() => setShowEditProfileModal(false)} />
    </div>
  )
}
