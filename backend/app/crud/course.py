from typing import Optional, List
from app.models.course import Course, Module, Scenario
from app.schemas.course import CourseCreate, CourseUpdate, ModuleCreate, ModuleUpdate, ScenarioCreate, ScenarioUpdate

class CourseCRUD:
    """CRUD operations for Course model using Beanie."""
    async def get(self, course_id: str) -> Optional[Course]:
        return await Course.get(course_id)

    async def get_multi(self, skip: int = 0, limit: int = 100, active_only: bool = True) -> List[Course]:
        query = Course.find()
        if active_only:
            query = query.find(Course.is_active == True)
        return await query.skip(skip).limit(limit).to_list()

    async def create(self, obj_in: CourseCreate) -> Course:
        db_obj = Course(**obj_in.dict())
        return await db_obj.insert()

    async def update(self, db_obj: Course, obj_in: CourseUpdate) -> Course:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        await db_obj.save()
        return db_obj

    async def delete(self, course_id: str) -> bool:
        obj = await Course.get(course_id)
        if obj:
            await obj.delete()
            return True
        return False

class ModuleCRUD:
    """CRUD operations for Module model using Beanie."""
    async def get(self, module_id: str) -> Optional[Module]:
        return await Module.get(module_id)

    async def get_by_course(self, course_id: str, skip: int = 0, limit: int = 100) -> List[Module]:
        return await Module.find(Module.course_id == course_id, Module.is_active == True).sort("order_index").skip(skip).limit(limit).to_list()

    async def create(self, obj_in: ModuleCreate) -> Module:
        db_obj = Module(**obj_in.dict())
        return await db_obj.insert()

    async def update(self, db_obj: Module, obj_in: ModuleUpdate) -> Module:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        await db_obj.save()
        return db_obj

    async def delete(self, module_id: str) -> bool:
        obj = await Module.get(module_id)
        if obj:
            await obj.delete()
            return True
        return False

class ScenarioCRUD:
    """CRUD operations for Scenario model using Beanie."""
    async def get(self, scenario_id: str) -> Optional[Scenario]:
        return await Scenario.get(scenario_id)

    async def get_by_module(self, module_id: str, skip: int = 0, limit: int = 100) -> List[Scenario]:
        return await Scenario.find(Scenario.module_id == module_id, Scenario.is_active == True).skip(skip).limit(limit).to_list()

    async def create(self, obj_in: ScenarioCreate) -> Scenario:
        db_obj = Scenario(**obj_in.dict())
        return await db_obj.insert()

    async def update(self, db_obj: Scenario, obj_in: ScenarioUpdate) -> Scenario:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        await db_obj.save()
        return db_obj

    async def delete(self, scenario_id: str) -> bool:
        obj = await Scenario.get(scenario_id)
        if obj:
            await obj.delete()
            return True
        return False

# Create instances
course_crud = CourseCRUD()
module_crud = ModuleCRUD()
scenario_crud = ScenarioCRUD() 