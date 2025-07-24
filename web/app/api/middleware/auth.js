const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Hata yakalama yardımcı fonksiyonu
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Token kontrolü
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
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

    // Request'e kullanıcı bilgisini ekle
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({
      success: false,
      error: 'Geçersiz token veya oturum süresi dolmuş'
    });
  }
});

// Rol bazlı yetkilendirme
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

// Ek güvenlik önlemleri
exports.securityHeaders = (req, res, next) => {
  // Güvenlik header'ları ekle
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
};

// CSRF koruması (Eğer cookie-based auth kullanıyorsanız)
exports.csrfProtection = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;
    if (!csrfToken || csrfToken !== req.cookies._csrf) {
      return next(
        new ErrorResponse('CSRF token doğrulaması başarısız', 403)
      );
    }
  }
  next();
};