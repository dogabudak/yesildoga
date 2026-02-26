"""
Django management command to seed company data.
Usage: python manage.py seed_companies [--file path/to/data.json] [--clear]
"""

import json
import os
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from companies.models import Company, DataVersion


class Command(BaseCommand):
    help = 'Seed company sustainability data from JSON file'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--directory',
            type=str,
            help='Path to directory containing JSON data files (default: data/sanitized)',
            default='data/sanitized'
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
        directory_path = options['directory']
        clear_data = options['clear']
        batch_size = options['batch_size']
        update_existing = options.get('update-existing', False)
        
        # Resolve directory path relative to manage.py location
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        if not os.path.isabs(directory_path):
            directory_path = os.path.join(base_dir, directory_path)
        
        self.stdout.write(f"Looking for data files in: {directory_path}")
        
        if not os.path.exists(directory_path):
            raise CommandError(f'Data directory does not exist: {directory_path}')
        
        # Clear existing data if requested
        if clear_data:
            self.stdout.write(self.style.WARNING('Clearing existing company data...'))
            Company.objects.all().delete()
            DataVersion.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Existing data cleared.'))
        
        json_files = [f for f in os.listdir(directory_path) if f.endswith('.json')]
        if not json_files:
            raise CommandError(f'No JSON files found in directory: {directory_path}')
            
        total_companies_in_files = 0
        all_company_data = []
        
        for json_file in json_files:
            file_path = os.path.join(directory_path, json_file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                if not isinstance(data, list):
                    self.stdout.write(self.style.ERROR(f'Skipping file {json_file}: JSON data must be a list of company objects'))
                    continue
                
                all_company_data.extend(data)
                total_companies_in_files += len(data)
                    
            except json.JSONDecodeError as e:
                self.stdout.write(self.style.ERROR(f'Invalid JSON file {json_file}: {e}'))
                continue
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error reading file {json_file}: {e}'))
                continue
        
        self.stdout.write(f"Loaded {total_companies_in_files} companies from {len(json_files)} JSON files")
        
        # Process data in batches
        created_count = 0
        updated_count = 0
        skipped_count = 0
        error_count = 0
        skipped_companies = []  # Track skipped companies for report
        
        with transaction.atomic():
            companies_to_create = []
            
            for i, company_data in enumerate(all_company_data):
                try:
                    # Validate required fields
                    if 'company' not in company_data or company_data['company'] is None:
                        self.stdout.write(
                            self.style.ERROR(f'Skipping record {i+1}: missing required field (company)')
                        )
                        error_count += 1
                        continue
                    
                    company_name = company_data['company'].strip()
                    
                    if not company_name:
                        self.stdout.write(
                            self.style.ERROR(f'Skipping record {i+1}: empty required field (company)')
                        )
                        error_count += 1
                        continue
                    
                    # Handle domains - can be a single domain string or comma-separated list
                    domain_input = company_data.get('domain', '')
                    domains_list = []
                    
                    if domain_input:
                        if isinstance(domain_input, str):
                            # Split by comma and clean up
                            domains_list = [d.strip() for d in domain_input.split(',') if d.strip()]
                        elif isinstance(domain_input, list):
                            domains_list = [d.strip() for d in domain_input if d.strip()]
                    
                    # Check if company exists - by any of the domains if available, otherwise by company name
                    existing_company = None
                    if domains_list:
                        for domain in domains_list:
                            existing_company = Company.find_by_domain(domain)
                            if existing_company:
                                break
                    else:
                        # If no domains, use company name for uniqueness check
                        existing_company = Company.objects.filter(company__iexact=company_name, domains=[]).first()
                    
                    # Prepare description - can be a dict with language keys or a string
                    description_data = company_data.get('description')
                    if isinstance(description_data, dict):
                        description_json = description_data
                    elif isinstance(description_data, str) and description_data:
                        description_json = {'en': description_data}
                    else:
                        description_json = None

                    # Prepare documents list
                    documents_data = company_data.get('documents', [])
                    if not isinstance(documents_data, list):
                        documents_data = []

                    # Parse dates
                    updated_date = None
                    processed_date = None

                    if company_data.get('updated_date'):
                        try:
                            updated_date = datetime.strptime(company_data['updated_date'], '%Y-%m-%d').date()
                        except (ValueError, TypeError):
                            pass

                    if company_data.get('processed_date'):
                        try:
                            processed_date = datetime.strptime(company_data['processed_date'], '%Y-%m-%d').date()
                        except (ValueError, TypeError):
                            pass

                    if existing_company:
                        if update_existing:
                            # Update existing company
                            existing_company.company = company_name
                            existing_company.carbon_neutral = company_data.get('carbon_neutral', False)
                            existing_company.renewable_share_percent = company_data.get('renewable_share_percent')
                            existing_company.parent = company_data.get('parent')
                            existing_company.headquarters = company_data.get('headquarters')
                            existing_company.origin = company_data.get('origin')
                            existing_company.sector = company_data.get('sector')
                            existing_company.description = description_json
                            existing_company.documents = documents_data
                            existing_company.data_updated_date = updated_date
                            existing_company.data_processed_date = processed_date
                            existing_company.is_approved = company_data.get('is_approved', False)
                            existing_company.save()
                            updated_count += 1
                        else:
                            skipped_count += 1
                            # Track skipped company for report
                            skipped_companies.append({
                                'company': company_name,
                                'domains': domains_list,
                                'reason': 'Already exists in database'
                            })
                        continue
                    
                    # Prepare new company for batch creation
                    company = Company(
                        domains=domains_list,
                        company=company_name,
                        carbon_neutral=company_data.get('carbon_neutral', False),
                        renewable_share_percent=company_data.get('renewable_share_percent'),
                        parent=company_data.get('parent'),
                        headquarters=company_data.get('headquarters'),
                        origin=company_data.get('origin'),
                        sector=company_data.get('sector'),
                        description=description_json,
                        documents=documents_data,
                        data_updated_date=updated_date,
                        data_processed_date=processed_date,
                        is_approved=company_data.get('is_approved', False)
                    )
                    companies_to_create.append(company)
                    
                    # Batch create when we reach batch_size
                    if len(companies_to_create) >= batch_size:
                        Company.objects.bulk_create(companies_to_create, ignore_conflicts=True)
                        created_count += len(companies_to_create)
                        companies_to_create = []
                        
                        self.stdout.write(f"Processed {i+1}/{total_companies_in_files} records...")
                
                except Exception as e:
                    company_name = company_data.get("company", "N/A")
                    domains_val = company_data.get("domain", "N/A")
                    self.stdout.write(
                        self.style.ERROR(f'Error processing record {i+1} (Company: {company_name}, Domains: {domains_val}): {e}')
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
        
        # Save skipped companies to JSON file
        if skipped_companies:
            skipped_file = os.path.join(base_dir, 'data', 'skipped_companies.json')
            with open(skipped_file, 'w', encoding='utf-8') as f:
                json.dump(skipped_companies, f, ensure_ascii=False, indent=2)
            self.stdout.write(f"\nSkipped companies report saved to: {skipped_file}")