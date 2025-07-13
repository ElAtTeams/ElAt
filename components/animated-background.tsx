"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface AnimatedCard {
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string
  text: string
  dx: number
  dy: number
}

export function AnimatedBackground() {
  const [cards, setCards] = useState<AnimatedCard[]>([])

  useEffect(() => {
    const initialCards: AnimatedCard[] = [
      {
        id: 1,
        x: 50,
        y: 100,
        width: 180,
        height: 120,
        color: "from-purple-500 to-purple-600",
        text: "Mahalle Dayanışması",
        dx: 0.5,
        dy: 0.3,
      },
      {
        id: 2,
        x: 280,
        y: 80,
        width: 160,
        height: 100,
        color: "from-green-500 to-green-600",
        text: "Gıda Paylaşımı",
        dx: -0.4,
        dy: 0.6,
      },
      {
        id: 3,
        x: 100,
        y: 280,
        width: 200,
        height: 140,
        color: "from-blue-500 to-blue-600",
        text: "Komşuluk İlişkileri",
        dx: 0.7,
        dy: -0.2,
      },
      {
        id: 4,
        x: 320,
        y: 250,
        width: 140,
        height: 90,
        color: "from-yellow-500 to-orange-500",
        text: "Mikro Hizmetler",
        dx: -0.6,
        dy: -0.4,
      },
      {
        id: 5,
        x: 180,
        y: 180,
        width: 120,
        height: 80,
        color: "from-pink-500 to-rose-500",
        text: "Güvenli Ortam",
        dx: 0.3,
        dy: 0.5,
      },
      {
        id: 6,
        x: 60,
        y: 350,
        width: 160,
        height: 110,
        color: "from-indigo-500 to-purple-500",
        text: "Topluluk Gücü",
        dx: 0.8,
        dy: 0.1,
      },
    ]
    setCards(initialCards)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) =>
        prevCards.map((card) => {
          let newX = card.x + card.dx
          let newY = card.y + card.dy
          let newDx = card.dx
          let newDy = card.dy

          // Bounce off walls
          if (newX <= 0 || newX >= 500 - card.width) {
            newDx = -newDx
            newX = Math.max(0, Math.min(500 - card.width, newX))
          }
          if (newY <= 0 || newY >= 600 - card.height) {
            newDy = -newDy
            newY = Math.max(0, Math.min(600 - card.height, newY))
          }

          return {
            ...card,
            x: newX,
            y: newY,
            dx: newDx,
            dy: newDy,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="relative w-full h-full">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`absolute bg-gradient-to-br ${card.color} p-4 text-white shadow-lg transition-all duration-100 ease-linear`}
            style={{
              left: `${card.x}px`,
              top: `${card.y}px`,
              width: `${card.width}px`,
              height: `${card.height}px`,
              transform: `rotate(${Math.sin(card.x * 0.01) * 5}deg)`,
            }}
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-sm font-semibold text-center leading-tight">{card.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
