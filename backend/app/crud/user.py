from typing import Optional, List
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password
from datetime import datetime


class UserCRUD:
    """CRUD operations for User model using Beanie."""
    
    async def get(self, user_id: str) -> Optional[User]:
        """Get user by ID."""
        return await User.get(user_id)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        return await User.find_one(User.email == email)
    
    async def get_by_username(self, username: str) -> Optional[User]:
        """Get user by username."""
        return await User.find_one(User.username == username)
    
    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[User]:
        """Get multiple users with pagination."""
        return await User.find_all().skip(skip).limit(limit).to_list()
    
    async def create(self, obj_in: UserCreate) -> User:
        """Create a new user."""
        hashed_password = get_password_hash(obj_in.password)
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            hashed_password=hashed_password,
            full_name=obj_in.full_name
        )
        return await db_obj.insert()
    
    async def update(self, db_obj: User, obj_in: UserUpdate) -> User:
        """Update user information."""
        update_data = obj_in.dict(exclude_unset=True)
        
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db_obj.updated_at = datetime.utcnow()
        await db_obj.save()
        return db_obj
    
    async def delete(self, user_id: str) -> bool:
        """Delete a user."""
        user = await User.get(user_id)
        if user:
            await user.delete()
            return True
        return False
    
    async def authenticate(self, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password."""
        user = await self.get_by_email(email=email)
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