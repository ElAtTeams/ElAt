import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createConnection } from '../../lib/database';

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token ve şifre gereklidir" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır" });
    }

    const connection = await createConnection();

    try {
      // Find user with valid reset token
      const [users] = await connection.execute(
        "SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
        [token]
      );

      if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ error: "Geçersiz veya süresi dolmuş token" });
      }

      const user = users[0] as any;

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update password and clear reset token
      await connection.execute(
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
        [hashedPassword, user.id]
      );

      return res.status(200).json({ message: "Şifre başarıyla güncellendi" });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 