# ResQ Backend API

ResQ - İlk yardım eğitimi platformu için SOLID ve Clean Code prensiplerine uygun backend API.

## 🏗️ Mimari

Bu backend aşağıdaki prensiplere uygun olarak tasarlanmıştır:

### SOLID Prensipleri

- **Single Responsibility Principle (SRP)**: Her sınıf tek bir sorumluluğa sahip
- **Open/Closed Principle (OCP)**: Genişletmeye açık, değiştirmeye kapalı
- **Liskov Substitution Principle (LSP)**: Alt sınıflar üst sınıfların yerine geçebilir
- **Interface Segregation Principle (ISP)**: Küçük ve özel arayüzler
- **Dependency Inversion Principle (DIP)**: Soyutlamalara bağımlılık

### Clean Code Prensipleri

- Anlamlı isimlendirme
- Küçük fonksiyonlar
- Tek sorumluluk
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

## 🚀 Teknolojiler

- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy
- **Veritabanı**: PostgreSQL
- **Authentication**: JWT
- **Documentation**: OpenAPI/Swagger
- **Testing**: Pytest
- **Validation**: Pydantic

## 📁 Proje Yapısı

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py              # Dependencies
│   │   └── v1/
│   │       ├── api.py           # API router
│   │       └── endpoints/       # Endpoint'ler
│   ├── core/
│   │   ├── config.py            # Konfigürasyon
│   │   ├── database.py          # Veritabanı bağlantısı
│   │   └── security.py          # Güvenlik işlemleri
│   ├── crud/                    # CRUD operasyonları
│   ├── models/                  # Veritabanı modelleri
│   └── schemas/                 # Pydantic şemaları
├── alembic/                     # Veritabanı migrasyonları
├── tests/                       # Test dosyaları
├── requirements.txt             # Python bağımlılıkları
└── main.py                     # Ana uygulama
```

## 🛠️ Kurulum

### 1. Gereksinimler

- Python 3.8+
- PostgreSQL
- Redis (opsiyonel)

### 2. Sanal Ortam Oluşturma

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate     # Windows
```

### 3. Bağımlılıkları Yükleme

```bash
pip install -r requirements.txt
```

### 4. Environment Variables

```bash
cp env.example .env
# .env dosyasını düzenleyin
```

### 5. Veritabanı Kurulumu

```bash
# PostgreSQL'de veritabanı oluşturun
createdb resq_db

# Migrasyonları çalıştırın
alembic upgrade head
```

### 6. Uygulamayı Çalıştırma

```bash
uvicorn app.main:app --reload
```

## 📚 API Dokümantasyonu

Uygulama çalıştıktan sonra:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Authentication

API JWT tabanlı authentication kullanır:

1. **Kayıt**: `POST /api/v1/auth/register`
2. **Giriş**: `POST /api/v1/auth/login`
3. **Kullanıcı Bilgileri**: `GET /api/v1/auth/me`

## 📊 Veritabanı Modelleri

### User

- Kullanıcı bilgileri ve authentication

### Course

- İlk yardım kursları

### Module

- Kurs içindeki modüller

### Scenario

- Etkileşimli senaryolar

### UserProgress

- Kullanıcı ilerleme takibi

### UserAchievement

- Kullanıcı başarıları ve rozetler

## 🧪 Test

```bash
# Tüm testleri çalıştır
pytest

# Coverage ile test
pytest --cov=app

# Belirli test dosyası
pytest tests/test_auth.py
```

## 🔧 Geliştirme

### Yeni Endpoint Ekleme

1. `app/api/v1/endpoints/` altında yeni dosya oluştur
2. `app/api/v1/api.py`'de router'ı ekle
3. Test yaz

### Yeni Model Ekleme

1. `app/models/` altında model oluştur
2. `app/schemas/` altında şema oluştur
3. `app/crud/` altında CRUD işlemleri oluştur
4. Migrasyon oluştur: `alembic revision --autogenerate -m "Add new model"`

## 📝 Migrasyonlar

```bash
# Yeni migrasyon oluştur
alembic revision --autogenerate -m "Description"

# Migrasyonları uygula
alembic upgrade head

# Migrasyon geçmişini görüntüle
alembic history
```

## 🚀 Production Deployment

1. Environment variables'ları production değerleriyle güncelleyin
2. `DEBUG=false` yapın
3. Güçlü bir `SECRET_KEY` kullanın
4. PostgreSQL production ayarlarını yapın
5. Reverse proxy (nginx) kullanın
6. SSL sertifikası ekleyin

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
