const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async ({ email, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw new Error('Email gönderilemedi');
  }
};

module.exports = sendEmail; 