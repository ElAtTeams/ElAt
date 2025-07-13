"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Star, Users, Bell, User } from "lucide-react"

export function BottomBar() {
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/",
      label: "Ana Sayfa",
      icon: Home,
      active: pathname === "/"
    },
    {
      href: "/features",
      label: "Özellikler",
      icon: Star,
      active: pathname === "/features"
    },
    {
      href: "/community",
      label: "Topluluk",
      icon: Users,
      active: pathname === "/community"
    },
    {
      href: "/notifications",
      label: "Bildirimler",
      icon: Bell,
      active: pathname === "/notifications"
    },
    {
      href: "/profile",
      label: "Profil",
      icon: User,
      active: pathname === "/profile"
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 md:hidden z-50">
      <div className="flex justify-between items-center">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex flex-col items-center ${
              item.active ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <item.icon className={`w-6 h-6 ${
              item.active ? "text-emerald-600" : "text-gray-600"
            }`} />
            <span className="text-xs mt-1">{item.label}</span>
            {item.active && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
} 