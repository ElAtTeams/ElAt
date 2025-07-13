"use client"

import { useState } from "react"
import { InboxHeader } from "@/app/inbox/components/inbox-header"
import { InboxFilterPanel } from "@/app/inbox/components/inbox-filter-panel"
import { MessageList } from "@/app/inbox/components/message-list"
import { MessageDetailView } from "@/app/inbox/components/message-detail-view"
import { ComposeMessageModal } from "@/app/inbox/components/compose-message-modal"

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState("all")
  const [showComposeModal, setShowComposeModal] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Elif Kaya",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "9 saat önce",
      subject: "Bebek salı hakkında",
      preview: "Merhaba, bebek salı hala müsait mi? İlgileniyorum.",
      content: "Merhaba, bebek salı hala müsait mi? İlgileniyorum. Ne zaman alabilirim?",
      unread: true,
      starred: false,
    },
    {
      id: 2,
      sender: "Mehmet Demir",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "2 gün önce",
      subject: "Kullanılmamış bebek bezi",
      preview: "Bebek bezleri için teşekkür ederim, çok yardımcı oldu.",
      content: "Bebek bezleri için teşekkür ederim, çok yardımcı oldu. Allah razı olsun.",
      unread: false,
      starred: true,
    },
    {
      id: 3,
      sender: "Zeynep Şahin",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "1 gün önce",
      subject: "Çocuk kitapları",
      preview: "Kitapları ne zaman alabilirim?",
      content: "Merhaba, çocuk kitapları hala duruyor mu? Ne zaman alabilirim?",
      unread: true,
      starred: false,
    },
  ])

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message)
    // Mark as read
    setMessages(messages.map((msg) => (msg.id === message.id ? { ...msg, unread: false } : msg)))
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const handleStarToggle = (messageId: number) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, starred: !msg.starred } : msg)))
  }

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter((msg) => msg.id !== messageId))
    setSelectedMessage(null) // Close detail view if the deleted message was open
  }

  const handleSendMessage = (newMessage: { to: string; subject: string; content: string }) => {
    const newId = messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1
    const senderName = "Siz" // Assuming the current user is "Siz" for sent messages
    const newMsg = {
      id: newId,
      sender: senderName,
      avatar: "/placeholder.svg?height=48&width=48", // Placeholder for current user's avatar
      time: "Şimdi",
      subject: newMessage.subject,
      preview: newMessage.content.substring(0, 50) + "...",
      content: newMessage.content,
      unread: false,
      starred: false,
    }
    setMessages([...messages, newMsg])
  }

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") {
      return message.unread
    }
    if (filter === "starred") {
      return message.starred
    }
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <InboxHeader onComposeClick={() => setShowComposeModal(true)} />
      <main className="flex-1 overflow-y-auto">
        <InboxFilterPanel onFilterChange={handleFilterChange} />
        <MessageList messages={filteredMessages} onMessageClick={handleMessageClick} />
      </main>

      <MessageDetailView
        message={selectedMessage}
        show={selectedMessage !== null}
        onHide={() => setSelectedMessage(null)}
        onStarToggle={handleStarToggle}
        onDelete={handleDeleteMessage}
      />

      <ComposeMessageModal
        show={showComposeModal}
        onHide={() => setShowComposeModal(false)}
        onSend={handleSendMessage}
      />
    </div>
  )
}
