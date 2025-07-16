import nodemailer from "nodemailer"

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP configuration error:", error)
  } else {
    console.log("SMTP server is ready to send emails")
  }
})

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || "YanKapı <noreply@yankapi.com>",
      to: email,
      subject: "YanKapı'ya Hoş Geldiniz! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hoş Geldiniz</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #10b981;">
              <h1 style="color: #10b981; margin: 0; font-size: 28px;">YanKapı</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Mahalle Topluluğu</p>
            </div>
            
            <div style="padding: 30px 0;">
              <h2 style="color: #333; margin-bottom: 20px;">Merhaba ${firstName}! 👋</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                YanKapı ailesine hoş geldiniz! Hesabınız başarıyla oluşturuldu ve artık komşularınızla 
                bağlantı kurabilir, yardımlaşabilir ve güçlü bir topluluk oluşturabilirsiniz.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Neler yapabilirsiniz?</h3>
                <ul style="color: #666; line-height: 1.6;">
                  <li>Komşularınızla mesajlaşın</li>
                  <li>Yardım isteyin veya yardım teklif edin</li>
                  <li>Mahalle etkinliklerini keşfedin</li>
                  <li>Güvenli bir topluluk ortamında paylaşımda bulunun</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login" 
                   style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Uygulamaya Giriş Yap
                </a>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                Herhangi bir sorunuz varsa, bize <a href="mailto:destek@yankapi.com" style="color: #10b981;">destek@yankapi.com</a> 
                adresinden ulaşabilirsiniz.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
              <p>© 2024 YanKapı. Tüm hakları saklıdır.</p>
              <p>Bu e-posta ${email} adresine gönderilmiştir.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Welcome email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("Error sending welcome email:", error)
    throw error
  }
}

export async function sendPasswordResetEmail(email: string, firstName: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

    const mailOptions = {
      from: process.env.SMTP_FROM || "YanKapı <noreply@yankapi.com>",
      to: email,
      subject: "Şifre Sıfırlama Talebi - YanKapı",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Şifre Sıfırlama</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #10b981;">
              <h1 style="color: #10b981; margin: 0; font-size: 28px;">YanKapı</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Şifre Sıfırlama</p>
            </div>
            
            <div style="padding: 30px 0;">
              <h2 style="color: #333; margin-bottom: 20px;">Merhaba ${firstName},</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                Hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak 
                yeni şifrenizi oluşturabilirsiniz.
              </p>
              
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  ⚠️ Bu bağlantı sadece 1 saat geçerlidir. Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Şifremi Sıfırla
                </a>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                Eğer buton çalışmıyorsa, aşağıdaki bağlantıyı kopyalayıp tarayıcınıza yapıştırabilirsiniz:
              </p>
              <p style="color: #10b981; font-size: 12px; word-break: break-all;">
                ${resetUrl}
              </p>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px; margin-top: 30px;">
                Güvenliğiniz için şifrenizi kimseyle paylaşmayın ve güçlü bir şifre seçin.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
              <p>© 2024 YanKapı. Tüm hakları saklıdır.</p>
              <p>Bu e-posta ${email} adresine gönderilmiştir.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Password reset email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("Error sending password reset email:", error)
    throw error
  }
}
