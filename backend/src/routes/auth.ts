import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import emailService from '../services/emailService';

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
    
    // Hoş geldin email'i gönder (background'da)
    emailService.sendWelcomeEmail(email, firstName).catch(console.error);
    
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

// Token doğrulama endpoint'i
router.post('/verify-token', authMiddleware, async (req: AuthRequest, res: Response) => {
  // authMiddleware zaten token'ı doğruladı ve req.user'ı set etti
  // Bu endpoint sadece token'ın geçerliliğini kontrol etmek için kullanılır
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Geçersiz token.' });
    }

    // Token geçerli, kullanıcı bilgilerini döndür
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.json({ 
      valid: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isOnboardingComplete: user.isOnboardingComplete || false
      }
    });
  } catch (err) {
    console.error('Verify token error:', err);
    res.status(500).json({ error: 'Token doğrulama başarısız.' });
  }
});

// Şifre sıfırlama isteği (OTP kodu ile e-posta gönderme)
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'E-posta adresi gerekli.' });
  }
  
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Güvenlik için kullanıcı bulunamadığında da başarılı mesajı döndür
      return res.json({ message: 'Şifre sıfırlama kodu e-posta adresinize gönderildi.' });
    }
    
    // 6 haneli OTP kodu üret
    const otpCode = emailService.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika geçerli
    
    // OTP kodunu veritabanına kaydet
    await user.update({
      otpCode,
      otpExpiry
    });
    
    // Email gönder
    const emailSent = await emailService.sendPasswordResetEmail(email, otpCode);
    
    if (emailSent) {
      res.json({ 
        message: 'Şifre sıfırlama kodu e-posta adresinize gönderildi.',
        success: true 
      });
    } else {
      res.status(500).json({ error: 'E-posta gönderilirken bir hata oluştu.' });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
  }
});

// OTP kod doğrulama
router.post('/verify-otp', async (req: Request, res: Response) => {
  const { email, otpCode } = req.body;
  
  if (!email || !otpCode) {
    return res.status(400).json({ error: 'E-posta ve OTP kodu gerekli.' });
  }
  
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    // OTP kodunu kontrol et
    if (!user.otpCode || user.otpCode !== otpCode) {
      return res.status(400).json({ error: 'Geçersiz OTP kodu.' });
    }
    
    // OTP süresi kontrol et
    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP kodunun süresi dolmuş.' });
    }
    
    // Reset token oluştur (şifre değiştirmek için)
    const resetToken = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET || 'elatsecret', 
      { expiresIn: '15m' }
    );
    
    // Reset token'ı kaydet
    await user.update({
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 dakika
      otpCode: undefined, // OTP kodunu temizle
      otpExpiry: undefined
    });
    
    res.json({ 
      message: 'OTP kodu doğrulandı.',
      resetToken,
      success: true 
    });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
  }
});

// Şifre sıfırlama (yeni şifre ayarlama)
router.post('/reset-password', async (req: Request, res: Response) => {
  const { resetToken, newPassword } = req.body;
  
  if (!resetToken || !newPassword) {
    return res.status(400).json({ error: 'Reset token ve yeni şifre gerekli.' });
  }
  
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır.' });
  }
  
  try {
    // Token'ı doğrula
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'elatsecret') as { id: number, email: string };
    
    // Kullanıcıyı bul
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    
    // Reset token kontrol et
    if (!user.resetToken || user.resetToken !== resetToken) {
      return res.status(400).json({ error: 'Geçersiz reset token.' });
    }
    
    // Reset token süresi kontrol et
    if (!user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
      return res.status(400).json({ error: 'Reset token\'ın süresi dolmuş.' });
    }
    
    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Şifreyi güncelle ve reset token'ları temizle
    await user.update({ 
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined
    });
    
    // Şifre değiştirildi email'i gönder
    emailService.sendPasswordChangedEmail(user.email, user.firstName).catch(console.error);
    
    res.json({ message: 'Şifreniz başarıyla güncellendi.', success: true });
  } catch (err) {
    console.error('Reset password error:', err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
    }
    res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
  }
});

export default router;
