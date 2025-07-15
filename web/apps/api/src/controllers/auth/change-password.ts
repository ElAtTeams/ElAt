import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createConnection } from '../../lib/database';

export async function changePassword(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user?.userId; // Assuming middleware sets user

    if (!userId) {
      return res.status(401).json({ error: "Oturum açmanız gerekiyor" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Mevcut şifre ve yeni şifre gereklidir" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Yeni şifre en az 6 karakter olmalıdır" });
    }

    const connection = await createConnection();

    try {
      // Get current user
      const [users] = await connection.execute(
        "SELECT password FROM users WHERE id = ?",
        [userId]
      );

      if (!Array.isArray(users) || users.length === 0) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı" });
      }

      const user = users[0] as any;

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Mevcut şifre hatalı" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await connection.execute(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, userId]
      );

      return res.status(200).json({ message: "Şifre başarıyla güncellendi" });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 