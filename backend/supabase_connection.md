# Supabase Database Connection Setup

## Database Password Alma / Getting Database Password

1. **Supabase Dashboard'a gidin**: https://supabase.com/dashboard
2. **Projenizi seçin**: `qlblrexwpmqprrmfynum`
3. **Settings > Database** bölümüne gidin
4. **Database password** bölümünden password'u kopyalayın

## Connection String Format

Supabase connection string formatı:

```
postgresql://postgres:[YOUR-PASSWORD]@db.qlblrexwpmqprrmfynum.supabase.co:5432/postgres
```

## Environment Variables Güncelleme

`.env` dosyasında `DATABASE_URL`'yi güncelleyin:

```env
DATABASE_URL=postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.qlblrexwpmqprrmfynum.supabase.co:5432/postgres
```

## Test Connection

Connection'ı test etmek için:

```bash
cd backend
python -c "from app.core.database import engine; print('Connection OK')"
```

## Database Schema Kurulumu

1. **Supabase Dashboard > SQL Editor**
2. **`backend/supabase_schema.sql`** dosyasının içeriğini kopyalayın
3. **Run** butonuna tıklayın

## Kurulum Adımları

1. Database password'unu alın
2. `.env` dosyasında `DATABASE_URL`'yi güncelleyin
3. `backend/supabase_schema.sql` dosyasını Supabase SQL Editor'da çalıştırın
4. Backend'i test edin: `uvicorn app.main:app --reload`
