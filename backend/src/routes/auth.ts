import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Tüm alanlar zorunlu.' });
  }
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Bu e-posta zaten kayıtlı.' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hash });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'elatsecret', { expiresIn: '7d' });
    console.log('Register - Generated token:', token); // Debug için
    res.status(201).json({ 
      token,
      user: { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        isOnboardingComplete: false
      } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Kayıt başarısız.' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'E-posta ve şifre zorunlu.' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Şifre yanlış.' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'elatsecret', { expiresIn: '7d' });
    console.log('Generated token:', token); // Debug için
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        isOnboardingComplete: user.isOnboardingComplete || false
      } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Giriş başarısız.' });
  }
});

// Onboarding profili tamamlama (auth middleware korumalı)
router.put('/complete-profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { 
    userId, 
    phone, 
    address, 
    city, 
    district, 
    bio, 
    interests,
    isOnboardingComplete 
  } = req.body;
  
  // Token'dan gelen kullanıcı kimliğiyle eşleşme kontrolü
  if (req.user && userId && req.user.id !== parseInt(userId.toString())) {
    return res.status(403).json({ error: 'Bu profili güncelleme yetkiniz yok.' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'Kullanıcı ID gerekli.' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Profil bilgilerini güncelle
    await user.update({
      phone: phone ?? user.phone,
      address: address ?? user.address,
      city: city ?? user.city,
      district: district ?? user.district,
      bio: bio ?? user.bio,
      interests: interests ?? user.interests,
      // Respect explicit boolean sent by client; default to current value if undefined
      isOnboardingComplete: typeof isOnboardingComplete === 'boolean' ? isOnboardingComplete : (user.isOnboardingComplete ?? false),
    });

    res.json({ 
      message: 'Profil başarıyla güncellendi.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        district: user.district,
        bio: user.bio,
        interests: user.interests,
        isOnboardingComplete: user.isOnboardingComplete,
      }
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Profil güncellemesi başarısız.' });
  }
});

// Kullanıcı profil bilgilerini getir (auth middleware korumalı)
router.get('/profile/:userId', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Profil bilgileri alınamadı.' });
  }
});

// Şifre sıfırlama isteği (e-posta gönderme)
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'E-posta adresi gerekli.' });
  }
  
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Güvenlik için kullanıcı bulunamadığında da başarılı mesajı döndür
      return res.json({ message: 'Şifre sıfırlama talimatları e-posta adresinize gönderildi.' });
    }
    
    // Gerçek uygulamada burada bir token oluşturulur ve e-posta gönderilir
    // Demo için basitleştirilmiş bir yaklaşım kullanıyoruz
    const resetToken = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET || 'elatsecret', 
      { expiresIn: '1h' }
    );
    
    // TODO: E-posta gönderme işlemi burada yapılır
    console.log(`Password reset token for ${email}: ${resetToken}`);
    
    res.json({ message: 'Şifre sıfırlama talimatları e-posta adresinize gönderildi.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
  }
});

// Şifre sıfırlama (yeni şifre ayarlama)
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token ve yeni şifre gerekli.' });
  }
  
  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'elatsecret') as { id: number, email: string };
    
    // Kullanıcıyı bul
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Şifreyi güncelle
    await user.update({ password: hashedPassword });
    
    res.json({ message: 'Şifreniz başarıyla güncellendi.' });
  } catch (err) {
    console.error('Reset password error:', err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
    }
    res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
  }
});

export default router;
