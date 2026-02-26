from django.urls import path
from . import views

app_name = 'companies'

urlpatterns = [
    # Company endpoints (matching Node.js backend structure)
    path('companies/', views.CompanyListView.as_view(), name='company-list'),
    path('companies/search', views.CompanySearchView.as_view(), name='company-search'),
    path('companies/domain/<str:domain>', views.CompanyByDomainView.as_view(), name='company-by-domain'),
    path('companies/domain/<str:domain>/', views.CompanyByDomainView.as_view(), name='company-by-domain-slash'),
    
    # Data version endpoints  
    path('data/version', views.data_version_view, name='data-version'),
    path('data/refresh', views.refresh_data_version, name='data-refresh'),
]