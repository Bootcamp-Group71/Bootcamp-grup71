from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
import sqlite3
import os
from contextlib import contextmanager

app = FastAPI(title="resQ API", version="1.0.0")

# CORS middleware for Flutter app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "your-secret-key-here"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Database setup
DATABASE = "resq.db"

def init_db():
    """Initialize database with tables"""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        
        # Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            )
        ''')
        
        # Courses table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                duration_hours REAL,
                topic_count INTEGER,
                category TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # User progress table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                course_id INTEGER NOT NULL,
                progress REAL DEFAULT 0.0,
                points INTEGER DEFAULT 0,
                completed_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (course_id) REFERENCES courses (id)
            )
        ''')
        
        # Awards table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS awards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                icon TEXT,
                requirement_type TEXT,
                requirement_value INTEGER
            )
        ''')
        
        # User awards table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_awards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                award_id INTEGER NOT NULL,
                earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (award_id) REFERENCES awards (id)
            )
        ''')
        
        # Insert sample courses
        cursor.execute('''
            INSERT OR IGNORE INTO courses (id, title, description, duration_hours, topic_count, category)
            VALUES 
                (1, 'Acil Durum Müdahalesi', 'Acil durumlar için temel müdahale teknikleri', 2.0, 8, 'emergency'),
                (2, 'Temel Yaşam Desteği', 'Yaşam kurtarıcı temel beceriler', 1.5, 6, 'basic_life_support'),
                (3, 'İlk Yardım', 'Temel ilk yardım uygulamaları', 3.0, 10, 'first_aid'),
                (4, 'Yangın Güvenliği', 'Yangın durumlarında güvenlik önlemleri', 1.0, 5, 'fire_safety')
        ''')
        
        # Insert sample awards
        cursor.execute('''
            INSERT OR IGNORE INTO awards (id, title, description, icon, requirement_type, requirement_value)
            VALUES 
                (1, 'Ödüllerim', 'İlk ödülünüz', 'trophy', 'points', 100),
                (2, 'Çaylak Öğrenci', 'İlk kursu tamamladınız', 'school', 'courses_completed', 1),
                (3, 'Toplum Örnekleri', 'Topluma katkı sağladınız', 'group', 'points', 1000)
        ''')
        
        conn.commit()

# Initialize database on startup
init_db()

@contextmanager
def get_db():
    """Database connection context manager"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: str

class Token(BaseModel):
    access_token: str
    token_type: str

class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    duration_hours: Optional[float]
    topic_count: Optional[int]
    category: Optional[str]

class UserProgressResponse(BaseModel):
    course_id: int
    course_title: str
    progress: float
    points: int

class AwardResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    icon: Optional[str]
    earned: bool = False

# Authentication helpers
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if user is None:
            raise credentials_exception
        return dict(user)

# Auth endpoints
@app.post("/auth/register", response_model=Token)
async def register(user: UserCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user.password)
        cursor.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (user.email, hashed_password)
        )
        conn.commit()
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token)
async def login(user: UserLogin):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
        db_user = cursor.fetchone()
        
        if not db_user or not verify_password(user.password, db_user['password_hash']):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}

# User endpoints
@app.get("/user/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user['id'],
        email=current_user['email'],
        created_at=current_user['created_at']
    )

# Courses endpoints
@app.get("/courses", response_model=List[CourseResponse])
async def get_courses(current_user: dict = Depends(get_current_user)):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM courses")
        courses = cursor.fetchall()
        
        return [CourseResponse(**dict(course)) for course in courses]

@app.get("/user/progress", response_model=List[UserProgressResponse])
async def get_user_progress(current_user: dict = Depends(get_current_user)):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT up.course_id, c.title as course_title, up.progress, up.points
            FROM user_progress up
            JOIN courses c ON up.course_id = c.id
            WHERE up.user_id = ?
        """, (current_user['id'],))
        progress = cursor.fetchall()
        
        return [UserProgressResponse(**dict(p)) for p in progress]

@app.post("/user/progress/{course_id}")
async def update_progress(
    course_id: int,
    progress: float,
    current_user: dict = Depends(get_current_user)
):
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if progress record exists
        cursor.execute(
            "SELECT * FROM user_progress WHERE user_id = ? AND course_id = ?",
            (current_user['id'], course_id)
        )
        existing = cursor.fetchone()
        
        if existing:
            # Update existing progress
            cursor.execute("""
                UPDATE user_progress 
                SET progress = ?, points = points + ? 
                WHERE user_id = ? AND course_id = ?
            """, (progress, int(progress * 100), current_user['id'], course_id))
        else:
            # Create new progress record
            cursor.execute("""
                INSERT INTO user_progress (user_id, course_id, progress, points)
                VALUES (?, ?, ?, ?)
            """, (current_user['id'], course_id, progress, int(progress * 100)))
        
        conn.commit()
        
        # Check if course is completed and award points
        if progress >= 1.0:
            cursor.execute("""
                UPDATE user_progress 
                SET completed_at = CURRENT_TIMESTAMP 
                WHERE user_id = ? AND course_id = ? AND completed_at IS NULL
            """, (current_user['id'], course_id))
            conn.commit()
        
        return {"message": "Progress updated successfully"}

# Awards endpoints
@app.get("/awards", response_model=List[AwardResponse])
async def get_awards(current_user: dict = Depends(get_current_user)):
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Get all awards
        cursor.execute("SELECT * FROM awards")
        all_awards = cursor.fetchall()
        
        # Get user's earned awards
        cursor.execute("""
            SELECT award_id FROM user_awards WHERE user_id = ?
        """, (current_user['id'],))
        earned_awards = [row['award_id'] for row in cursor.fetchall()]
        
        result = []
        for award in all_awards:
            award_dict = dict(award)
            award_dict['earned'] = award['id'] in earned_awards
            result.append(AwardResponse(**award_dict))
        
        return result

@app.get("/user/stats")
async def get_user_stats(current_user: dict = Depends(get_current_user)):
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Get total points
        cursor.execute("""
            SELECT COALESCE(SUM(points), 0) as total_points
            FROM user_progress WHERE user_id = ?
        """, (current_user['id'],))
        total_points = cursor.fetchone()['total_points']
        
        # Get completed courses count
        cursor.execute("""
            SELECT COUNT(*) as completed_courses
            FROM user_progress 
            WHERE user_id = ? AND progress >= 1.0
        """, (current_user['id'],))
        completed_courses = cursor.fetchone()['completed_courses']
        
        # Get current level (basic calculation)
        level = min(int(total_points / 1000) + 1, 10)
        level_name = f"Seviye {level}: Teşhis Görmeme"
        
        return {
            "total_points": total_points,
            "completed_courses": completed_courses,
            "current_level": level,
            "level_name": level_name,
            "level_progress": (total_points % 1000) / 1000.0
        }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "resQ API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)