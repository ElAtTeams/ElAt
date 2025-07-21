const express = require('express');
const crypto = require('crypto');
const { pool } = require('../../lib/database');
const { sendEmail } = require('../../lib/nodemailer');

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Email kontrolü
    if (!email) {
      return res.status(400).json({ error: 'Email adresi gereklidir' });
    }

    // Kullanıcıyı bul
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      // Güvenlik için kullanıcı bulunamasa bile başarılı mesajı dön
      return res.json({ message: 'Şifre sıfırlama bağlantısı gönderildi' });
    }

    // Reset token oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 saat geçerli

    // Token'ı veritabanına kaydet
    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3',
      [resetToken, resetTokenExpiry, user.rows[0].id]
    );

    // Reset email'i gönder
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Şifre Sıfırlama',
      html: `
        <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
        <a href="${resetUrl}">Şifremi Sıfırla</a>
        <p>Bu bağlantı 1 saat süreyle geçerlidir.</p>
        <p>Eğer bu isteği siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
      `
    });

    res.json({ message: 'Şifre sıfırlama bağlantısı gönderildi' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
