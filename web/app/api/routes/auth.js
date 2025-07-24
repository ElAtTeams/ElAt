// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validasyon kuralları
const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('Ad alanı zorunludur'),
  body('lastName').trim().notEmpty().withMessage('Soyad alanı zorunludur'),
  body('email').isEmail().withMessage('Geçerli bir email adresi giriniz'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır'),
  body('birthDate').isISO8601().withMessage('Geçerli bir tarih giriniz'),
  body('gender')
    .isIn(['erkek', 'kadın', 'diğer'])
    .withMessage('Geçerli bir cinsiyet seçiniz'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Geçerli bir email adresi giriniz'),
  body('password').notEmpty().withMessage('Şifre alanı zorunludur'),
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Geçerli bir email adresi giriniz'),
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır'),
];

// Auth rotaları
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password/:resetToken', resetPasswordValidation, authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;