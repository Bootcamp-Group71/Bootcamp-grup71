from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .config import settings

# MongoDB client
client: AsyncIOMotorClient = None


async def get_database() -> AsyncIOMotorClient:
    """Get MongoDB database client."""
    return client[settings.DATABASE_NAME]


async def connect_to_mongo():
    """Connect to MongoDB."""
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Initialize Beanie with models
    from app.models.user import User
    from app.models.course import Course, Module, Scenario
    from app.models.progress import UserProgress, UserScenarioAttempt, UserAchievement
    
    await init_beanie(
        database=client[settings.DATABASE_NAME],
        document_models=[
            User, Course, Module, Scenario,
            UserProgress, UserScenarioAttempt, UserAchievement
        ]
    )


async def close_mongo_connection():
    """Close MongoDB connection."""
    if client:
        client.close() 