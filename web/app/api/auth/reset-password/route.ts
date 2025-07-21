const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../../lib/database');

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    // Token ve şifre kontrolü
    if (!token || !password) {
      return res.status(400).json({ error: 'Token ve yeni şifre gereklidir' });
    }

    // Token'a sahip kullanıcıyı bul
    const user = await pool.query(
      'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
      [token]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Geçersiz veya süresi dolmuş token' });
    }

    // Yeni şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Şifreyi güncelle ve reset token'ı temizle
    await pool.query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2',
      [hashedPassword, user.rows[0].id]
    );

    res.json({ message: 'Şifreniz başarıyla sıfırlandı' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
