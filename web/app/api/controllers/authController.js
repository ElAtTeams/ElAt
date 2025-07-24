// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

// Hata yakalama yardımcı fonksiyonu
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    // Validasyon kontrolü
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, birthDate, gender } = req.body;
    console.log('Register request body:', {
      firstName,
      lastName,
      email,
      birthDate,
      gender,
      passwordLength: password?.length
    });

    try {
      // Email kontrolü
      const existingUser = await User.findByEmail(email);
      console.log('Existing user check:', existingUser);
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Bu email adresi zaten kullanılıyor'
        });
      }

      // Kullanıcı oluştur
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        birthDate,
        gender
      });
      console.log('User created:', user);

      // Doğrulama tokeni oluştur
      const verificationToken = crypto.randomBytes(20).toString('hex');
      await User.saveVerificationToken(user.id, verificationToken);
      console.log('Verification token saved');

      // Token oluştur
      const token = User.generateAuthToken(user.id);
      console.log('Auth token generated');

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          },
          token
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Kayıt işlemi sırasında bir hata oluştu',
      details: error.message
    });
  }
};

// Giriş işlemi
exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
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
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Giriş işlemi sırasında bir hata oluştu'
    });
  }
});

// Şifre sıfırlama isteği
exports.forgotPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
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

    res.status(200).json({
      success: true,
      message: 'Şifre sıfırlama talimatları email adresinize gönderildi'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Şifre sıfırlama işlemi sırasında bir hata oluştu'
    });
  }
});

// Şifre sıfırlama
exports.resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
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
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Şifre sıfırlama işlemi sırasında bir hata oluştu'
    });
  }
});

// Email doğrulama
exports.verifyEmail = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email doğrulama işlemi sırasında bir hata oluştu'
    });
  }
});