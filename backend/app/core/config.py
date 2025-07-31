from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings using Pydantic BaseSettings for type safety and validation."""
    
    # Application
    APP_NAME: str = "ResQ API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database - PostgreSQL
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/resq_db"
    
    # Supabase Configuration
    SUPABASE_URL: str = "https://qlblrexwpmqprrmfynum.supabase.co"
    SUPABASE_KEY: str = "your-supabase-anon-key"
    SUPABASE_SERVICE_KEY: str = "your-supabase-service-key"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    ALLOWED_ORIGINS: list = ["http://localhost:3000", "http://localhost:8081"]
    
    # File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings() 