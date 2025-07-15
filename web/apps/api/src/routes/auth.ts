import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { register } from '../controllers/auth/register';
import { forgotPassword } from '../controllers/auth/forgot-password';
import { resetPassword } from '../controllers/auth/reset-password';
import { changePassword } from '../controllers/auth/change-password';
import { logout } from '../controllers/auth/logout'; 
import { verifyToken } from '../controllers/auth/verify-token';
import { refreshToken } from '../controllers/auth/refresh-token';
import { googleAuth, googleCallback } from '../controllers/auth/google';

const router = Router();

// Auth routes
router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
router.post('/logout', logout);
router.post('/verify-token', verifyToken);
router.post('/refresh-token', refreshToken);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router; 