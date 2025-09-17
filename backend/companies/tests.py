from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Company, DataVersion


class CompanyModelTest(TestCase):
    """Test cases for Company model."""
    
    def setUp(self):
        self.company = Company.objects.create(
            domain='test.com',
            company='Test Company',
            carbon_neutral=True,
            renewable_share_percent=75.5,
            sector='Technology'
        )
    
    def test_string_representation(self):
        """Test string representation of Company model."""
        expected = "Test Company (test.com)"
        self.assertEqual(str(self.company), expected)
    
    def test_get_normalized_domain(self):
        """Test domain normalization."""
        # Test normal domain
        self.assertEqual(self.company.get_normalized_domain(), 'test.com')
        
        # Test www domain
        www_company = Company.objects.create(
            domain='www.example.com',
            company='Example Corp'
        )
        self.assertEqual(www_company.get_normalized_domain(), 'example.com')
    
    def test_find_by_domain(self):
        """Test flexible domain matching."""
        # Exact match
        found = Company.find_by_domain('test.com')
        self.assertEqual(found, self.company)
        
        # Case insensitive
        found = Company.find_by_domain('TEST.COM')
        self.assertEqual(found, self.company)
        
        # With www
        found = Company.find_by_domain('www.test.com')
        self.assertEqual(found, self.company)
        
        # Not found
        found = Company.find_by_domain('nonexistent.com')
        self.assertIsNone(found)
    
    def test_properties(self):
        """Test model properties."""
        self.assertTrue(self.company.is_carbon_neutral)
        self.assertTrue(self.company.has_renewable_data)
        
        no_renewable = Company.objects.create(
            domain='norene.com',
            company='No Renewable'
        )
        self.assertFalse(no_renewable.has_renewable_data)


class CompanyAPITest(APITestCase):
    """Test cases for Company API endpoints."""
    
    def setUp(self):
        Company.objects.create(
            domain='google.com',
            company='Google',
            carbon_neutral=True,
            renewable_share_percent=85.5,
            sector='Technology'
        )
        Company.objects.create(
            domain='microsoft.com', 
            company='Microsoft',
            carbon_neutral=True,
            renewable_share_percent=78.2,
            sector='Technology'
        )
    
    def test_company_list(self):
        """Test GET /api/companies/"""
        url = reverse('companies:company-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
    
    def test_company_search_by_domain(self):
        """Test GET /api/companies/search?domain=google.com"""
        url = reverse('companies:company-search')
        response = self.client.get(url, {'domain': 'google.com'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['domain'], 'google.com')
    
    def test_company_search_by_name(self):
        """Test GET /api/companies/search?company=Microsoft"""
        url = reverse('companies:company-search')
        response = self.client.get(url, {'company': 'Microsoft'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['company'], 'Microsoft')
    
    def test_company_by_domain(self):
        """Test GET /api/companies/domain/google.com"""
        url = reverse('companies:company-by-domain', kwargs={'domain': 'google.com'})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['domain'], 'google.com')
        self.assertEqual(response.data['company'], 'Google')
    
    def test_company_by_domain_not_found(self):
        """Test GET /api/companies/domain/nonexistent.com"""
        url = reverse('companies:company-by-domain', kwargs={'domain': 'nonexistent.com'})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_data_version(self):
        """Test GET /api/data/version"""
        url = reverse('companies:data-version')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('version', response.data)
        self.assertIn('recordCount', response.data)
        self.assertEqual(response.data['recordCount'], 2)


class DataVersionModelTest(TestCase):
    """Test cases for DataVersion model."""
    
    def setUp(self):
        # Create some test companies
        Company.objects.create(
            domain='test1.com',
            company='Test Company 1',
            carbon_neutral=True,
            renewable_share_percent=75.0
        )
        Company.objects.create(
            domain='test2.com', 
            company='Test Company 2',
            carbon_neutral=False
        )
    
    def test_update_counts(self):
        """Test updating statistics counts."""
        version = DataVersion.objects.create(version='test-1.0')
        version.update_counts()
        
        self.assertEqual(version.total_companies, 2)
        self.assertEqual(version.carbon_neutral_count, 1)
        self.assertEqual(version.renewable_data_count, 1)
    
    def test_get_current_version(self):
        """Test getting current version."""
        DataVersion.objects.create(version='1.0.0')
        DataVersion.objects.create(version='2.0.0')
        
        current = DataVersion.get_current_version()
        self.assertEqual(current.version, '2.0.0')  # Most recent