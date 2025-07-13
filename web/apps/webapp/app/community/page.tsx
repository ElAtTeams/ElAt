"use client"

import { useState } from "react"
import { CommunityHeader } from "@/app/community/components/community-header"
import { CommunityOverview } from "@/app/community/components/community-overview"
import { CommunityBuilderCard } from "@/app/community/components/community-builder-card"
import { CommunityQuickActions } from "@/app/community/components/community-quick-actions"
import { CommunityTabs } from "@/app/community/components/community-tabs"
import { MemberDetailView } from "@/app/community/components/member-detail-view"

export default function CommunityPage() {
  const [selectedMember, setSelectedMember] = useState(null)

  const sampleMembers = [
    {
      id: 1,
      name: "Ayşe Yılmaz",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "Gönüllü",
      location: "Kadıköy",
      bio: "Yardımlaşmayı seven bir topluluk gönüllüsü.",
      posts: 12,
      followers: 150,
      following: 80,
    },
    {
      id: 2,
      name: "Can Demir",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "Topluluk Lideri",
      location: "Beşiktaş",
      bio: "Topluluğumuzu daha iyi hale getirmek için çalışıyorum.",
      posts: 20,
      followers: 200,
      following: 100,
    },
    {
      id: 3,
      name: "Elif Kaya",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "Yeni Üye",
      location: "Üsküdar",
      bio: "Yeni katıldım ve öğrenmeye açığım.",
      posts: 5,
      followers: 50,
      following: 30,
    },
  ]

  const sampleDiscussions = [
    {
      id: 1,
      title: "Kadıköy'de Geri Dönüşüm Kampanyası",
      author: "Can Demir",
      date: "2 gün önce",
      comments: 7,
    },
    {
      id: 2,
      title: "Yeni Gönüllüler Arıyoruz!",
      author: "Ayşe Yılmaz",
      date: "1 hafta önce",
      comments: 15,
    },
  ]

  const handleMemberClick = (member: any) => {
    setSelectedMember(member)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CommunityHeader />
      <main className="flex-1 overflow-y-auto p-4">
        <CommunityOverview />
        <CommunityBuilderCard />
        <CommunityQuickActions />
        <CommunityTabs members={sampleMembers} discussions={sampleDiscussions} onMemberClick={handleMemberClick} />
      </main>

      <MemberDetailView member={selectedMember} show={selectedMember !== null} onHide={() => setSelectedMember(null)} />
    </div>
  )
}
