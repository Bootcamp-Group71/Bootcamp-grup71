-- ResQ Database Schema for Supabase
-- This file contains the SQL schema for all tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_superuser BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(50) NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration INTEGER, -- in minutes
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules table
CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenarios table
CREATE TABLE IF NOT EXISTS scenarios (
    id SERIAL PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scenario_type VARCHAR(50) NOT NULL CHECK (scenario_type IN ('multiple_choice', 'drag_drop', 'sequence')),
    content TEXT NOT NULL, -- JSON content
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    progress_percentage FLOAT DEFAULT 0.0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Scenario Attempts table
CREATE TABLE IF NOT EXISTS user_scenario_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scenario_id INTEGER NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    score FLOAT,
    max_score FLOAT,
    answers TEXT, -- JSON answers
    time_taken INTEGER, -- in seconds
    is_correct BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_type VARCHAR(50) NOT NULL CHECK (achievement_type IN ('badge', 'certificate', 'milestone')),
    achievement_name VARCHAR(255) NOT NULL,
    description TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_scenarios_module_id ON scenarios(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_user_scenario_attempts_user ON user_scenario_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scenario_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = email);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = email);

CREATE POLICY "Users can insert own data" ON users
    FOR INSERT WITH CHECK (auth.uid()::text = email);

-- RLS Policies for courses table (public read, admin write)
CREATE POLICY "Anyone can view active courses" ON courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage courses" ON courses
    FOR ALL USING (auth.uid()::text IN (
        SELECT email FROM users WHERE is_superuser = true
    ));

-- RLS Policies for modules table
CREATE POLICY "Anyone can view active modules" ON modules
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage modules" ON modules
    FOR ALL USING (auth.uid()::text IN (
        SELECT email FROM users WHERE is_superuser = true
    ));

-- RLS Policies for scenarios table
CREATE POLICY "Anyone can view active scenarios" ON scenarios
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage scenarios" ON scenarios
    FOR ALL USING (auth.uid()::text IN (
        SELECT email FROM users WHERE is_superuser = true
    ));

-- RLS Policies for user_progress table
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

-- RLS Policies for user_scenario_attempts table
CREATE POLICY "Users can view own attempts" ON user_scenario_attempts
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

CREATE POLICY "Users can insert own attempts" ON user_scenario_attempts
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

-- RLS Policies for user_achievements table
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

CREATE POLICY "Users can insert own achievements" ON user_achievements
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM users WHERE email = auth.uid()::text
    ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenarios_updated_at BEFORE UPDATE ON scenarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 