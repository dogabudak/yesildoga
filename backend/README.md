# Sustainability API - Django Backend

A Django REST API service that provides company sustainability data, migrated from the original Node.js backend while maintaining full compatibility.

## Overview

This Django backend replaces the TypeScript/Node.js backend service while maintaining the same API endpoints and functionality. It provides:

- **Company sustainability data** with carbon neutrality and renewable energy information  
- **RESTful API endpoints** matching the original Node.js structure
- **Flexible domain-based lookups** with normalized matching
- **Comprehensive Django admin interface** for data management
- **Built-in caching and rate limiting** for performance
- **Data seeding and management commands** for easy setup

## Quick Start

### 1. Setup Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your settings
```

### 2. Database Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Load sample data
python manage.py create_sample_data --count 50
# OR load from JSON file
python manage.py seed_companies --file ../data/data.json
```

### 3. Run Development Server

```bash
python manage.py runserver 8082
```

The API will be available at `http://localhost:8082`

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Company Data  
- **GET** `/api/companies/` - List all companies (paginated)
  - Query params: `limit`, `offset`
- **GET** `/api/companies/search` - Search companies
  - Query params: `domain`, `company`
- **GET** `/api/companies/domain/{domain}` - Get company by domain

### Data Information
- **GET** `/api/data/version` - Get data version and statistics
- **POST** `/api/data/refresh` - Refresh statistics (admin)

### Admin Interface
- **GET** `/admin/` - Django admin interface

## Data Management

### Seeding Data

#### From JSON File
```bash
# Seed from data file (matches Node.js backend structure)
python manage.py seed_companies --file ../data/data.json

# Clear existing data before seeding
python manage.py seed_companies --file ../data/data.json --clear

# Update existing companies instead of skipping
python manage.py seed_companies --file ../data/data.json --update-existing
```

#### Create Sample Data
```bash
# Create sample data for testing
python manage.py create_sample_data --count 100

# Clear existing data first
python manage.py create_sample_data --clear --count 50
```

#### Load from Fixtures  
```bash
# Load predefined sample data
python manage.py loaddata sample_companies
```

### Django Admin

Access the admin interface at `/admin/` to:
- **Manage companies** - Add, edit, delete company records
- **View statistics** - See sustainability metrics and data quality
- **Batch operations** - Mark companies as carbon neutral, clear data
- **Data versioning** - Manage data versions and statistics

## Models

### Company
```python
class Company(models.Model):
    domain = models.CharField(max_length=255, unique=True)    # Primary domain
    company = models.CharField(max_length=255)               # Company name  
    carbon_neutral = models.BooleanField(default=False)      # Carbon neutrality
    renewable_share_percent = models.FloatField(null=True)   # Renewable energy %
    parent = models.CharField(max_length=255, null=True)     # Parent company
    headquarters = models.CharField(max_length=255, null=True) # HQ location
    sector = models.CharField(max_length=100, null=True)     # Business sector
    esg_policy = models.TextField(null=True)                 # ESG information
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### DataVersion  
```python
class DataVersion(models.Model):
    version = models.CharField(max_length=50, unique=True)
    total_companies = models.PositiveIntegerField(default=0)
    carbon_neutral_count = models.PositiveIntegerField(default=0) 
    renewable_data_count = models.PositiveIntegerField(default=0)
    public_companies_count = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
```

## Configuration

### Environment Variables (.env)
```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS Settings
CORS_ALLOW_ALL_ORIGINS=True

# Rate Limiting  
RATE_LIMIT_MAX_REQUESTS=100/15min

# Caching
CACHE_TIMEOUT=86400

# Database (optional, uses SQLite by default)
DATABASE_URL=postgres://user:password@localhost:5432/sustainability_api
```

### Key Settings
- **Pagination**: Default 50 items per page, max 1000
- **Rate limiting**: 100 requests per 15 minutes
- **Caching**: 24-hour cache for data endpoints
- **CORS**: Configured for Chrome extension access

## Chrome Extension Integration

This Django backend is fully compatible with the Chrome extension and can be used as a drop-in replacement for the Node.js backend:

1. **Same API endpoints** - All original endpoints maintained
2. **Same response format** - JSON responses match Node.js structure  
3. **Same port configuration** - Runs on port 8082 by default
4. **Same domain matching** - Flexible domain lookup with www/non-www handling

### Update Extension Config
In your Chrome extension's `config.js`:
```javascript
const API_BASE_URL = 'http://localhost:8082';  // Django backend
```

## Testing

```bash
# Run all tests
python manage.py test

# Run specific test module
python manage.py test companies.tests

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## Production Deployment

### Using Gunicorn
```bash
# Install gunicorn (already in requirements.txt)
pip install gunicorn

# Run production server
gunicorn sustainability_api.wsgi:application --bind 0.0.0.0:8082
```

### Environment Setup
```bash
# Production settings
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-domain.com

# Use PostgreSQL for production
DATABASE_URL=postgres://user:password@localhost:5432/sustainability_api

# Configure CORS for production
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

## Migration from Node.js Backend

This Django backend provides:

### ✅ **Full Compatibility**
- Same API endpoints and response formats
- Same domain matching logic  
- Same caching behavior and rate limiting
- Same health check and data version endpoints

### ✅ **Enhanced Features**  
- **Django Admin Interface** for easy data management
- **Database migrations** for schema versioning
- **Management commands** for data seeding and maintenance
- **Built-in testing framework** with comprehensive test coverage
- **ORM-based queries** instead of file-based data access
- **Better error handling** and logging

### ✅ **Data Management**
- **Seeding from JSON** - Compatible with existing data files
- **Sample data generation** - Create test data easily
- **Batch operations** - Admin bulk actions for data management
- **Statistics tracking** - Automatic data version and metrics updates

## Development

### Adding New Features

1. **Create models** in `companies/models.py`
2. **Run migrations**: `python manage.py makemigrations && python manage.py migrate`  
3. **Add serializers** in `companies/serializers.py`
4. **Create views** in `companies/views.py`
5. **Configure URLs** in `companies/urls.py`
6. **Add admin interface** in `companies/admin.py`
7. **Write tests** in `companies/tests.py`

### Code Style
- Follow Django conventions and PEP 8
- Use Django's built-in features (ORM, admin, etc.)
- Implement proper error handling and logging
- Add comprehensive tests for new functionality

## Support

For issues and questions:
- Check Django documentation
- Review test files for usage examples  
- Use Django admin interface for data inspection
- Check server logs for debugging information