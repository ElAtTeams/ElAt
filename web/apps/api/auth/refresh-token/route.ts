import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token gereklidir" }, { status: 400 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "your-refresh-secret")
    } catch (jwtError) {
      return NextResponse.json({ error: "Geçersiz refresh token" }, { status: 401 })
    }

    const connection = await createConnection()

    try {
      // Check if refresh token exists in sessions
      const [sessions] = await connection.execute(
        "SELECT user_id FROM user_sessions WHERE session_token = ? AND user_id = ?",
        [refreshToken, decoded.userId],
      )

      if (!Array.isArray(sessions) || sessions.length === 0) {
        return NextResponse.json({ error: "Geçersiz session" }, { status: 401 })
      }

      // Get user data
      const [users] = await connection.execute(
        "SELECT id, first_name, last_name, email, email_verified, is_active FROM users WHERE id = ?",
        [decoded.userId],
      )

      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
      }

      const user = users[0] as any

      if (!user.is_active) {
        return NextResponse.json({ error: "Hesap devre dışı bırakılmış" }, { status: 403 })
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "15m" },
      )

      // Update session last activity
      await connection.execute("UPDATE user_sessions SET last_activity = NOW() WHERE session_token = ?", [refreshToken])

      return NextResponse.json(
        {
          token: newAccessToken,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            emailVerified: user.email_verified,
          },
        },
        { status: 200 },
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Refresh token error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
