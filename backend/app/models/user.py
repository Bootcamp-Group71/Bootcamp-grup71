from beanie import Document
from datetime import datetime
from typing import Optional
from pydantic import EmailStr


class User(Document):
    """User model for authentication and user management."""
    
    email: EmailStr
    username: str
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "users"
    
    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "username": "testuser",
                "full_name": "Test User",
                "is_active": True
            }
        }
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>" 