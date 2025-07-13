import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Tüm alanlar gereklidir" }, { status: 400 })
    }

    // Name validation
    if (firstName.length < 2 || lastName.length < 2) {
      return NextResponse.json({ error: "Ad ve soyad en az 2 karakter olmalıdır" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin" }, { status: 400 })
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    const connection = await createConnection()

    try {
      // Check if user already exists
      const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return NextResponse.json({ error: "Bu e-posta adresi zaten kullanılıyor" }, { status: 400 })
      }

      // Hash password with higher cost for better security
      const hashedPassword = await bcrypt.hash(password, 12)

      // Generate email verification token
      const emailVerificationToken = jwt.sign(
        { email, type: "email_verification" },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      )

      // Insert new user
      const [result] = await connection.execute(
        `INSERT INTO users (
          first_name, last_name, email, password, 
          email_verification_token, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [firstName, lastName, email, hashedPassword, emailVerificationToken],
      )

      const userId = (result as any).insertId

      // Generate JWT tokens
      const accessToken = jwt.sign(
        {
          userId: userId,
          email: email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "15m" },
      )

      const refreshToken = jwt.sign(
        {
          userId: userId,
        },
        process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
        { expiresIn: "7d" },
      )

      // Create user session
      const userAgent = request.headers.get("user-agent") || "Unknown"
      const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

      await connection.execute(
        "INSERT INTO user_sessions (user_id, session_token, device_info, ip_address, user_agent, is_mobile) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, refreshToken, userAgent, ipAddress, userAgent, userAgent.toLowerCase().includes("mobile")],
      )

      // Send welcome email (don't wait for it to complete)
      sendWelcomeEmail(email, firstName).catch((error) => {
        console.error("Failed to send welcome email:", error)
      })

      return NextResponse.json(
        {
          message: "Hesap başarıyla oluşturuldu",
          token: accessToken,
          refreshToken,
          user: {
            id: userId,
            firstName,
            lastName,
            email,
            emailVerified: false,
          },
        },
        { status: 201 },
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
