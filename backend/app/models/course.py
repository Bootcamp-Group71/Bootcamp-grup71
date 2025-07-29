from beanie import Document
from datetime import datetime
from typing import Optional, List
from pydantic import Field


class Course(Document):
    """Course model for first aid training courses."""
    
    title: str
    description: Optional[str] = None
    difficulty_level: str  # beginner, intermediate, advanced
    estimated_duration: Optional[int] = None  # in minutes
    is_active: bool = True
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "courses"
    
    class Config:
        schema_extra = {
            "example": {
                "title": "Temel İlk Yardım",
                "description": "Temel ilk yardım teknikleri",
                "difficulty_level": "beginner",
                "estimated_duration": 120
            }
        }
    
    def __repr__(self):
        return f"<Course(id={self.id}, title='{self.title}')>"


class Module(Document):
    """Module model for individual learning modules within courses."""
    
    course_id: str
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    order_index: int
    is_active: bool = True
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "modules"
    
    class Config:
        schema_extra = {
            "example": {
                "course_id": "course_id_here",
                "title": "CPR Teknikleri",
                "description": "Kardiyopulmoner resüsitasyon",
                "order_index": 1
            }
        }
    
    def __repr__(self):
        return f"<Module(id={self.id}, title='{self.title}', course_id={self.course_id})>"


class Scenario(Document):
    """Scenario model for interactive emergency scenarios."""
    
    module_id: str
    title: str
    description: Optional[str] = None
    scenario_type: str  # multiple_choice, drag_drop, sequence
    content: str  # JSON content
    is_active: bool = True
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "scenarios"
    
    class Config:
        schema_extra = {
            "example": {
                "module_id": "module_id_here",
                "title": "Kalp Krizi Senaryosu",
                "scenario_type": "multiple_choice",
                "content": '{"question": "Kalp krizi belirtileri nelerdir?", "options": [...]}'
            }
        }
    
    def __repr__(self):
        return f"<Scenario(id={self.id}, title='{self.title}', module_id={self.module_id})>" 