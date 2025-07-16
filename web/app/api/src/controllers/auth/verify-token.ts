import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createConnection } from '../../lib/database';

export async function verifyToken(req: Request, res: Response) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token gereklidir" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;

      const connection = await createConnection();

      try {
        // Check if user exists and is active
        const [users] = await connection.execute(
          "SELECT id, first_name, last_name, email, email_verified FROM users WHERE id = ? AND is_active = 1",
          [decoded.userId]
        );

        if (!Array.isArray(users) || users.length === 0) {
          return res.status(401).json({ error: "Geçersiz token" });
        }

        const user = users[0] as any;

        return res.status(200).json({
          valid: true,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            emailVerified: user.email_verified,
          },
        });
      } finally {
        await connection.end();
      }
    } catch (error) {
      return res.status(401).json({ error: "Geçersiz token" });
    }
  } catch (error) {
    console.error("Verify token error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 