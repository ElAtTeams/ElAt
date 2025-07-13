"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react"

interface MessageListProps {
  messages: any[]
  onMessageClick: (message: any) => void
}

export function MessageList({ messages, onMessageClick }: MessageListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {messages.length > 0 ? (
        messages.map((message) => (
          <Card
            key={message.id}
            className="border-0 rounded-none shadow-none mb-0 cursor-pointer hover:bg-gray-50"
            onClick={() => onMessageClick(message)}
          >
            <CardContent className="p-3 flex items-start">
              <div className="relative mr-3">
                <Image
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.sender}
                  width={48}
                  height={48}
                  className="rounded-full border border-green-600"
                />
                {message.unread && (
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-bold text-gray-900">{message.sender}</div>
                  <small className="text-gray-600">{message.time}</small>
                </div>
                <p className="text-gray-700 text-sm mb-1 line-clamp-1">{message.subject}</p>
                <p className="text-gray-600 text-xs line-clamp-2">{message.preview}</p>
              </div>
              {message.starred && <Star size={16} className="text-yellow-500 ml-3 flex-shrink-0" fill="currentColor" />}
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-600 p-4">Gelen kutunuzda mesaj bulunmamaktadır.</p>
      )}
    </div>
  )
}
