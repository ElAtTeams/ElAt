const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../../lib/database');
const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // authMiddleware'den gelen kullanıcı bilgisi

    // Gerekli alanların kontrolü
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Tüm alanlar gereklidir' });
    }

    // Kullanıcıyı bul
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Mevcut şifre kontrolü
    const validPassword = await bcrypt.compare(currentPassword, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mevcut şifre yanlış' });
    }

    // Yeni şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Şifreyi güncelle
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({ message: 'Şifre başarıyla güncellendi' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
