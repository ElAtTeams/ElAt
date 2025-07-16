import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, neighborhood } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password || !neighborhood) {
      return NextResponse.json({ error: "Tüm alanlar gereklidir" }, { status: 400 })
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

    // Check if user already exists
    const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email])

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      await connection.end()
      return NextResponse.json({ error: "Bu e-posta adresi zaten kullanılıyor" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert new user
    const [result] = await connection.execute(
      "INSERT INTO users (first_name, last_name, email, password, neighborhood, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [firstName, lastName, email, hashedPassword, neighborhood],
    )

    await connection.end()

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: (result as any).insertId,
        email: email,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    return NextResponse.json(
      {
        message: "Hesap başarıyla oluşturuldu",
        token,
        user: {
          id: (result as any).insertId,
          firstName,
          lastName,
          email,
          neighborhood,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
