# Migration Guide: Node.js to Django Backend

This guide explains how to migrate from the TypeScript/Node.js backend to the new Django backend while maintaining full compatibility.

## Migration Overview

The Django backend is a **drop-in replacement** for the Node.js backend service. It maintains:
- ✅ **Same API endpoints** (`/health`, `/api/companies`, etc.)
- ✅ **Same response formats** (JSON structure matches exactly)
- ✅ **Same functionality** (search, domain lookup, pagination)
- ✅ **Same port** (8082) for seamless integration

## Quick Migration Steps

### 1. Install and Setup Django Backend

```bash
# Navigate to django-backend directory
cd django-backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run automated setup
python setup.py

# OR manual setup:
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py create_sample_data
```

### 2. Import Existing Data

If you have existing company data in JSON format:

```bash
# Migrate data from existing JSON file
python manage.py seed_companies --file ../data/data.json

# Or clear existing data and import fresh
python manage.py seed_companies --file ../data/data.json --clear
```

### 3. Start Django Server

```bash
# Start on the same port as Node.js backend
python manage.py runserver 8082
```

### 4. Update Chrome Extension (Optional)

The Django backend works with the existing Chrome extension without changes. If needed, verify the config:

```javascript
// config.js - should already be correct
const API_BASE_URL = 'http://localhost:8082';
```

### 5. Stop Node.js Backend

Once Django is running and verified:

```bash
# Stop the Node.js backend service
# (Django backend will handle all requests)
```

## API Endpoint Mapping

| Node.js Endpoint | Django Endpoint | Status |
|------------------|-----------------|---------|
| `GET /health` | `GET /health` | ✅ Same |
| `GET /api/companies` | `GET /api/companies/` | ✅ Same |
| `GET /api/companies/search` | `GET /api/companies/search` | ✅ Same |  
| `GET /api/companies/domain/:domain` | `GET /api/companies/domain/{domain}` | ✅ Same |
| `GET /api/data/version` | `GET /api/data/version` | ✅ Same |

## Enhanced Features in Django

### 🎉 **Django Admin Interface**
```bash
# Create admin user
python manage.py createsuperuser

# Access admin at: http://localhost:8082/admin/
```

**Admin Features:**
- **Company Management** - Add, edit, delete companies
- **Bulk Operations** - Mark multiple companies as carbon neutral
- **Data Statistics** - View sustainability metrics
- **Search & Filter** - Find companies by domain, sector, etc.
- **Data Export** - Export company data in various formats

### 🎉 **Advanced Data Management**

```bash
# Create sample test data
python manage.py create_sample_data --count 100

# Import from JSON with options
python manage.py seed_companies --file data.json --update-existing

# Load predefined fixtures  
python manage.py loaddata sample_companies

# Refresh data statistics
curl -X POST http://localhost:8082/api/data/refresh
```

### 🎉 **Database & Migrations**

```bash
# Create new migrations after model changes
python manage.py makemigrations

# Apply database migrations
python manage.py migrate

# View migration history
python manage.py showmigrations
```

## Verification Steps

### 1. Test Health Endpoint
```bash
curl http://localhost:8082/health
# Should return: {"status":"ok","timestamp":"...","recordCount":N}
```

### 2. Test Company Endpoints
```bash
# List companies
curl "http://localhost:8082/api/companies/"

# Search by domain
curl "http://localhost:8082/api/companies/search?domain=google.com"

# Get by domain  
curl "http://localhost:8082/api/companies/domain/google.com"

# Get data version
curl "http://localhost:8082/api/data/version"
```

### 3. Test Chrome Extension
1. Ensure Django backend is running on port 8082
2. Load Chrome extension
3. Visit a website with company data
4. Verify sustainability popup appears
5. Check extension popup shows correct data

## Troubleshooting

### Common Issues

**1. Django Not Found**
```bash
# Install Django in virtual environment
pip install -r requirements.txt
```

**2. Database Errors**
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py create_sample_data
```

**3. No Data in API**
```bash
# Check if companies exist
python manage.py shell
>>> from companies.models import Company
>>> Company.objects.count()

# Import sample data
python manage.py create_sample_data --count 50
```

**4. Chrome Extension Not Working**
- Verify Django server running on correct port (8082)
- Check browser console for CORS errors
- Ensure `CORS_ALLOW_ALL_ORIGINS=True` in Django settings

**5. Admin Interface Issues**
```bash
# Create superuser account
python manage.py createsuperuser

# Collect static files (if needed)
python manage.py collectstatic
```

## Rollback Plan

If you need to rollback to Node.js backend:

1. **Stop Django backend**
2. **Start Node.js backend**: `cd backend-service && npm start`  
3. **Verify health**: `curl http://localhost:8082/health`
4. **Test Chrome extension** functionality

## Performance Notes

### Django vs Node.js
- **Django**: More robust, better admin tools, ORM queries
- **Node.js**: Lighter weight, faster startup, file-based data
- **API Performance**: Similar for typical usage patterns
- **Memory Usage**: Django slightly higher due to Python/ORM

### Optimization Recommendations
- **Enable caching** in production (Redis/Memcached)
- **Use PostgreSQL** instead of SQLite for production
- **Configure Gunicorn** with multiple workers
- **Set up proper logging** and monitoring

## Production Deployment

For production deployment:

```bash
# Production settings
DEBUG=False
SECRET_KEY=your-secure-secret-key
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgres://user:pass@host:5432/db

# Run with Gunicorn
gunicorn sustainability_api.wsgi:application --bind 0.0.0.0:8082 --workers 4
```

## Support

### Getting Help
- **Django Documentation**: https://docs.djangoproject.com/
- **Django REST Framework**: https://www.django-rest-framework.org/
- **Project README**: See `README.md` for detailed documentation
- **Test Files**: Check `companies/tests.py` for usage examples

### Development Workflow
1. **Make changes** to models, views, or admin
2. **Create migrations**: `python manage.py makemigrations`
3. **Apply migrations**: `python manage.py migrate`  
4. **Run tests**: `python manage.py test`
5. **Test API endpoints** manually
6. **Update fixtures/sample data** if needed

## Summary

The Django backend provides a **seamless migration path** from Node.js while adding powerful new features:

- ✅ **Zero downtime migration** (same API endpoints)
- ✅ **Enhanced data management** (Django admin)  
- ✅ **Better development tools** (migrations, ORM, testing)
- ✅ **Production-ready features** (authentication, rate limiting)
- ✅ **Extensibility** (easy to add new features)

The Chrome extension will work **immediately** with the Django backend without any changes required.