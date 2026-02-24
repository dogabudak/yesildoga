from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from .models import Company, DataVersion, CompanyRequest
from .serializers import (
    CompanySerializer, 
    CompanyListSerializer, 
    CompanySearchSerializer,
    DataVersionSerializer
)


class CompanyPagination(LimitOffsetPagination):
    """
    Custom pagination to match Node.js backend behavior.
    """
    default_limit = 50
    max_limit = 1000


@method_decorator(cache_page(60 * 60), name='dispatch')  # Cache for 1 hour
class CompanyListView(generics.ListAPIView):
    """
    GET /api/companies
    List all companies with pagination.
    Matches Node.js backend: GET /api/companies?limit=50&offset=0
    """
    queryset = Company.objects.all()
    serializer_class = CompanyListSerializer
    pagination_class = CompanyPagination
    
    def get_queryset(self):
        """Optimize query with select_related if needed."""
        return Company.objects.all().order_by('company')


@method_decorator(cache_page(60 * 15), name='dispatch')  # Cache for 15 minutes 
class CompanySearchView(generics.ListAPIView):
    """
    GET /api/companies/search
    Search companies by domain or company name.
    Matches Node.js backend: GET /api/companies/search?domain=google.com&company=Google
    """
    serializer_class = CompanySearchSerializer
    pagination_class = CompanyPagination
    
    def get_queryset(self):
        """
        Filter companies based on query parameters.
        Supports both 'domain' and 'company' search parameters.
        """
        queryset = Company.objects.none()
        
        domain = self.request.query_params.get('domain', '').strip()
        company_name = self.request.query_params.get('company', '').strip()
        
        if not domain and not company_name:
            return queryset
            
        # Build search query
        search_q = Q()
        
        if domain:
            # Flexible domain matching (case insensitive, with/without www)
            normalized_domain = domain.lower()
            if normalized_domain.startswith('www.'):
                normalized_domain = normalized_domain[4:]
                
            search_q |= Q(domain__icontains=normalized_domain)
            search_q |= Q(domain__icontains=f"www.{normalized_domain}")
            
        if company_name:
            # Case insensitive company name search
            search_q |= Q(company__icontains=company_name)
            
        return Company.objects.filter(search_q).order_by('company')


@method_decorator(cache_page(60 * 60), name='dispatch')  # Cache for 1 hour
class CompanyByDomainView(generics.RetrieveAPIView):
    """
    GET /api/companies/domain/:domain
    Get specific company by domain with flexible matching.
    Matches Node.js backend: GET /api/companies/domain/google.com
    """
    serializer_class = CompanySerializer
    lookup_field = 'domain'
    
    def get_object(self):
        """
        Get company by domain with flexible matching logic.
        Mimics the Node.js backend domain matching.
        Records the request if company is not found.
        """
        domain = self.kwargs.get('domain', '').strip()

        if not domain:
            raise Http404("Domain parameter is required")

        company = Company.find_by_domain(domain)

        if not company:
            # Record this request for tracking purposes
            CompanyRequest.record_request(domain)
            raise Http404(f"Company not found for domain: {domain}")

        return company


@api_view(['GET'])
@cache_page(60 * 60 * 24)  # Cache for 24 hours
def data_version_view(request):
    """
    GET /api/data/version
    Get data version and statistics.
    Matches Node.js backend: GET /api/data/version
    """
    try:
        # Get or create current version
        version, created = DataVersion.objects.get_or_create(
            version='1.0.0',  # Default version
            defaults={
                'total_companies': 0,
                'carbon_neutral_count': 0,
                'renewable_data_count': 0,
                'public_companies_count': 0,
            }
        )
        
        # Update counts if version was just created or is stale
        if created or not version.last_updated:
            version.update_counts()
        
        serializer = DataVersionSerializer(version)
        
        # Format response to match Node.js backend structure
        data = serializer.data
        response_data = {
            'version': data['version'],
            'recordCount': data['total_companies'],
            'carbonNeutralCompanies': data['carbon_neutral_count'],
            'renewableDataCount': data['renewable_data_count'], 
            'publicCompanies': data['public_companies_count'],
            'lastUpdated': data['last_updated'],
        }
        
        return Response(response_data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to get data version: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def refresh_data_version(request):
    """
    POST /api/data/refresh
    Refresh data version statistics (admin operation).
    """
    try:
        version = DataVersion.get_current_version()
        if not version:
            version = DataVersion.objects.create(version='1.0.0')
            
        version.update_counts()
        
        serializer = DataVersionSerializer(version)
        return Response({
            'message': 'Data version refreshed successfully',
            'data': serializer.data
        })
        
    except Exception as e:
        return Response(
            {'error': f'Failed to refresh data version: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )