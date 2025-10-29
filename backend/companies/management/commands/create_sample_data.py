"""
Django management command to create sample company data for testing.
Usage: python manage.py create_sample_data [--count 100]
"""

from django.core.management.base import BaseCommand
from django.db import transaction
from companies.models import Company, DataVersion
import random


class Command(BaseCommand):
    help = 'Create sample company sustainability data for testing'
    
    SAMPLE_COMPANIES = [
        {'domain': 'google.com', 'company': 'Google', 'carbon_neutral': True, 'renewable': 85.5, 'sector': 'Technology', 'headquarters': 'Mountain View, CA'},
        {'domain': 'microsoft.com', 'company': 'Microsoft', 'carbon_neutral': True, 'renewable': 78.2, 'sector': 'Technology', 'headquarters': 'Redmond, WA'},
        {'domain': 'apple.com', 'company': 'Apple', 'carbon_neutral': True, 'renewable': 95.0, 'sector': 'Technology', 'headquarters': 'Cupertino, CA'},
        {'domain': 'amazon.com', 'company': 'Amazon', 'carbon_neutral': False, 'renewable': 42.1, 'sector': 'E-commerce', 'headquarters': 'Seattle, WA'},
        {'domain': 'facebook.com', 'company': 'Meta', 'carbon_neutral': True, 'renewable': 68.9, 'sector': 'Social Media', 'headquarters': 'Menlo Park, CA'},
        {'domain': 'tesla.com', 'company': 'Tesla', 'carbon_neutral': True, 'renewable': 89.3, 'sector': 'Automotive', 'headquarters': 'Austin, TX'},
        {'domain': 'netflix.com', 'company': 'Netflix', 'carbon_neutral': False, 'renewable': 35.7, 'sector': 'Entertainment', 'headquarters': 'Los Gatos, CA'},
        {'domain': 'uber.com', 'company': 'Uber', 'carbon_neutral': False, 'renewable': 28.4, 'sector': 'Transportation', 'headquarters': 'San Francisco, CA'},
        {'domain': 'airbnb.com', 'company': 'Airbnb', 'carbon_neutral': False, 'renewable': 45.6, 'sector': 'Travel', 'headquarters': 'San Francisco, CA'},
        {'domain': 'spotify.com', 'company': 'Spotify', 'carbon_neutral': False, 'renewable': 52.1, 'sector': 'Entertainment', 'headquarters': 'Stockholm, Sweden'},
        {'domain': 'shopify.com', 'company': 'Shopify', 'carbon_neutral': True, 'renewable': 71.8, 'sector': 'E-commerce', 'headquarters': 'Ottawa, Canada'},
        {'domain': 'salesforce.com', 'company': 'Salesforce', 'carbon_neutral': True, 'renewable': 83.2, 'sector': 'Software', 'headquarters': 'San Francisco, CA'},
        {'domain': 'ibm.com', 'company': 'IBM', 'carbon_neutral': False, 'renewable': 38.9, 'sector': 'Technology', 'headquarters': 'Armonk, NY'},
        {'domain': 'oracle.com', 'company': 'Oracle', 'carbon_neutral': False, 'renewable': 41.3, 'sector': 'Software', 'headquarters': 'Austin, TX'},
        {'domain': 'adobe.com', 'company': 'Adobe', 'carbon_neutral': True, 'renewable': 76.5, 'sector': 'Software', 'headquarters': 'San Jose, CA'},
    ]
    
    SECTORS = ['Technology', 'E-commerce', 'Software', 'Entertainment', 'Transportation', 'Travel', 'Automotive', 'Finance', 'Healthcare', 'Energy']
    LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA', 'Chicago, IL', 'Los Angeles, CA', 'Denver, CO', 'London, UK', 'Toronto, Canada']
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=50,
            help='Number of additional sample companies to create (default: 50)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before creating samples',
        )
    
    def handle(self, *args, **options):
        count = options['count']
        clear_data = options['clear']
        
        if clear_data:
            self.stdout.write(self.style.WARNING('Clearing existing data...'))
            Company.objects.all().delete()
            DataVersion.objects.all().delete()
        
        self.stdout.write(f"Creating sample company data...")
        
        created_count = 0
        
        with transaction.atomic():
            # Create predefined sample companies
            for sample in self.SAMPLE_COMPANIES:
                company, created = Company.objects.get_or_create(
                    domain=sample['domain'],
                    defaults={
                        'company': sample['company'],
                        'carbon_neutral': sample['carbon_neutral'],
                        'renewable_share_percent': sample['renewable'],
                        'sector': sample['sector'],
                        'headquarters': sample['headquarters'],
                        'esg_policy': f"Sample ESG policy for {sample['company']}. This company is committed to environmental sustainability and corporate responsibility."
                    }
                )
                if created:
                    created_count += 1
            
            # Generate additional random companies
            for i in range(count):
                domain = f"company{i+100}.com"
                company_name = f"Sample Company {i+100}"
                
                # Skip if already exists
                if Company.objects.filter(domain=domain).exists():
                    continue
                
                company = Company.objects.create(
                    domain=domain,
                    company=company_name,
                    carbon_neutral=random.choice([True, False]),
                    renewable_share_percent=round(random.uniform(0, 100), 1) if random.random() > 0.3 else None,
                    sector=random.choice(self.SECTORS),
                    headquarters=random.choice(self.LOCATIONS),
                    parent=f"Parent Corp {random.randint(1, 20)}" if random.random() > 0.7 else None,
                )
                created_count += 1
        
        # Create/update data version
        version, version_created = DataVersion.objects.get_or_create(
            version='1.0.0',
            defaults={
                'total_companies': 0,
                'carbon_neutral_count': 0,
                'renewable_data_count': 0,
                'public_companies_count': 0,
            }
        )
        version.update_counts()
        
        # Summary
        total_companies = Company.objects.count()
        carbon_neutral = Company.objects.filter(carbon_neutral=True).count()
        with_renewable = Company.objects.filter(renewable_share_percent__isnull=False).count()
        
        self.stdout.write("\n" + "="*50)
        self.stdout.write(self.style.SUCCESS("SAMPLE DATA CREATION COMPLETE"))
        self.stdout.write("="*50)
        self.stdout.write(f"Created: {created_count} new companies")
        self.stdout.write(f"Total companies in database: {total_companies}")
        self.stdout.write(f"Carbon neutral companies: {carbon_neutral}")
        self.stdout.write(f"Companies with renewable data: {with_renewable}")
        
        if version_created:
            self.stdout.write(self.style.SUCCESS("Created data version 1.0.0"))
        else:
            self.stdout.write(self.style.SUCCESS("Updated data version statistics"))
        
        self.stdout.write(self.style.SUCCESS("Sample data is ready for testing!"))