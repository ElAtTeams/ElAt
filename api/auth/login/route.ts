import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "E-posta ve şifre gereklidir" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin" }, { status: 400 })
    }

    const connection = await createConnection()
    const userAgent = request.headers.get("user-agent") || "Unknown"
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    try {
      // Log login attempt
      await connection.execute(
        "INSERT INTO login_attempts (email, ip_address, user_agent, success, created_at) VALUES (?, ?, ?, ?, NOW())",
        [email, ipAddress, userAgent, false],
      )

      // Get user from database
      const [users] = await connection.execute(
        "SELECT id, first_name, last_name, email, password, email_verified, is_active, failed_login_attempts, locked_until FROM users WHERE email = ?",
        [email],
      )

      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 })
      }

      const user = users[0] as any

      // Check if account is locked
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        return NextResponse.json(
          { error: "Hesap geçici olarak kilitlendi. Lütfen daha sonra tekrar deneyin." },
          { status: 423 },
        )
      }

      // Check if account is active
      if (!user.is_active) {
        return NextResponse.json({ error: "Hesap devre dışı bırakılmış" }, { status: 403 })
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        // Increment failed login attempts
        const newFailedAttempts = user.failed_login_attempts + 1
        let lockUntil = null

        // Lock account after 5 failed attempts for 15 minutes
        if (newFailedAttempts >= 5) {
          lockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        }

        await connection.execute("UPDATE users SET failed_login_attempts = ?, locked_until = ? WHERE id = ?", [
          newFailedAttempts,
          lockUntil,
          user.id,
        ])

        return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 })
      }

      // Reset failed login attempts on successful login
      await connection.execute(
        "UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login = NOW() WHERE id = ?",
        [user.id],
      )

      // Update successful login attempt
      await connection.execute(
        "UPDATE login_attempts SET success = TRUE WHERE email = ? AND ip_address = ? ORDER BY created_at DESC LIMIT 1",
        [email, ipAddress],
      )

      // Generate JWT tokens
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "15m" },
      )

      const refreshToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
        { expiresIn: "7d" },
      )

      // Create user session
      await connection.execute(
        "INSERT INTO user_sessions (user_id, session_token, device_info, ip_address, user_agent, is_mobile) VALUES (?, ?, ?, ?, ?, ?)",
        [user.id, refreshToken, userAgent, ipAddress, userAgent, userAgent.toLowerCase().includes("mobile")],
      )

      return NextResponse.json(
        {
          message: "Giriş başarılı",
          token: accessToken,
          refreshToken,
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
    console.error("Login error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
