const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matches');
const messageRoutes = require('./routes/messages');

const app = express();

// Security middleware
app.use(helmet()); // Güvenlik başlıkları
app.use(xss()); // XSS koruması
app.use(mongoSanitize()); // NoSQL injection koruması
app.use(hpp()); // HTTP Parameter Pollution koruması

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 dakika
  max: 100 // Her IP için maksimum 100 istek
});
app.use('/api/', limiter);

// CORS
app.use(cors());

// Body parser
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      const parsed = JSON.parse(buf.toString());

      if (
        typeof parsed !== 'object' || 
        parsed === null || 
        Array.isArray(parsed)
      ) {
        throw new Error('Geçersiz JSON body: Sadece nesne bekleniyor');
      }
    } catch (e) {
      res.status(400).json({ 
        success: false, 
        error: 'Geçersiz JSON formatı. Nesne bekleniyor.' 
      });
      throw new Error('Geçersiz JSON formatı');
    }
  }
}));

app.use(express.urlencoded({ extended: true }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length) {
      console.log('Request Body:', req.body);
    }
    next();
  });
}

// Swagger API dokümantasyonu
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Static dosya sunumu
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Sayfa bulunamadı' 
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Validation hatası
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: Object.values(err.errors).map(val => val.message)
    });
  }

  // JWT hatası
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Geçersiz token'
    });
  }

  // Genel hata
  res.status(err.status || 500).json({ 
    success: false, 
    error: err.message || 'Bir şeyler ters gitti!' 
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`API Dokümantasyonu: http://localhost:${PORT}/api-docs`);
}); 