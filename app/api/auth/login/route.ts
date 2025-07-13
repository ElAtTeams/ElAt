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

    const connection = await createConnection()

    // Find user by email
    const [users] = await connection.execute(
      "SELECT id, first_name, last_name, email, password, neighborhood FROM users WHERE email = ?",
      [email],
    )

    await connection.end()

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: "Geçersiz e-posta veya şifre" }, { status: 401 })
    }

    const user = users[0] as any

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Geçersiz e-posta veya şifre" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    return NextResponse.json(
      {
        message: "Giriş başarılı",
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          neighborhood: user.neighborhood,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
