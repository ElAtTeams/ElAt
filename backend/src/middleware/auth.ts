import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
}

// Geliştirilmiş Request interface'i
export interface AuthRequest extends Request {
  user?: DecodedToken;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Authorization header'ını al
    const authHeader = req.headers.authorization;
    
    console.log('Auth Header:', authHeader); // Debug için
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header bulunamadı' });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token Bearer formatında değil' });
    }
    
    // Token'ı ayıkla (Bearer kısmını çıkar)
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debug için
    
    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({ error: 'Token boş veya geçersiz' });
    }
    
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'elatsecret') as DecodedToken;
    console.log('Decoded Token:', decoded); // Debug için
    
    // Kullanıcı bilgisini request'e ekle
    req.user = decoded;
    
    next();
  } catch (error: any) {
    console.error('Token doğrulama hatası:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token formatı geçersiz' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token süresi dolmuş' });
    } else {
      return res.status(401).json({ error: 'Token doğrulama başarısız' });
    }
  }
};