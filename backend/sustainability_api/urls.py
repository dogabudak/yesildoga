"""
URL configuration for sustainability_api project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.utils import timezone

def health_check(request):
    """Health check endpoint similar to the Node.js version."""
    from companies.models import Company
    
    try:
        company_count = Company.objects.count()
        return JsonResponse({
            'status': 'ok',
            'timestamp': timezone.now().isoformat(),
            'recordCount': company_count,
            'service': 'sustainability-api-django'
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'timestamp': timezone.now().isoformat(),
            'error': str(e),
            'service': 'sustainability-api-django'
        }, status=500)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health', health_check, name='health'),
    path('api/', include('companies.urls')),
]