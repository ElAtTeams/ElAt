import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
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

    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Mevcut şifre ve yeni şifre gereklidir" }, { status: 400 })
    }

    // Password validation
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Yeni şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    if (!strongPasswordRegex.test(newPassword)) {
      return NextResponse.json(
        { error: "Yeni şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir" },
        { status: 400 },
      )
    }

    const connection = await createConnection()

    // Get user's current password
    const [users] = await connection.execute("SELECT id, password FROM users WHERE id = ?", [decoded.userId])

    if (!Array.isArray(users) || users.length === 0) {
      await connection.end()
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    }

    const user = users[0] as any

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      await connection.end()
      return NextResponse.json({ error: "Mevcut şifre yanlış" }, { status: 400 })
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) {
      await connection.end()
      return NextResponse.json({ error: "Yeni şifre mevcut şifreden farklı olmalıdır" }, { status: 400 })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await connection.execute("UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?", [
      hashedNewPassword,
      user.id,
    ])

    // Log password change activity
    await connection.execute(
      "INSERT INTO user_sessions (user_id, session_token, device_info, ip_address) VALUES (?, ?, ?, ?)",
      [user.id, "password_changed", "Password Change Activity", request.ip || "unknown"],
    )

    await connection.end()

    return NextResponse.json({ message: "Şifreniz başarıyla değiştirildi" }, { status: 200 })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
