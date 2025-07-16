import { Request, Response } from 'express';
import crypto from 'crypto';
import { createConnection } from '../../lib/database';

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "E-posta adresi gereklidir" });
    }

    const connection = await createConnection();

    try {
      // Check if user exists
      const [users] = await connection.execute(
        "SELECT id, first_name FROM users WHERE email = ?",
        [email]
      );

      if (!Array.isArray(users) || users.length === 0) {
        // Don't reveal if user exists or not for security
        return res.status(200).json({ message: "Şifre sıfırlama bağlantısı gönderildi" });
      }

      const user = users[0] as any;

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Save reset token to database
      await connection.execute(
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
        [resetToken, resetTokenExpiry, user.id]
      );

      // TODO: Send email with reset link
      // For now, just return the token
      return res.status(200).json({
        message: "Şifre sıfırlama bağlantısı gönderildi",
        resetToken // In production, this should be sent via email
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 