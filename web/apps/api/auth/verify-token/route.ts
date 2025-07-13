import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token gereklidir" }, { status: 400 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (jwtError) {
      return NextResponse.json({ error: "Geçersiz token" }, { status: 401 })
    }

    const connection = await createConnection()

    try {
      // Check if token is blacklisted
      const [blacklistedTokens] = await connection.execute("SELECT id FROM token_blacklist WHERE token = ?", [token])

      if (Array.isArray(blacklistedTokens) && blacklistedTokens.length > 0) {
        return NextResponse.json({ error: "Token geçersiz kılınmış" }, { status: 401 })
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

      return NextResponse.json(
        {
          valid: true,
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
    console.error("Verify token error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
