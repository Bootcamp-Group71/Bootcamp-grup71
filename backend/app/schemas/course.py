from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CourseBase(BaseModel):
    """Base course schema with common fields."""
    title: str
    description: Optional[str] = None
    difficulty_level: str
    estimated_duration: Optional[int] = None


class CourseCreate(CourseBase):
    """Schema for creating a new course."""
    pass


class CourseUpdate(BaseModel):
    """Schema for updating course information."""
    title: Optional[str] = None
    description: Optional[str] = None
    difficulty_level: Optional[str] = None
    estimated_duration: Optional[int] = None
    is_active: Optional[bool] = None


class Course(CourseBase):
    """Schema for course response."""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ModuleBase(BaseModel):
    """Base module schema with common fields."""
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    order_index: int


class ModuleCreate(ModuleBase):
    """Schema for creating a new module."""
    course_id: int


class ModuleUpdate(BaseModel):
    """Schema for updating module information."""
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    order_index: Optional[int] = None
    is_active: Optional[bool] = None


class Module(ModuleBase):
    """Schema for module response."""
    id: int
    course_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class CourseWithModules(Course):
    """Schema for course with its modules."""
    modules: List[Module] = []


class ScenarioBase(BaseModel):
    """Base scenario schema with common fields."""
    title: str
    description: Optional[str] = None
    scenario_type: str
    content: str


class ScenarioCreate(ScenarioBase):
    """Schema for creating a new scenario."""
    module_id: int


class ScenarioUpdate(BaseModel):
    """Schema for updating scenario information."""
    title: Optional[str] = None
    description: Optional[str] = None
    scenario_type: Optional[str] = None
    content: Optional[str] = None
    is_active: Optional[bool] = None


class Scenario(ScenarioBase):
    """Schema for scenario response."""
    id: int
    module_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ModuleWithScenarios(Module):
    """Schema for module with its scenarios."""
    scenarios: List[Scenario] = [] 