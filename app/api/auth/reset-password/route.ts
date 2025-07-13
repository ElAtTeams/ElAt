import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token ve şifre gereklidir" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    const connection = await createConnection()

    // Find user with valid reset token
    const [users] = await connection.execute(
      "SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token],
    )

    if (!Array.isArray(users) || users.length === 0) {
      await connection.end()
      return NextResponse.json({ error: "Geçersiz veya süresi dolmuş token" }, { status: 400 })
    }

    const user = users[0] as any

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update password and clear reset token
    await connection.execute(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
      [hashedPassword, user.id],
    )

    await connection.end()

    return NextResponse.json({ message: "Şifre başarıyla güncellendi" }, { status: 200 })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
