import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createConnection } from "@/lib/database"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin" }, { status: 400 })
    }

    const connection = await createConnection()

    try {
      // Check if user exists
      const [users] = await connection.execute(
        "SELECT id, first_name FROM users WHERE email = ? AND is_active = TRUE",
        [email],
      )

      if (!Array.isArray(users) || users.length === 0) {
        // Don't reveal if email exists or not for security
        return NextResponse.json(
          { message: "Eğer bu e-posta adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderilecektir." },
          { status: 200 },
        )
      }

      const user = users[0] as any

      // Generate secure reset token
      const resetToken = crypto.randomBytes(32).toString("hex")
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

      // Save reset token to database
      await connection.execute("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?", [
        resetToken,
        resetTokenExpiry,
        user.id,
      ])

      // Send password reset email
      await sendPasswordResetEmail(email, user.first_name, resetToken)

      return NextResponse.json(
        { message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi." },
        { status: 200 },
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
