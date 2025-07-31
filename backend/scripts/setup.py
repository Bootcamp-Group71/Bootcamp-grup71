#!/usr/bin/env python3
"""
Setup script for ResQ API Backend
This script helps with initial configuration and setup
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def create_env_file():
    """Create .env file from template"""
    env_example = Path("env.example")
    env_file = Path(".env")
    
    if env_file.exists():
        print("⚠️  .env file already exists")
        return True
    
    if not env_example.exists():
        print("❌ env.example file not found")
        return False
    
    print("📝 Creating .env file...")
    try:
        with open(env_example, 'r') as f:
            content = f.read()
        
        with open(env_file, 'w') as f:
            f.write(content)
        
        print("✅ .env file created successfully")
        print("⚠️  Please update the .env file with your actual configuration")
        return True
    except Exception as e:
        print(f"❌ Failed to create .env file: {e}")
        return False

def install_dependencies():
    """Install Python dependencies"""
    return run_command("pip install -r requirements.txt", "Installing dependencies")

def init_alembic():
    """Initialize Alembic for database migrations"""
    if not Path("alembic").exists():
        return run_command("alembic init alembic", "Initializing Alembic")
    else:
        print("✅ Alembic already initialized")
        return True

def create_initial_migration():
    """Create initial database migration"""
    return run_command("alembic revision --autogenerate -m 'Initial migration'", "Creating initial migration")

def run_migrations():
    """Run database migrations"""
    return run_command("alembic upgrade head", "Running database migrations")

def main():
    """Main setup function"""
    print("🚀 ResQ API Backend Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not Path("requirements.txt").exists():
        print("❌ Please run this script from the backend directory")
        sys.exit(1)
    
    steps = [
        ("Creating .env file", create_env_file),
        ("Installing dependencies", install_dependencies),
        ("Initializing Alembic", init_alembic),
        ("Creating initial migration", create_initial_migration),
        ("Running migrations", run_migrations),
    ]
    
    failed_steps = []
    
    for step_name, step_func in steps:
        print(f"\n📋 Step: {step_name}")
        if not step_func():
            failed_steps.append(step_name)
    
    print("\n" + "=" * 40)
    if failed_steps:
        print("❌ Setup completed with errors:")
        for step in failed_steps:
            print(f"   - {step}")
        print("\nPlease fix the errors and run the setup again.")
        sys.exit(1)
    else:
        print("✅ Setup completed successfully!")
        print("\nNext steps:")
        print("1. Update your .env file with actual configuration")
        print("2. Start the server: uvicorn app.main:app --reload")
        print("3. Visit http://localhost:8000/docs for API documentation")

if __name__ == "__main__":
    main() 