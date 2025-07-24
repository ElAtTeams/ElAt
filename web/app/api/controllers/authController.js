// controllers/authController.js
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const sendEmail = require('../lib/sendEmail');
const crypto = require('crypto');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Hata yakalama yardımcı fonksiyonu
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Kullanıcı kaydı
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, birthDate, gender } = req.body;

  // Email kontrolü
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'Bu email adresi zaten kullanılıyor'
    });
  }

  // Doğrulama tokeni oluştur
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Kullanıcı oluştur
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    birthDate,
    gender
  });

  // Doğrulama tokeni kaydet
  await User.saveVerificationToken(user.id, verificationToken);

  // Doğrulama emaili gönder
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  await sendEmail({
    email: user.email,
    subject: 'Email Doğrulama',
    message: `Email adresinizi doğrulamak için lütfen şu linke tıklayın: ${verificationUrl}`
  });

  // Token oluştur
  const token = User.generateAuthToken(user.id);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    },
    token
  });
});

// Giriş işlemi
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Email ve şifre kontrolü
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Lütfen email ve şifre giriniz'
    });
  }

  // Kullanıcıyı bul
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Geçersiz email veya şifre'
    });
  }

  // Şifre kontrolü
  const isMatch = await User.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Geçersiz email veya şifre'
    });
  }

  // Email doğrulama kontrolü
  if (!user.is_verified) {
    return res.status(401).json({
      success: false,
      error: 'Lütfen email adresinizi doğrulayın'
    });
  }

  // Token oluştur
  const token = User.generateAuthToken(user.id);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    },
    token
  });
});

// Google ile giriş
exports.googleLogin = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  // Token doğrulama
  const ticket = await googleClient.verifyIdToken({
    idToken: accessToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const { email, given_name, family_name, picture } = ticket.getPayload();

  // Kullanıcı var mı kontrol et
  let user = await User.findByEmail(email);

  if (!user) {
    // Yeni kullanıcı oluştur
    const randomPassword = crypto.randomBytes(20).toString('hex');
    user = await User.create({
      firstName: given_name,
      lastName: family_name,
      email,
      password: randomPassword,
      birthDate: new Date(), // Varsayılan değer
      gender: 'diğer' // Varsayılan değer
    });

    // Profil fotoğrafını güncelle
    await User.updateProfilePhoto(user.id, picture);

    // Google ile giriş yapan kullanıcıları otomatik doğrula
    await User.verifyEmail(user.id);
  }

  // Token oluştur
  const token = User.generateAuthToken(user.id);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    },
    token
  });
});

// Şifre sıfırlama isteği
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findByEmail(req.body.email);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'Bu email adresiyle kayıtlı kullanıcı bulunamadı'
    });
  }

  // Sıfırlama tokeni oluştur
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika

  // Tokeni kaydet
  await User.saveResetToken(user.id, resetToken, resetTokenExpiry);

  // Sıfırlama emaili gönder
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: 'Şifre Sıfırlama',
      message: `Şifrenizi sıfırlamak için şu linke tıklayın: ${resetUrl}`
    });

    res.status(200).json({
      success: true,
      message: 'Şifre sıfırlama linki emailinize gönderildi'
    });
  } catch (err) {
    // Hata durumunda tokeni sil
    await User.saveResetToken(user.id, null, null);

    return res.status(500).json({
      success: false,
      error: 'Email gönderilemedi'
    });
  }
});

// Şifre sıfırlama
exports.resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findByResetToken(req.params.resetToken);

  if (!user) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz veya süresi dolmuş token'
    });
  }

  // Yeni şifre ayarla
  await User.updatePassword(user.id, req.body.password);
  
  // Reset tokeni temizle
  await User.saveResetToken(user.id, null, null);

  res.status(200).json({
    success: true,
    message: 'Şifre başarıyla sıfırlandı'
  });
});

// Email doğrulama
exports.verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findByVerificationToken(req.params.token);

  if (!user) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz doğrulama tokeni'
    });
  }

  await User.verifyEmail(user.id);

  res.status(200).json({
    success: true,
    message: 'Email başarıyla doğrulandı'
  });
});

// Token doğrulama
exports.verifyToken = asyncHandler(async (req, res) => {
  // Token kontrolü middleware'de yapılıyor
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    }
  });
});