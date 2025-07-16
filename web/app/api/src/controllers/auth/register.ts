import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createConnection } from '../../lib/database';

export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Tüm alanlar gereklidir" });
    }

    // Name validation
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({ error: "Ad ve soyad en az 2 karakter olmalıdır" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Geçerli bir e-posta adresi girin" });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır" });
    }

    const connection = await createConnection();

    try {
      // Check if user already exists
      const [existingUsers] = await connection.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return res.status(400).json({ error: "Bu e-posta adresi zaten kullanılıyor" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insert new user
      const [result] = await connection.execute(
        "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())",
        [firstName, lastName, email, hashedPassword]
      );

      // Generate JWT tokens
      const accessToken = jwt.sign(
        {
          userId: (result as any).insertId,
          email: email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          userId: (result as any).insertId,
        },
        process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
        { expiresIn: "7d" }
      );

      // Create user session
      await connection.execute(
        "INSERT INTO user_sessions (user_id, session_token, device_info, ip_address) VALUES (?, ?, ?, ?)",
        [
          (result as any).insertId,
          refreshToken,
          req.headers["user-agent"] || "unknown",
          req.ip || "unknown",
        ]
      );

      return res.status(201).json({
        message: "Hesap başarıyla oluşturuldu",
        token: accessToken,
        refreshToken,
        user: {
          id: (result as any).insertId,
          firstName,
          lastName,
          email,
          emailVerified: false,
        },
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 