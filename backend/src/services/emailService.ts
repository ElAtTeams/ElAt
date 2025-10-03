import nodemailer from 'nodemailer';
import crypto from 'crypto';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'uzmanyapsin@gmail.com',
        pass: process.env.EMAIL_PASS || 'owou cvhn xqva ncei'
      }
    });
  }

  // 6 haneli OTP kodu üret
  generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Şifre sıfırlama email'i gönder
  async sendPasswordResetEmail(email: string, otp: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'uzmanyapsin@gmail.com',
        to: email,
        subject: 'ElAt - Şifre Sıfırlama Kodu',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0;">ElAt</h1>
              <p style="color: #666; margin: 5px 0;">Komşuluk Uygulaması</p>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">Şifre Sıfırlama Kodu</h2>
              <p style="color: #666; margin-bottom: 30px;">Şifrenizi sıfırlamak için aşağıdaki kodu kullanın:</p>
              
              <div style="background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; display: inline-block;">
                <span style="font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 8px;">${otp}</span>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                Bu kod 10 dakika geçerlidir. Eğer bu isteği siz yapmadıysanız, bu email'i görmezden gelebilirsiniz.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 12px;">
                Bu otomatik bir email'dir, lütfen yanıtlamayın.
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      return false;
    }
  }

  // Hoş geldin email'i gönder
  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'uzmanyapsin@gmail.com',
        to: email,
        subject: 'ElAt\'a Hoş Geldiniz! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0;">ElAt</h1>
              <p style="color: #666; margin: 5px 0;">Komşuluk Uygulaması</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #10b981, #6366f1); border-radius: 12px; padding: 30px; text-align: center; color: white;">
              <h2 style="margin-bottom: 20px;">Hoş Geldiniz ${firstName}! 🎉</h2>
              <p style="margin-bottom: 20px; opacity: 0.9;">
                ElAt ailesine katıldığınız için çok mutluyuz. Artık komşularınızla bağlantı kurabilir, 
                etkinliklere katılabilir ve güvenli bir ortamda sosyalleşebilirsiniz.
              </p>
            </div>
            
            <div style="padding: 30px 0;">
              <h3 style="color: #1a1a1a; margin-bottom: 20px;">İlk adımlarınız:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>Profilinizi tamamlayın</li>
                <li>Konum bilgilerinizi ekleyin</li>
                <li>İlgi alanlarınızı belirtin</li>
                <li>Komşularınızı keşfedin</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 12px;">Sorularınız için bizimle iletişime geçebilirsiniz.</p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Welcome email gönderme hatası:', error);
      return false;
    }
  }

  // Şifre değişiklik onay email'i
  async sendPasswordChangedEmail(email: string, firstName: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'uzmanyapsin@gmail.com',
        to: email,
        subject: 'ElAt - Şifreniz Değiştirildi',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0;">ElAt</h1>
              <p style="color: #666; margin: 5px 0;">Komşuluk Uygulaması</p>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 12px; padding: 30px;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">Şifreniz Değiştirildi ✅</h2>
              <p style="color: #666; margin-bottom: 20px;">Merhaba ${firstName},</p>
              <p style="color: #666; margin-bottom: 20px;">
                Hesabınızın şifresi başarıyla değiştirildi. Eğer bu işlemi siz yapmadıysanız, 
                lütfen hemen bizimle iletişime geçin.
              </p>
              
              <div style="background: #e7f5f0; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
                <p style="color: #1a1a1a; margin: 0; font-weight: 500;">
                  Güvenlik ipucu: Şifrenizi düzenli olarak değiştirin ve başkalarıyla paylaşmayın.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 12px;">
                Bu otomatik bir email'dir, lütfen yanıtlamayın.
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Password changed email gönderme hatası:', error);
      return false;
    }
  }
}

export default new EmailService();