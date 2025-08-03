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
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/resq_db"
    
    # Supabase Configuration - YORUMA ALINDI (Local çalışma için)
    # SUPABASE_URL: str = "https://qlblrexwpmqprrmfynum.supabase.co"
    # SUPABASE_KEY: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA"
    # SUPABASE_SERVICE_KEY: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk5MDU4NSwiZXhwIjoyMDY5NTY2NTg1fQ.aNoJ3Ji3rb0xkHBUKo8WivQStqko8Y3MteGbErZcxBw"
    
    # Local Supabase Configuration (boş bırakıldı)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    
    # Security
    SECRET_KEY: str = ""
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