import { NextResponse } from "next/server"
import { query } from "@/lib/database"
import { sendPasswordResetEmail } from "@/lib/nodemailer"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    const result = await query("SELECT id FROM users WHERE email = $1", [email])
    const user = result.rows[0]

    if (!user) {
      // For security, don't reveal if the email doesn't exist
      return NextResponse.json({ success: true, message: "Şifre sıfırlama bağlantısı gönderildi." }, { status: 200 })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    // In a real application, you would store this token in the database with an expiry
    // For this example, we'll just send it.
    console.log(`Generated reset token for ${email}: ${resetToken}`)

    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({ success: true, message: "Şifre sıfırlama bağlantısı gönderildi." }, { status: 200 })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ success: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 })
  }
}
