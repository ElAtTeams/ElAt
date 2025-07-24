// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token kontrolü
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Bu işlem için giriş yapmanız gerekiyor'
      });
    }

    try {
      // Token doğrulama
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcı kontrolü
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Bu token ile ilişkili kullanıcı bulunamadı'
        });
      }

      // Email doğrulama kontrolü
      if (!user.is_verified) {
        return res.status(401).json({
          success: false,
          error: 'Lütfen email adresinizi doğrulayın'
        });
      }

      // Request'e kullanıcı bilgisini ekle
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Geçersiz token'
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Sunucu hatası'
    });
  }
};

// Belirli rollere sahip kullanıcıları kontrol etme
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Bu işlem için yetkiniz bulunmuyor'
      });
    }
    next();
  };
};