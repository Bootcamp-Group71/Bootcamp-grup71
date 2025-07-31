# ResQ API Backend

Bu proje PostgreSQL ve Supabase kullanarak geliştirilmiş bir ilk yardım eğitim platformu API'sidir.

## Teknolojiler / Technologies

- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Ana veritabanı
- **Supabase** - Backend as a Service
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **Redis** - Cache ve session storage
- **Celery** - Background tasks

## Kurulum / Setup

### 1. Gereksinimler / Prerequisites

- Python 3.8+
- PostgreSQL
- Redis
- Supabase hesabı

### 2. Sanal Ortam Oluşturma / Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate  # Windows
```

### 3. Bağımlılıkları Yükleme / Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Variables

`.env` dosyası oluşturun ve aşağıdaki değişkenleri ayarlayın:

```env
# Application Settings
APP_NAME=ResQ API
APP_VERSION=1.0.0
DEBUG=true

# Database - PostgreSQL
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/resq_db

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

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

### 5. PostgreSQL Veritabanı Kurulumu / PostgreSQL Database Setup

```sql
CREATE DATABASE resq_db;
CREATE USER resq_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE resq_db TO resq_user;
```

### 6. Supabase Kurulumu / Supabase Setup

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. Project Settings > API bölümünden URL ve API key'leri alın
4. `.env` dosyasına ekleyin

### 7. Database Migrations

```bash
# İlk migration'ı oluştur
alembic revision --autogenerate -m "Initial migration"

# Migration'ları çalıştır
alembic upgrade head
```

### 8. Uygulamayı Çalıştırma / Run Application

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Dokümantasyonu / API Documentation

Uygulama çalıştıktan sonra:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Veritabanı Modelleri / Database Models

### Users

- Kullanıcı kimlik doğrulama ve yönetimi
- Email, username, password
- Active/inactive durumu

### Courses

- İlk yardım eğitim kursları
- Başlık, açıklama, zorluk seviyesi
- Tahmini süre

### Modules

- Kursların içindeki öğrenme modülleri
- Sıralama indeksi
- İçerik ve açıklama

### Scenarios

- İnteraktif acil durum senaryoları
- Çoktan seçmeli, sürükle-bırak, sıralama
- JSON formatında içerik

### UserProgress

- Kullanıcı ilerleme takibi
- Tamamlanma yüzdesi
- Tamamlanma tarihi

### UserScenarioAttempt

- Senaryo denemeleri
- Skor ve cevaplar
- Geçen süre

### UserAchievement

- Kullanıcı başarıları ve rozetler
- Badge, sertifika, milestone

## Test / Testing

```bash
# Tüm testleri çalıştır
pytest

# Coverage ile test
pytest --cov=app

# Belirli test dosyası
pytest tests/test_auth.py
```

## Deployment / Deployment

### Docker ile / With Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables

Production'da aşağıdaki environment variable'ları ayarlayın:

- `DATABASE_URL`: PostgreSQL connection string
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_KEY`: Supabase anon key
- `SUPABASE_SERVICE_KEY`: Supabase service key
- `SECRET_KEY`: Güvenli secret key
- `REDIS_URL`: Redis connection string

## Katkıda Bulunma / Contributing

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans / License

Bu proje MIT lisansı altında lisanslanmıştır.
