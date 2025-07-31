# ResQ Projesi Kurulum Talimatları / ResQ Project Setup Instructions

## 🚀 Hızlı Başlangıç / Quick Start

### 1. Backend Kurulumu / Backend Setup

```bash
cd backend

# Environment dosyası oluştur
cp env.example .env

# Bağımlılıkları yükle
pip install -r requirements.txt

# Setup script'ini çalıştır
python scripts/setup.py
```

### 2. Supabase Database Schema Kurulumu / Supabase Database Schema Setup

1. **Supabase Dashboard > SQL Editor**'a gidin
2. **`backend/supabase_schema.sql`** dosyasının içeriğini kopyalayın
3. SQL Editor'da çalıştırın

### 3. Frontend Kurulumu / Frontend Setup

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Frontend zaten hazır - anon key otomatik eklendi
```

## 📋 Detaylı Kurulum / Detailed Setup

### Backend Environment Variables

`.env` dosyası zaten hazır! Tüm konfigürasyon otomatik olarak eklendi:

```env
# Application Settings
APP_NAME=ResQ API
APP_VERSION=1.0.0
DEBUG=true

# Database - PostgreSQL (Supabase)
DATABASE_URL=postgresql+asyncpg://postgres:7PugiQQ7H2IZi0bJ@db.qlblrexwpmqprrmfynum.supabase.co:5432/postgres

# Supabase Configuration
SUPABASE_URL=https://qlblrexwpmqprrmfynum.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk5MDU4NSwiZXhwIjoyMDY5NTY2NTg1fQ.aNoJ3Ji3rb0xkHBUKo8WivQStqko8Y3MteGbErZcxBw

# Security
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis
REDIS_URL=redis://localhost:6379

# CORS
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:8081"]

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

### Frontend Configuration

Frontend zaten hazır! `app.config.js` dosyası otomatik olarak güncellendi:

```javascript
export default {
  expo: {
    name: "ResQ App",
    slug: "resq-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      supabaseUrl: "https://qlblrexwpmqprrmfynum.supabase.co",
      supabaseAnonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA",
    },
  },
};
```

## 🔧 Supabase Database Bağlantısı / Supabase Database Connection

### Database Schema Kurulumu / Database Schema Setup

1. **Supabase Dashboard > SQL Editor**
2. **`backend/supabase_schema.sql`** dosyasının içeriğini kopyalayın
3. **Run** butonuna tıklayın

## 🧪 Test Etme / Testing

### Backend Test

```bash
cd backend

# Server'ı başlat
uvicorn app.main:app --reload

# API dokümantasyonunu kontrol et
# http://localhost:8000/docs
```

### Frontend Test

```bash
cd frontend

# Development server'ı başlat
npm start

# Expo Go ile test et
```

## 🔐 Güvenlik Ayarları / Security Settings

### Row Level Security (RLS)

Supabase'de RLS otomatik olarak etkinleştirildi. Kullanıcılar sadece kendi verilerini görebilir.

### API Keys Güvenliği

- **anon key**: Frontend'de kullanılır (public) ✅ **Hazır**
- **service key**: Backend'de kullanılır (private, güvenli tutun) ✅ **Hazır**

## 📊 Monitoring ve Logging / Monitoring and Logging

### Supabase Dashboard

- **Database**: Tablo yapısı ve veriler
- **Auth**: Kullanıcı yönetimi
- **API**: API kullanım istatistikleri
- **Logs**: Sistem logları

### Backend Logging

```python
# app/core/config.py
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

## 🚀 Production Deployment / Production Deployment

### Environment Variables

Production'da şu değişkenleri ayarlayın:

```env
DEBUG=false
SECRET_KEY=your-very-secure-secret-key
DATABASE_URL=postgresql+asyncpg://postgres:7PugiQQ7H2IZi0bJ@db.qlblrexwpmqprrmfynum.supabase.co:5432/postgres
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk5MDU4NSwiZXhwIjoyMDY5NTY2NTg1fQ.aNoJ3Ji3rb0xkHBUKo8WivQStqko8Y3MteGbErZcxBw
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔧 Sorun Giderme / Troubleshooting

### Yaygın Sorunlar / Common Issues

1. **Connection Error**

   ```bash
   # Database bağlantısını kontrol et
   python -c "from app.core.database import engine; print('Connection OK')"
   ```

2. **Migration Error**

   ```bash
   # Migration'ları sıfırla
   alembic downgrade base
   alembic upgrade head
   ```

3. **Supabase Auth Error**
   ```typescript
   // Frontend'de auth durumunu kontrol et
   const {
     data: { user },
   } = await supabase.auth.getUser();
   ```

### Log Kontrolü / Log Checking

```bash
# Backend logları
tail -f backend/logs/app.log

# Supabase logları
# Dashboard > Logs
```

## 📞 Destek / Support

Sorun yaşarsanız:

1. **Logları kontrol edin**
2. **Supabase Dashboard'u kontrol edin**
3. **API dokümantasyonunu kontrol edin**: http://localhost:8000/docs
4. **GitHub Issues** açın

## 🎯 Sonraki Adımlar / Next Steps

1. ✅ **Database Schema**: Supabase'de tabloları oluştur
2. ✅ **Frontend API Key**: Anon key eklendi
3. ✅ **Backend API Key**: Service key eklendi
4. ✅ **Database Password**: Backend için hazır
5. ✅ **Frontend Test**: React Native app hazır
6. ✅ **Backend Test**: Tüm konfigürasyon hazır
7. 🔄 **Data Migration**: Eski verileri aktar (varsa)
8. 🔄 **Performance Testing**: Load testing yap
9. 🔄 **Security Audit**: Güvenlik kontrolü yap

## 🎉 Kurulum Tamamlandı! / Setup Completed!

Tüm konfigürasyon hazır! Şimdi test edebilirsiniz:

```bash
# Backend test
cd backend
uvicorn app.main:app --reload

# Frontend test
cd frontend
npm start
```
