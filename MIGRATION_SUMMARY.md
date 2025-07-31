# MongoDB'den PostgreSQL ve Supabase'e Geçiş / Migration from MongoDB to PostgreSQL and Supabase

## Özet / Summary

Bu dokümantasyon, ResQ projesinin MongoDB'den PostgreSQL ve Supabase'e geçiş sürecini detaylandırır.

## Yapılan Değişiklikler / Changes Made

### Backend Değişiklikleri / Backend Changes

#### 1. Dependencies Güncellemesi / Dependencies Update

- **Eski**: `motor`, `beanie` (MongoDB ODM)
- **Yeni**: `sqlalchemy[asyncio]`, `asyncpg`, `supabase`

#### 2. Veritabanı Konfigürasyonu / Database Configuration

**Eski (MongoDB):**

```python
# app/core/config.py
MONGODB_URL: str = "mongodb://localhost:27017"
DATABASE_NAME: str = "resq_db"
```

**Yeni (PostgreSQL + Supabase):**

```python
# app/core/config.py
DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/resq_db"
SUPABASE_URL: str = "https://your-project.supabase.co"
SUPABASE_KEY: str = "your-supabase-anon-key"
SUPABASE_SERVICE_KEY: str = "your-supabase-service-key"
```

#### 3. Veritabanı Bağlantısı / Database Connection

**Eski (MongoDB):**

```python
# app/core/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

client: AsyncIOMotorClient = None

async def connect_to_mongo():
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    await init_beanie(database=client[settings.DATABASE_NAME], document_models=[...])
```

**Yeni (PostgreSQL):**

```python
# app/core/database.py
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
```

#### 4. Model Değişiklikleri / Model Changes

**Eski (Beanie ODM):**

```python
# app/models/user.py
from beanie import Document

class User(Document):
    email: EmailStr
    username: str
    hashed_password: str
    # ...

    class Settings:
        name = "users"
```

**Yeni (SQLAlchemy):**

```python
# app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    # ...
```

#### 5. Migration Sistemi / Migration System

- **Alembic** konfigürasyonu eklendi
- İlk migration dosyası oluşturuldu
- Database schema otomatik oluşturma

### Frontend Değişiklikleri / Frontend Changes

#### 1. Supabase Client Eklendi

```typescript
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      // React Native için özel storage implementasyonu
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

#### 2. TypeScript Tipleri / TypeScript Types

- Database tipleri eklendi
- Supabase client için type safety

## Kurulum Adımları / Setup Steps

### 1. PostgreSQL Kurulumu / PostgreSQL Setup

```bash
# PostgreSQL kurulumu
sudo apt-get install postgresql postgresql-contrib  # Ubuntu/Debian
brew install postgresql  # macOS

# Veritabanı oluşturma
createdb resq_db
```

### 2. Supabase Kurulumu / Supabase Setup

1. [Supabase](https://supabase.com) hesabı oluştur
2. Yeni proje oluştur
3. API keys'i al
4. Environment variables'ları ayarla

### 3. Backend Kurulumu / Backend Setup

```bash
cd backend
python scripts/setup.py
```

### 4. Frontend Kurulumu / Frontend Setup

```bash
cd frontend
npm install
```

## Environment Variables / Environment Variables

### Backend (.env)

```env
# Database - PostgreSQL
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/resq_db

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (app.config.js)

```javascript
export default {
  expo: {
    extra: {
      supabaseUrl: "https://your-project.supabase.co",
      supabaseAnonKey: "your-supabase-anon-key",
    },
  },
};
```

## Avantajlar / Advantages

### PostgreSQL Avantajları

- **ACID Compliance**: Veri bütünlüğü garantisi
- **Complex Queries**: Karmaşık sorgular için daha iyi performans
- **Relationships**: Foreign key relationships
- **Transactions**: ACID transaction desteği
- **Scalability**: Büyük ölçekli uygulamalar için uygun

### Supabase Avantajları

- **Real-time**: Gerçek zamanlı veri değişiklikleri
- **Authentication**: Built-in auth sistemi
- **Row Level Security**: Güvenlik seviyesi
- **API**: Otomatik REST API
- **Dashboard**: Web tabanlı yönetim paneli

## Migration Stratejisi / Migration Strategy

### 1. Veri Migrasyonu / Data Migration

```python
# MongoDB'den PostgreSQL'e veri aktarımı
async def migrate_data():
    # MongoDB'den veri çek
    mongo_users = await mongo_client.users.find().to_list(length=None)

    # PostgreSQL'e aktar
    for user_data in mongo_users:
        user = User(
            email=user_data['email'],
            username=user_data['username'],
            # ...
        )
        db.add(user)

    await db.commit()
```

### 2. API Endpoint Güncellemeleri / API Endpoint Updates

- CRUD operasyonları SQLAlchemy'ye uyarlandı
- Database session dependency eklendi
- Error handling güncellendi

### 3. Test Güncellemeleri / Test Updates

- Test database PostgreSQL kullanacak
- Mock data SQLAlchemy modellerine uyarlandı

## Performans Karşılaştırması / Performance Comparison

| Özellik / Feature     | MongoDB | PostgreSQL + Supabase |
| --------------------- | ------- | --------------------- |
| **Read Performance**  | Hızlı   | Çok Hızlı             |
| **Write Performance** | Hızlı   | Hızlı                 |
| **Complex Queries**   | Orta    | Çok Hızlı             |
| **Relationships**     | Manual  | Native                |
| **Transactions**      | Limited | Full ACID             |
| **Real-time**         | Manual  | Built-in              |

## Güvenlik Güncellemeleri / Security Updates

### 1. Row Level Security (RLS)

```sql
-- Supabase RLS policies
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### 2. Authentication

- Supabase Auth entegrasyonu
- JWT token yönetimi
- Session management

## Monitoring ve Logging / Monitoring and Logging

### 1. Database Monitoring

- PostgreSQL query performance
- Connection pooling
- Slow query detection

### 2. Application Logging

- Structured logging
- Error tracking
- Performance metrics

## Sonraki Adımlar / Next Steps

1. **Veri Migrasyonu**: Mevcut MongoDB verilerini PostgreSQL'e aktar
2. **Test Coverage**: Tüm endpoint'leri test et
3. **Performance Testing**: Load testing yap
4. **Documentation**: API dokümantasyonunu güncelle
5. **Deployment**: Production environment'ı hazırla

## Sorun Giderme / Troubleshooting

### Yaygın Sorunlar / Common Issues

1. **Connection Pool Exhaustion**

   ```python
   # app/core/database.py
   engine = create_async_engine(
       settings.DATABASE_URL,
       pool_size=20,
       max_overflow=30,
       pool_pre_ping=True
   )
   ```

2. **Migration Conflicts**

   ```bash
   # Migration'ları sıfırla
   alembic downgrade base
   alembic upgrade head
   ```

3. **Supabase Connection Issues**
   ```typescript
   // lib/supabase.ts
   const supabase = createClient(url, key, {
     auth: {
       autoRefreshToken: true,
       persistSession: true,
     },
   });
   ```

## Kaynaklar / Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
