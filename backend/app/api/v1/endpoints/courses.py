from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from app.crud.course import course_crud, module_crud, scenario_crud
from app.schemas.course import (
    Course, CourseCreate, CourseUpdate, CourseWithModules,
    Module, ModuleCreate, ModuleUpdate, ModuleWithScenarios,
    Scenario, ScenarioCreate, ScenarioUpdate
)
from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Course])
async def read_courses(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve courses.
    """
    courses = await course_crud.get_multi(skip=skip, limit=limit)
    return courses

@router.post("/", response_model=Course)
async def create_course(
    course_in: CourseCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new course.
    """
    course = await course_crud.create(obj_in=course_in)
    return course

@router.get("/{course_id}", response_model=CourseWithModules)
async def read_course(
    course_id: str,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get course by ID.
    """
    course = await course_crud.get(course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course

@router.put("/{course_id}", response_model=Course)
async def update_course(
    course_id: str,
    course_in: CourseUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Update course.
    """
    course = await course_crud.get(course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    course = await course_crud.update(db_obj=course, obj_in=course_in)
    return course

@router.delete("/{course_id}")
async def delete_course(
    course_id: str,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Delete course.
    """
    course = await course_crud.get(course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    await course_crud.delete(course_id=course_id)
    return {"message": "Course deleted successfully"}

# Module endpoints
@router.get("/{course_id}/modules", response_model=List[Module])
async def read_modules(
    course_id: str,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve modules for a course.
    """
    modules = await module_crud.get_by_course(course_id=course_id, skip=skip, limit=limit)
    return modules

@router.post("/{course_id}/modules", response_model=Module)
async def create_module(
    course_id: str,
    module_in: ModuleCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new module for a course.
    """
    module_in.course_id = course_id
    module = await module_crud.create(obj_in=module_in)
    return module

@router.get("/modules/{module_id}", response_model=ModuleWithScenarios)
async def read_module(
    module_id: str,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get module by ID.
    """
    module = await module_crud.get(module_id=module_id)
    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found"
        )
    return module

# Scenario endpoints
@router.get("/modules/{module_id}/scenarios", response_model=List[Scenario])
async def read_scenarios(
    module_id: str,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve scenarios for a module.
    """
    scenarios = await scenario_crud.get_by_module(module_id=module_id, skip=skip, limit=limit)
    return scenarios

@router.post("/modules/{module_id}/scenarios", response_model=Scenario)
async def create_scenario(
    module_id: str,
    scenario_in: ScenarioCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new scenario for a module.
    """
    scenario_in.module_id = module_id
    scenario = await scenario_crud.create(obj_in=scenario_in)
    return scenario 