import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createConnection } from '../../lib/database';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "E-posta ve şifre gereklidir" });
    }

    const connection = await createConnection();

    try {
      // Get user from database
      const [users] = await connection.execute(
        "SELECT id, first_name, last_name, email, password, email_verified, is_active FROM users WHERE email = ?",
        [email]
      );

      if (!Array.isArray(users) || users.length === 0) {
        return res.status(401).json({ error: "E-posta veya şifre hatalı" });
      }

      const user = users[0] as any;

      // Check if account is active
      if (!user.is_active) {
        return res.status(403).json({ error: "Hesap devre dışı bırakılmış" });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "E-posta veya şifre hatalı" });
      }

      // Generate JWT tokens
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
        { expiresIn: "7d" }
      );

      // Create user session
      await connection.execute(
        "INSERT INTO user_sessions (user_id, session_token, device_info, ip_address) VALUES (?, ?, ?, ?)",
        [user.id, refreshToken, req.headers["user-agent"] || "unknown", req.ip || "unknown"]
      );

      return res.status(200).json({
        message: "Giriş başarılı",
        token: accessToken,
        refreshToken,
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
    console.error("Login error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 