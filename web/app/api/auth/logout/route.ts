import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Yetkilendirme gereklidir" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded: any

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (jwtError) {
      return NextResponse.json({ error: "Geçersiz token" }, { status: 401 })
    }

    const connection = await createConnection()

    try {
      // Add current token to blacklist
      await connection.execute(
        "INSERT INTO token_blacklist (token, user_id, reason, created_at) VALUES (?, ?, ?, NOW())",
        [token, decoded.userId, "logout"],
      )

      // Remove all user sessions
      await connection.execute("DELETE FROM user_sessions WHERE user_id = ?", [decoded.userId])

      return NextResponse.json({ message: "Başarıyla çıkış yapıldı" }, { status: 200 })
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
