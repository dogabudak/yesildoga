#!/usr/bin/env python
"""
Setup script for Django Sustainability API
Run this script to quickly set up the Django backend for development.
"""

import os
import sys
import subprocess
import django
from pathlib import Path

def run_command(command, description):
    """Run a shell command and handle errors."""
    print(f"\n🔄 {description}")
    print(f"Running: {command}")
    
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✅ {description} completed successfully")
        if result.stdout.strip():
            print(f"Output: {result.stdout.strip()}")
    else:
        print(f"❌ {description} failed")
        print(f"Error: {result.stderr.strip()}")
        return False
    return True

def setup_django_backend():
    """Set up Django backend from scratch."""
    print("🚀 Setting up Django Sustainability API Backend")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists('manage.py'):
        print("❌ Error: manage.py not found. Please run this script from the django-backend directory.")
        return False
    
    # Step 1: Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    # Step 2: Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        print("\n🔄 Creating .env file from .env.example")
        run_command("cp .env.example .env", "Creating environment file")
        print("📝 Please edit .env file with your specific settings")
    
    # Step 3: Run migrations
    if not run_command("python manage.py makemigrations", "Creating database migrations"):
        return False
    
    if not run_command("python manage.py migrate", "Applying database migrations"):
        return False
    
    # Step 4: Create sample data
    print("\n🔄 Creating sample data for testing")
    if not run_command("python manage.py create_sample_data --count 20", "Creating sample companies"):
        print("⚠️  Sample data creation failed, but this is not critical")
    
    # Step 5: Run tests
    print("\n🔄 Running tests to verify setup")
    if not run_command("python manage.py test --verbosity=2", "Running Django tests"):
        print("⚠️  Some tests failed, but basic setup should work")
    
    print("\n" + "=" * 50)
    print("🎉 Django backend setup completed!")
    print("=" * 50)
    
    print("\nNext steps:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Start the server: python manage.py runserver 8082")
    print("3. Visit the admin: http://localhost:8082/admin/")
    print("4. Check API health: http://localhost:8082/health")
    print("5. View API docs: http://localhost:8082/api/companies/")
    
    print("\nIf you have existing data:")
    print("- Load from JSON: python manage.py seed_companies --file ../data/data.json")
    print("- Load fixtures: python manage.py loaddata sample_companies")
    
    return True

if __name__ == "__main__":
    success = setup_django_backend()
    sys.exit(0 if success else 1)