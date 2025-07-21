const nodemailer = require('nodemailer');

// Email transporter oluştur
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Test email bağlantısı
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP bağlantı hatası:', error);
  } else {
    console.log('SMTP sunucusuna bağlantı başarılı');
  }
});

// Email gönderme fonksiyonu
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html
    });

    console.log('Email gönderildi:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};
