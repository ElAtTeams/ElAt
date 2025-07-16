import { Request, Response } from 'express';
import { createConnection } from '../../lib/database';

export async function logout(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId; // Assuming middleware sets user
    const refreshToken = req.body.refreshToken;

    if (!userId || !refreshToken) {
      return res.status(401).json({ error: "Geçersiz oturum" });
    }

    const connection = await createConnection();

    try {
      // Remove session
      await connection.execute(
        "DELETE FROM user_sessions WHERE user_id = ? AND session_token = ?",
        [userId, refreshToken]
      );

      return res.status(200).json({ message: "Başarıyla çıkış yapıldı" });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
} 