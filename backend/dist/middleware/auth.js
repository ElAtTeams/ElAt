"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        // Authorization header'ını al
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Yetkilendirme token\'ı bulunamadı' });
        }
        // Token'ı ayıkla (Bearer kısmını çıkar)
        const token = authHeader.split(' ')[1];
        // Token'ı doğrula
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'elatsecret');
        // Kullanıcı bilgisini request'e ekle
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token doğrulama hatası:', error);
        return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
    }
};
exports.authMiddleware = authMiddleware;
