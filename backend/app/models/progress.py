from beanie import Document
from datetime import datetime
from typing import Optional


class UserProgress(Document):
    """User progress tracking for courses and modules."""
    
    user_id: str
    course_id: str
    module_id: Optional[str] = None
    progress_percentage: float = 0.0
    is_completed: bool = False
    completed_at: Optional[datetime] = None
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "user_progress"
    
    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_id_here",
                "course_id": "course_id_here",
                "progress_percentage": 75.0,
                "is_completed": False
            }
        }
    
    def __repr__(self):
        return f"<UserProgress(user_id={self.user_id}, course_id={self.course_id}, progress={self.progress_percentage}%)>"


class UserScenarioAttempt(Document):
    """User attempts for scenarios with scores and answers."""
    
    user_id: str
    scenario_id: str
    score: Optional[float] = None
    max_score: Optional[float] = None
    answers: Optional[str] = None  # JSON answers
    time_taken: Optional[int] = None  # in seconds
    is_correct: Optional[bool] = None
    created_at: datetime = datetime.utcnow()
    
    class Settings:
        name = "user_scenario_attempts"
    
    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_id_here",
                "scenario_id": "scenario_id_here",
                "score": 85.0,
                "max_score": 100.0,
                "time_taken": 120
            }
        }
    
    def __repr__(self):
        return f"<UserScenarioAttempt(user_id={self.user_id}, scenario_id={self.scenario_id}, score={self.score})>"


class UserAchievement(Document):
    """User achievements and badges."""
    
    user_id: str
    achievement_type: str  # badge, certificate, milestone
    achievement_name: str
    description: Optional[str] = None
    earned_at: datetime = datetime.utcnow()
    
    class Settings:
        name = "user_achievements"
    
    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_id_here",
                "achievement_type": "badge",
                "achievement_name": "CPR Ustası",
                "description": "CPR modülünü başarıyla tamamladı"
            }
        }
    
    def __repr__(self):
        return f"<UserAchievement(user_id={self.user_id}, achievement='{self.achievement_name}')>" 