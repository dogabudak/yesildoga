# CLAUDE.md - Django Sustainability API Project Guide

## Project Overview

This is a **Django REST API** that provides company sustainability data, including carbon neutrality status, renewable energy usage, and ESG information. The backend serves as a replacement for a Node.js API while maintaining full API compatibility for integration with Chrome extensions and other clients.

### Key Features
- **Company Sustainability Database** with carbon neutral tracking
- **RESTful API endpoints** with pagination and search
- **Flexible domain matching** for company lookups
- **Django Admin Interface** for data management
- **Data seeding and management commands**
- **Chrome Extension compatibility**
- **ISO country origin tracking** (recently added)

## Project Structure

```
backend/
├── sustainability_api/        # Django project settings
│   ├── settings.py           # Main configuration
│   ├── urls.py              # Root URL configuration
│   ├── wsgi.py              # WSGI application
│   └── asgi.py              # ASGI application
├── companies/                # Main Django app
│   ├── models.py            # Company, DataVersion, CompanyAlternative models
│   ├── views.py             # API views and endpoints
│   ├── serializers.py       # DRF serializers
│   ├── admin.py             # Django admin configuration
│   ├── urls.py              # App URL patterns
│   ├── management/commands/ # Custom management commands
│   │   ├── seed_companies.py      # Seed data from JSON
│   │   └── create_sample_data.py  # Generate test data
│   ├── migrations/          # Database migrations
│   └── fixtures/            # Test data fixtures
├── data/                    # External data files
│   └── data.json           # Company data for seeding
├── requirements.txt         # Python dependencies
├── manage.py               # Django management script
└── README.md               # Project documentation
```

## Development Setup

### 1. Environment Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file (optional)
cp .env.example .env
```

### 2. Database Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin
python manage.py createsuperuser

# Load sample data
python manage.py seed_companies --file ../data/data.json
# OR create test data
python manage.py create_sample_data --count 100
```

### 3. Run Development Server
```bash
python manage.py runserver 8082
```

## Database Models

### Company Model
Located in `companies/models.py:6-146`

```python
class Company(models.Model):
    # Core information
    domain = models.CharField(max_length=255, unique=True)    # Primary domain
    company = models.CharField(max_length=255)               # Company name
    
    # Sustainability metrics
    carbon_neutral = models.BooleanField(default=False)      # Carbon neutrality
    renewable_share_percent = models.FloatField(null=True)   # Renewable energy %
    
    # Corporate details
    parent = models.CharField(max_length=255, null=True)     # Parent company
    headquarters = models.CharField(max_length=255, null=True) # HQ location
    origin = CountryField(null=True, blank=True)             # Country of origin (ISO)
    sector = models.CharField(max_length=100, null=True)     # Business sector
    esg_policy = models.TextField(null=True)                 # ESG information
    
    # Relationships
    carbon_neutral_alternatives = models.ManyToManyField('self') # Alternative companies
    
    # Tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**Key Features:**
- **Flexible domain matching** via `find_by_domain()` method
- **Normalized domain handling** (with/without www)
- **ISO country codes** for origin field using django-countries
- **Carbon neutral alternatives** through M2M relationship

### DataVersion Model
Located in `companies/models.py:148-205`

Tracks data statistics and versioning:
```python
class DataVersion(models.Model):
    version = models.CharField(max_length=50, unique=True)
    total_companies = models.PositiveIntegerField(default=0)
    carbon_neutral_count = models.PositiveIntegerField(default=0)
    renewable_data_count = models.PositiveIntegerField(default=0)
    public_companies_count = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
```

## API Endpoints

### Company Endpoints
- **GET** `/api/companies/` - List all companies (paginated)
  - Query params: `limit`, `offset`
  - Cached for 1 hour
  
- **GET** `/api/companies/search` - Search companies
  - Query params: `domain`, `company`
  - Flexible domain matching (case-insensitive, www handling)
  - Cached for 15 minutes
  
- **GET** `/api/companies/domain/{domain}` - Get company by domain
  - Uses intelligent domain matching
  - Returns 404 if not found
  - Cached for 1 hour

### Data Endpoints
- **GET** `/api/data/version` - Get data version and statistics
  - Returns version, record counts, last updated
  - Cached for 24 hours
  
- **POST** `/api/data/refresh` - Refresh statistics (admin)
  - Updates all counts in DataVersion model

### Health Check
- **GET** `/health` - Server health status

## Admin Interface

**Access:** `http://localhost:8082/admin/`

### Company Admin Features
Located in `companies/admin.py:34-160`

- **List View:** Shows company, domain, carbon status, renewable %, origin, etc.
- **Filters:** By carbon neutral, sector, origin country, renewable data
- **Search:** By company name, domain, parent, headquarters, sector
- **Batch Actions:**
  - Mark as carbon neutral/not carbon neutral
  - Clear renewable energy data
- **Inline Editing:** Carbon neutral alternatives
- **Visual Indicators:** Color-coded badges for carbon neutral status

### Admin Customizations
- **Carbon Neutral Badge** - Green ✓ or red ✗ indicators
- **Renewable Percentage** - Color-coded based on percentage
- **Country Origin** - Dropdown with ISO country codes (not free text)
- **Statistics Dashboard** - Company counts and sustainability metrics

## Data Management

### Seeding from JSON
```bash
# Seed from data file (compatible with Node.js backend structure)
python manage.py seed_companies --file ../data/data.json

# Clear existing data before seeding
python manage.py seed_companies --file ../data/data.json --clear

# Update existing companies instead of skipping
python manage.py seed_companies --file ../data/data.json --update-existing
```

**Command Features:**
- **Batch processing** with configurable batch size
- **Duplicate handling** - skip or update existing companies
- **Error handling** with detailed logging
- **Progress tracking** for large datasets
- **Automatic DataVersion updates**

### Sample Data Generation
```bash
# Create sample data for testing
python manage.py create_sample_data --count 100

# Clear existing data first
python manage.py create_sample_data --clear --count 50
```

### Load Fixtures
```bash
python manage.py loaddata sample_companies
```

## Testing

### Running Tests
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test companies

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### Test Coverage Areas
- Model methods and properties
- API endpoint responses
- Data seeding commands
- Admin interface functionality
- Domain matching logic

## Configuration

### Environment Variables (.env)
```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS Settings (for Chrome extension)
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOWED_ORIGINS=http://localhost:3000,chrome-extension://*

# Database (optional - uses SQLite by default)
DATABASE_URL=postgres://user:password@localhost:5432/sustainability_api
```

### Key Django Settings
Located in `sustainability_api/settings.py`

- **REST Framework:** Pagination (50 per page), JSON-only responses
- **CORS:** Configured for Chrome extension compatibility
- **Caching:** 1-24 hour caching on API endpoints
- **Logging:** Structured logging with configurable levels
- **Security:** CSRF protection, secure cookies in production

## Chrome Extension Integration

This Django backend is a **drop-in replacement** for the Node.js backend:

### API Compatibility
- ✅ Same endpoint URLs and structure
- ✅ Same JSON response format
- ✅ Same domain matching logic
- ✅ Same pagination and search parameters
- ✅ Same error handling and status codes

### Extension Configuration
Update your Chrome extension's API base URL:
```javascript
const API_BASE_URL = 'http://localhost:8082';  // Django backend
```

## Common Development Tasks

### Adding New Fields to Company Model
1. **Edit model:** `companies/models.py`
2. **Create migration:** `python manage.py makemigrations companies`
3. **Apply migration:** `python manage.py migrate`
4. **Update serializers:** `companies/serializers.py`
5. **Update admin:** `companies/admin.py` (add to list_display, fieldsets, etc.)

### Adding New API Endpoints
1. **Create view:** `companies/views.py`
2. **Add serializer:** `companies/serializers.py`
3. **Update URLs:** `companies/urls.py`
4. **Add tests:** `companies/tests.py`

### Database Operations
```bash
# Create migration for model changes
python manage.py makemigrations companies --name descriptive_name

# Apply migrations
python manage.py migrate

# Reset migrations (development only)
python manage.py migrate companies zero
rm companies/migrations/00*.py
python manage.py makemigrations companies

# Django shell for database queries
python manage.py shell
>>> from companies.models import Company
>>> Company.objects.filter(carbon_neutral=True).count()
```

## Production Deployment

### Using Gunicorn
```bash
# Install gunicorn (included in requirements.txt)
pip install gunicorn

# Run production server
gunicorn sustainability_api.wsgi:application --bind 0.0.0.0:8082
```

### Production Settings
```bash
# Environment variables for production
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgres://user:password@host:5432/db

# CORS for production
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

### PostgreSQL Setup
```bash
# Install PostgreSQL adapter
pip install psycopg2-binary

# Environment variable
DATABASE_URL=postgres://user:password@localhost:5432/sustainability_api
```

## Troubleshooting

### Common Issues

1. **Django import errors:**
   ```bash
   # Ensure virtual environment is activated
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Migration conflicts:**
   ```bash
   # Check migration status
   python manage.py showmigrations
   # Apply specific migration
   python manage.py migrate companies 0002
   ```

3. **Country field errors:**
   ```bash
   # Install missing dependencies
   pip install setuptools django-countries
   ```

4. **CORS errors in browser:**
   - Check `CORS_ALLOWED_ORIGINS` in settings
   - Verify Chrome extension permissions

### Debugging

1. **Django shell for testing:**
   ```bash
   python manage.py shell
   >>> from companies.models import Company
   >>> Company.find_by_domain('google.com')
   ```

2. **Check logs:**
   - Console output shows request/response details
   - Adjust `DJANGO_LOG_LEVEL` for more detail

3. **Admin interface:**
   - Use `/admin/` to inspect data and test queries
   - Check data quality and statistics

## Recent Changes

### Origin Field Addition
- **Added:** `origin` field to Company model using `CountryField`
- **Features:** ISO 3166-1 alpha-2 country codes, admin dropdown
- **Migration:** `companies/migrations/0003_add_origin_field.py`
- **Admin:** Added to list view, filters, and fieldsets

### Migration from Node.js
- **Full API compatibility** maintained
- **Enhanced admin interface** for data management
- **Improved domain matching** with Django ORM
- **Better error handling** and validation
- **Comprehensive data seeding** tools

## Performance Considerations

- **Database indexes** on frequently queried fields (domain, company, carbon_neutral, origin)
- **API caching** with varying durations based on data volatility
- **Batch operations** for data seeding and bulk updates
- **Query optimization** with select_related for related data
- **Pagination** limits to prevent large response payloads

## Code Quality

- **Django conventions** followed throughout
- **Comprehensive docstrings** in models and views
- **Type hints** where applicable
- **Error handling** with proper HTTP status codes
- **Security best practices** with CSRF protection and secure settings