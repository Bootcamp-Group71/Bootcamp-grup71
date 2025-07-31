from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
from typing import Optional


class UserProgress(Base):
    """User progress tracking for courses and modules."""
    
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=True)
    progress_percentage = Column(Float, default=0.0)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="progress")
    course = relationship("Course")
    module = relationship("Module")
    
    def __repr__(self):
        return f"<UserProgress(user_id={self.user_id}, course_id={self.course_id}, progress={self.progress_percentage}%)>"


class UserScenarioAttempt(Base):
    """User attempts for scenarios with scores and answers."""
    
    __tablename__ = "user_scenario_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scenario_id = Column(Integer, ForeignKey("scenarios.id"), nullable=False)
    score = Column(Float, nullable=True)
    max_score = Column(Float, nullable=True)
    answers = Column(Text, nullable=True)  # JSON answers
    time_taken = Column(Integer, nullable=True)  # in seconds
    is_correct = Column(Boolean, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="scenario_attempts")
    scenario = relationship("Scenario", back_populates="attempts")
    
    def __repr__(self):
        return f"<UserScenarioAttempt(user_id={self.user_id}, scenario_id={self.scenario_id}, score={self.score})>"


class UserAchievement(Base):
    """User achievements and badges."""
    
    __tablename__ = "user_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    achievement_type = Column(String(50), nullable=False)  # badge, certificate, milestone
    achievement_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    earned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="achievements")
    
    def __repr__(self):
        return f"<UserAchievement(user_id={self.user_id}, achievement='{self.achievement_name}')>" 