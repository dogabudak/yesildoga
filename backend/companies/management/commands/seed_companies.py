"""
Django management command to seed company data.
Usage: python manage.py seed_companies [--file path/to/data.json] [--clear]
"""

import json
import os
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from companies.models import Company, DataVersion


class Command(BaseCommand):
    help = 'Seed company sustainability data from JSON file'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            help='Path to JSON data file (default: ../data/data.json)',
            default='../data/data.json'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before seeding',
        )
        parser.add_argument(
            '--batch-size',
            type=int,
            default=1000,
            help='Number of records to process at once (default: 1000)'
        )
        parser.add_argument(
            '--update-existing',
            action='store_true', 
            help='Update existing companies instead of skipping them',
        )
    
    def handle(self, *args, **options):
        file_path = options['file']
        clear_data = options['clear']
        batch_size = options['batch_size']
        update_existing = options['update_existing']
        
        # Resolve file path relative to manage.py location
        if not os.path.isabs(file_path):
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
            file_path = os.path.join(base_dir, file_path)
        
        self.stdout.write(f"Looking for data file at: {file_path}")
        
        if not os.path.exists(file_path):
            raise CommandError(f'Data file does not exist: {file_path}')
        
        # Clear existing data if requested
        if clear_data:
            self.stdout.write(self.style.WARNING('Clearing existing company data...'))
            Company.objects.all().delete()
            DataVersion.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Existing data cleared.'))
        
        # Load and parse JSON data
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, list):
                raise CommandError('JSON data must be a list of company objects')
                
        except json.JSONDecodeError as e:
            raise CommandError(f'Invalid JSON file: {e}')
        except Exception as e:
            raise CommandError(f'Error reading file: {e}')
        
        self.stdout.write(f"Loaded {len(data)} companies from JSON file")
        
        # Process data in batches
        created_count = 0
        updated_count = 0
        skipped_count = 0
        error_count = 0
        
        with transaction.atomic():
            companies_to_create = []
            
            for i, company_data in enumerate(data):
                try:
                    # Validate required fields
                    if 'domain' not in company_data or 'company' not in company_data:
                        self.stdout.write(
                            self.style.ERROR(f'Skipping record {i+1}: missing required fields')
                        )
                        error_count += 1
                        continue
                    
                    domain = company_data['domain'].strip()
                    company_name = company_data['company'].strip()
                    
                    if not domain or not company_name:
                        self.stdout.write(
                            self.style.ERROR(f'Skipping record {i+1}: empty required fields')
                        )
                        error_count += 1
                        continue
                    
                    # Check if company exists
                    existing_company = Company.objects.filter(domain__iexact=domain).first()
                    
                    if existing_company:
                        if update_existing:
                            # Update existing company
                            existing_company.company = company_name
                            existing_company.carbon_neutral = company_data.get('carbon_neutral', False)
                            existing_company.renewable_share_percent = company_data.get('renewable_share_percent')
                            existing_company.parent = company_data.get('parent')
                            existing_company.headquarters = company_data.get('headquarters')
                            existing_company.sector = company_data.get('sector')
                            existing_company.esg_policy = company_data.get('esg_policy')
                            existing_company.save()
                            updated_count += 1
                        else:
                            skipped_count += 1
                        continue
                    
                    # Prepare new company for batch creation
                    company = Company(
                        domain=domain,
                        company=company_name,
                        carbon_neutral=company_data.get('carbon_neutral', False),
                        renewable_share_percent=company_data.get('renewable_share_percent'),
                        parent=company_data.get('parent'),
                        headquarters=company_data.get('headquarters'),
                        sector=company_data.get('sector'),
                        esg_policy=company_data.get('esg_policy')
                    )
                    companies_to_create.append(company)
                    
                    # Batch create when we reach batch_size
                    if len(companies_to_create) >= batch_size:
                        Company.objects.bulk_create(companies_to_create, ignore_conflicts=True)
                        created_count += len(companies_to_create)
                        companies_to_create = []
                        
                        self.stdout.write(f"Processed {i+1}/{len(data)} records...")
                
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'Error processing record {i+1}: {e}')
                    )
                    error_count += 1
                    continue
            
            # Create remaining companies
            if companies_to_create:
                Company.objects.bulk_create(companies_to_create, ignore_conflicts=True)
                created_count += len(companies_to_create)
        
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
        self.stdout.write("\n" + "="*50)
        self.stdout.write(self.style.SUCCESS("SEEDING COMPLETE"))
        self.stdout.write("="*50)
        self.stdout.write(f"Created: {created_count} companies")
        self.stdout.write(f"Updated: {updated_count} companies") 
        self.stdout.write(f"Skipped: {skipped_count} companies")
        self.stdout.write(f"Errors: {error_count} records")
        self.stdout.write(f"Total in database: {Company.objects.count()} companies")
        
        if version_created:
            self.stdout.write(self.style.SUCCESS("Created data version 1.0.0"))
        else:
            self.stdout.write(self.style.SUCCESS("Updated data version statistics"))
        
        # Show some stats
        carbon_neutral = Company.objects.filter(carbon_neutral=True).count()
        with_renewable = Company.objects.filter(renewable_share_percent__isnull=False).count()
        
        self.stdout.write(f"Carbon neutral companies: {carbon_neutral}")
        self.stdout.write(f"Companies with renewable data: {with_renewable}")
        
        if error_count > 0:
            self.stdout.write(
                self.style.WARNING(f"Completed with {error_count} errors. Check output above for details.")
            )