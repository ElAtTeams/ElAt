import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    // Validate input
    if (!token || !password) {
      return NextResponse.json({ error: "Token ve yeni şifre gereklidir" }, { status: 400 })
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    const connection = await createConnection()

    try {
      // Find user with valid reset token
      const [users] = await connection.execute(
        "SELECT id, email, password FROM users WHERE reset_token = ? AND reset_token_expiry > NOW() AND is_active = TRUE",
        [token],
      )

      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json({ error: "Geçersiz veya süresi dolmuş token" }, { status: 400 })
      }

      const user = users[0] as any

      // Check if new password is same as current password
      const isSamePassword = await bcrypt.compare(password, user.password)
      if (isSamePassword) {
        return NextResponse.json({ error: "Yeni şifre mevcut şifre ile aynı olamaz" }, { status: 400 })
      }

      // Check password history (last 3 passwords)
      const [passwordHistory] = await connection.execute(
        "SELECT password_hash FROM password_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 3",
        [user.id],
      )

      if (Array.isArray(passwordHistory)) {
        for (const oldPassword of passwordHistory) {
          const isOldPassword = await bcrypt.compare(password, (oldPassword as any).password_hash)
          if (isOldPassword) {
            return NextResponse.json({ error: "Son kullandığınız 3 şifreden birini kullanamazsınız" }, { status: 400 })
          }
        }
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Save old password to history
      await connection.execute(
        "INSERT INTO password_history (user_id, password_hash, created_at) VALUES (?, ?, NOW())",
        [user.id, user.password],
      )

      // Update user password and clear reset token
      await connection.execute(
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW() WHERE id = ?",
        [hashedPassword, user.id],
      )

      // Invalidate all existing sessions for security
      await connection.execute("DELETE FROM user_sessions WHERE user_id = ?", [user.id])

      // Add all existing tokens to blacklist
      await connection.execute(
        "INSERT INTO token_blacklist (token, user_id, reason, created_at) SELECT session_token, user_id, 'password_reset', NOW() FROM user_sessions WHERE user_id = ?",
        [user.id],
      )

      return NextResponse.json(
        { message: "Şifre başarıyla güncellendi. Lütfen yeni şifrenizle giriş yapın." },
        { status: 200 },
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
