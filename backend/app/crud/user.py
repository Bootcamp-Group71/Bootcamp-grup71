from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password
from datetime import datetime


class UserCRUD:
    """CRUD operations for User model using SQLAlchemy."""
    
    async def get(self, db: AsyncSession, user_id: int) -> Optional[User]:
        """Get user by ID."""
        result = await db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()
    
    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        """Get user by email."""
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    
    async def get_by_username(self, db: AsyncSession, username: str) -> Optional[User]:
        """Get user by username."""
        result = await db.execute(select(User).where(User.username == username))
        return result.scalar_one_or_none()
    
    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
        """Get multiple users with pagination."""
        result = await db.execute(select(User).offset(skip).limit(limit))
        return result.scalars().all()
    
    async def create(self, db: AsyncSession, obj_in: UserCreate) -> User:
        """Create a new user."""
        hashed_password = get_password_hash(obj_in.password)
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            hashed_password=hashed_password,
            full_name=obj_in.full_name,
            is_active=True,
            is_superuser=False
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
    
    async def update(self, db: AsyncSession, db_obj: User, obj_in: UserUpdate) -> User:
        """Update user information."""
        update_data = obj_in.dict(exclude_unset=True)
        
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db_obj.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
    
    async def delete(self, db: AsyncSession, user_id: int) -> bool:
        """Delete a user."""
        user = await self.get(db, user_id)
        if user:
            await db.delete(user)
            await db.commit()
            return True
        return False
    
    async def authenticate(self, db: AsyncSession, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password."""
        user = await self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    def is_active(self, user: User) -> bool:
        """Check if user is active."""
        return user.is_active
    
    def is_superuser(self, user: User) -> bool:
        """Check if user is superuser."""
        return user.is_superuser


# Create instance
user_crud = UserCRUD() 