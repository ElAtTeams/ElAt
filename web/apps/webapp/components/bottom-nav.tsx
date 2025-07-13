"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, PlusSquare, Bell, User } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  // Define paths where BottomNav should NOT be shown
  const noBottomNavPaths = [
    "/location",
    "/location/community-naming",
    "/location/manual-entry",
    "/location/community-confirmation",
  ]

  // Check if the current path is in the exclusion list
  const shouldShowBottomNav = !noBottomNavPaths.some((path) => pathname.startsWith(path))

  if (!shouldShowBottomNav) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg lg:hidden">
      <nav className="flex justify-around h-16 items-center">
        <Link
          href="/home"
          className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-600"
        >
          <Home className={`h-6 w-6 ${pathname === "/home" ? "text-green-600" : ""}`} />
          <span className={pathname === "/home" ? "text-green-600" : ""}>Ana Sayfa</span>
        </Link>
        <Link
          href="/community"
          className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-600"
        >
          <Users className={`h-6 w-6 ${pathname === "/community" ? "text-green-600" : ""}`} />
          <span className={pathname === "/community" ? "text-green-600" : ""}>Topluluk</span>
        </Link>
        <Link
          href="/share"
          className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-600"
        >
          <PlusSquare className={`h-6 w-6 ${pathname === "/share" ? "text-green-600" : ""}`} />
          <span className={pathname === "/share" ? "text-green-600" : ""}>Paylaş</span>
        </Link>
        <Link
          href="/inbox"
          className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-600"
        >
          <Bell className={`h-6 w-6 ${pathname === "/inbox" ? "text-green-600" : ""}`} />
          <span className={pathname === "/inbox" ? "text-green-600" : ""}>Gelen Kutusu</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-600"
        >
          <User className={`h-6 w-6 ${pathname === "/profile" ? "text-green-600" : ""}`} />
          <span className={pathname === "/profile" ? "text-green-600" : ""}>Profil</span>
        </Link>
      </nav>
    </div>
  )
}
