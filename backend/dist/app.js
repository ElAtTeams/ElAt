"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve Swagger UI at /api-docs - using inline swagger spec
try {
    // Doğrudan JSON tanımını yerleştiriyoruz - UTF-8 BOM sorununu çözecektir
    const swaggerDocument = {
        "openapi": "3.0.0",
        "info": {
            "title": "ElAt API",
            "description": "ElAt API - Komşuluk uygulaması API belgeleri",
            "version": "1.0.0"
        },
        "servers": [
            {
                "url": "http://localhost:4000/api",
                "description": "Local Development Server"
            }
        ],
        "paths": {
            "/auth/register": {
                "post": {
                    "summary": "Yeni kullanıcı kaydı",
                    "tags": ["Auth"],
                    "description": "Yeni bir kullanıcı hesabı oluşturur"
                }
            },
            "/auth/login": {
                "post": {
                    "summary": "Kullanıcı girişi",
                    "tags": ["Auth"],
                    "description": "Kullanıcı kimlik doğrulaması yapar ve token döndürür"
                }
            },
            "/auth/complete-profile": {
                "put": {
                    "summary": "Kullanıcı profilini tamamla",
                    "tags": ["Auth"],
                    "description": "Kullanıcı profilini tamamlamak için kullanılır"
                }
            },
            "/auth/profile/{userId}": {
                "get": {
                    "summary": "Kullanıcı profil bilgilerini getir",
                    "tags": ["Auth"],
                    "description": "Kullanıcı profil bilgilerini getirir"
                }
            }
        },
        "components": {
            "securitySchemes": {
                "BearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        }
    };
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
catch (err) {
    console.warn('Swagger UI could not be mounted:', err?.message ?? err);
}
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h1>ElAt Backend API</h1>
      <p>Komsuluk uygulamasi backend servisi calisiyor!</p>
      <p>Database: PostgreSQL | Port: 4000</p>
      <div style="margin-top: 20px;">
        <a href="/api/auth/register" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
          POST /api/auth/register
        </a>
        <a href="/api/auth/login" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
          POST /api/auth/login
        </a>
      </div>
    </div>
  `);
});
const PORT = Number(process.env.PORT) || 4000;
// DEV ONLY: Tabloları sıfırlama ve yeniden oluşturma (üretimde KULLANMAYIN)
const isDevelopment = process.env.NODE_ENV !== 'production';
const syncOptions = isDevelopment ? { force: true } : {}; // Sadece geliştirme ortamında
database_1.default
    .sync(syncOptions)
    .then(() => {
    if (isDevelopment && syncOptions.force) {
        console.log('Veritabanı tabloları sıfırlandı ve yeniden oluşturuldu');
    }
    app.listen(PORT, () => {
        console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
})
    .catch((err) => {
    console.error('Veritabanı bağlantısı veya sync hatası:', err);
    process.exit(1);
});
