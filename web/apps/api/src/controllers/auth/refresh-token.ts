import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createConnection } from '../../lib/database';

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token gereklidir" });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "your-refresh-secret") as any;

      const connection = await createConnection();

      try {
        // Check if session exists
        const [sessions] = await connection.execute(
          "SELECT user_id FROM user_sessions WHERE session_token = ?",
          [refreshToken]
        );

        if (!Array.isArray(sessions) || sessions.length === 0) {
          return res.status(401).json({ error: "Geçersiz refresh token" });
        }

        // Get user info
        const [users] = await connection.execute(
          "SELECT id, email FROM users WHERE id = ? AND is_active = 1",
          [decoded.userId]
        );

        if (!Array.isArray(users) || users.length === 0) {
          return res.status(401).json({ error: "Kullanıcı bulunamadı" });
        }

        const user = users[0] as any;

        // Generate new access token
        const accessToken = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "15m" }
        );

        return res.status(200).json({
          token: accessToken,
        });
      } finally {
        await connection.end();
      }
    } catch (error) {
      return res.status(401).json({ error: "Geçersiz refresh token" });
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 