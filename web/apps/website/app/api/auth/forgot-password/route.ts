import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import nodemailer from "nodemailer"
import { createConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir" }, { status: 400 })
    }

    const connection = await createConnection()

    // Check if user exists
    const [users] = await connection.execute("SELECT id, first_name FROM users WHERE email = ?", [email])

    if (!Array.isArray(users) || users.length === 0) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ message: "Şifre sıfırlama bağlantısı gönderildi" }, { status: 200 })
    }

    const user = users[0] as any

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token to database
    await connection.execute("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?", [
      resetToken,
      resetTokenExpiry,
      user.id,
    ])

    await connection.end()

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "YanKapı - Şifre Sıfırlama",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">YanKapı</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Merhaba ${user.first_name},</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Şifrenizi sıfırlamak için bir talepte bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi oluşturabilirsiniz.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Şifremi Sıfırla
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              Bu bağlantı 1 saat boyunca geçerlidir. Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              Bağlantı çalışmıyorsa, aşağıdaki URL'yi tarayıcınıza kopyalayın:<br>
              <span style="word-break: break-all;">${resetUrl}</span>
            </p>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              © 2024 YanKapı. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Şifre sıfırlama bağlantısı gönderildi" }, { status: 200 })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
