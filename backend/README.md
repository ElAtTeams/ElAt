# Backend çalıştırma kılavuzu

## Docker ile çalıştırma (Önerilen)

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Docker containers'ı başlatın:
```bash
docker-compose up --build
```

Bu komut:
- PostgreSQL veritabanını ayağa kaldıracak
- Backend API'yi derleyip çalıştıracak
- API: http://localhost:4000
- Database: localhost:5432

## Manuel kurulum (alternatif)

1. Gerekli paketleri kurun:
```bash
npm install
```

2. .env dosyası oluşturun:
```bash
cp .env.example .env
```

3. Development modunda çalıştırın:
```bash
npm run dev
```

## API Endpoints

- POST /api/auth/register - Kullanıcı kaydı
- POST /api/auth/login - Kullanıcı girişi
- GET / - Health check

## Swagger Dokümantasyon
API dokümantasyonu için swagger.json dosyasını kullanabilirsiniz.