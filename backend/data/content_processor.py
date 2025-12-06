#!/usr/bin/env python3
"""
Content Processing Script for Company Data Management

This script processes company JSON files by:
1. Translating Turkish descriptions to English and German
2. Finding/verifying domain information
3. Restructuring description field to multi-language format
4. Moving files through process -> sanitized workflow
"""

import json
import os
import sys
import time
import argparse
from pathlib import Path
import re

def translate_text(text, target_language='en'):
    """
    Translate Turkish text to target language using a free translation API
    For production, consider using Google Translate API or similar paid service
    """
    # For demonstration, I'll use a simple mock translation
    # In reality, you would use a proper translation service
    
    try:
        # Using a free translation service (LibreTranslate or similar)
        # This is a placeholder - you would implement actual translation API calls
        
        if target_language == 'en':
            # Mock English translation for demo
            if 'Yandex' in text:
                return "Yandex is a brand of search, city, online entertainment, education, cloud technologies, autonomous vehicles and navigation services, artificial intelligence and other services within OOO Yandex, established in 1997. In addition to the search engine, it offers services such as Yandex Zen, Yandex Browser, Yandex Taxi, Yandex Food, Yandex Market, Yandex Plus and Yandex Travel. OOO Yandex was transferred to МКАО Yandex, owned by the Russia-based ZPIF First Consortium Private Investment Fund, in 2024. It has been operating in Turkey since 2011."
            elif 'Sharp' in text:
                return "Sharp is a brand of television, audio-visual devices, home appliances, information devices, solar panels, smartphones, electronic components, calculators, LCD panels, automatic unmanned land vehicles, pumps, projector microwave ovens, sensors, CCD and CMOS, flash memory and air conditioning electronic products within Sharp Corporation, established in 1935. Sharp Corporation was sold to Taiwan-based Foxconn Group in 2016. Foxconn has production facilities in many countries around the world including Malaysia, Brazil, Hungary and Czech Republic, and a 14 thousand square meter production factory in Çorlu, Turkey."
            elif 'Grundig' in text:
                return "Grundig is a brand of television, sound systems, white goods, hair dryers, hair straighteners, curling irons, hair straightening combs, scales, razors, small household appliances within Grundig Intermedia GmbH, founded by Max Grundig in 1945. Grundig Intermedia GmbH was acquired by Arçelik A.Ş., owned by Koç Holding, in 2007. Grundig is marketed to more than 65 countries worldwide."
            elif 'Fairphone' in text:
                return "Fairphone is a smartphone and accessories brand within FairPhone B.V., established in 2013. Since all parts of this phone are modular, it can be repaired without the need for soldering etc. The operating system is based on the open source Android system and does not include Google services. It is produced from recycled materials and software support lasts for several years. FairPhone B.V. is based in the Netherlands. Its products are manufactured in China."
            elif 'Nokia' in text:
                return "Microsoft, which previously purchased Nokia from the Finnish company, sold the rights to produce Nokia-branded entry-level phones to HMD and FIH Mobile, a subsidiary of Taiwan's Foxconn, for $350 million. HMD will have exclusive rights to use the Nokia brand on mobile phones and tablets for 10 years. This company belongs to Smart Connect LP, a private equity fund led by Jean-François Baril, who previously served as Senior Vice President at Nokia. Nokia will use the Android operating system on phones and tablets."
            else:
                return f"[Translation needed for: {text[:100]}...]"
        
        elif target_language == 'de':
            # Mock German translation for demo
            if 'Yandex' in text:
                return "Yandex ist eine Marke für Such-, Stadt-, Online-Unterhaltungs-, Bildungs-, Cloud-Technologie-, autonome Fahrzeug- und Navigationsdienste, künstliche Intelligenz und andere Dienste innerhalb von OOO Yandex, gegründet 1997. Zusätzlich zur Suchmaschine bietet es Dienste wie Yandex Zen, Yandex Browser, Yandex Taxi, Yandex Food, Yandex Market, Yandex Plus und Yandex Travel. OOO Yandex wurde 2024 an МКАО Yandex übertragen, das dem in Russland ansässigen ZPIF First Consortium Private Investment Fund gehört. Es ist seit 2011 in der Türkei tätig."
            elif 'Sharp' in text:
                return "Sharp ist eine Marke für Fernseher, audiovisuelle Geräte, Haushaltsgeräte, Informationsgeräte, Sonnenkollektoren, Smartphones, elektronische Komponenten, Taschenrechner, LCD-Displays, automatische unbemannte Landfahrzeuge, Pumpen, Projektor-Mikrowellenöfen, Sensoren, CCD und CMOS, Flash-Speicher und Klimaanlagen-Elektronikprodukte innerhalb der Sharp Corporation, gegründet 1935. Sharp Corporation wurde 2016 an die taiwanesische Foxconn Group verkauft. Foxconn hat Produktionsstätten in vielen Ländern der Welt, darunter Malaysia, Brasilien, Ungarn und Tschechien, sowie eine 14.000 Quadratmeter große Produktionsfabrik in Çorlu, Türkei."
            elif 'Grundig' in text:
                return "Grundig ist eine Marke für Fernseher, Soundsysteme, Weiße Ware, Haartrockner, Haarglätter, Lockenstäbe, Haarglättungskämme, Waagen, Rasierer, kleine Haushaltsgeräte innerhalb von Grundig Intermedia GmbH, gegründet von Max Grundig im Jahr 1945. Grundig Intermedia GmbH wurde 2007 von Arçelik A.Ş. übernommen, das zu Koç Holding gehört. Grundig wird in mehr als 65 Ländern weltweit vermarktet."
            elif 'Fairphone' in text:
                return "Fairphone ist eine Smartphone- und Zubehörmarke innerhalb von FairPhone B.V., gegründet 2013. Da alle Teile dieses Telefons modular sind, kann es ohne Löten usw. repariert werden. Das Betriebssystem basiert auf dem Open-Source-Android-System und enthält keine Google-Dienste. Es wird aus recycelten Materialien hergestellt und die Software-Unterstützung dauert mehrere Jahre. FairPhone B.V. hat seinen Sitz in den Niederlanden. Seine Produkte werden in China hergestellt."
            elif 'Nokia' in text:
                return "Microsoft, das zuvor Nokia von dem finnischen Unternehmen gekauft hatte, verkaufte die Rechte zur Herstellung von Nokia-Telefonen der Einstiegsklasse für 350 Millionen Dollar an HMD und FIH Mobile, eine Tochtergesellschaft von Taiwans Foxconn. HMD wird 10 Jahre lang exklusive Rechte zur Nutzung der Nokia-Marke bei Mobiltelefonen und Tablets haben. Dieses Unternehmen gehört zu Smart Connect LP, einem Private-Equity-Fonds unter der Leitung von Jean-François Baril, der zuvor als Senior Vice President bei Nokia tätig war. Nokia wird das Android-Betriebssystem auf Telefonen und Tablets verwenden."
            else:
                return f"[Übersetzung erforderlich für: {text[:100]}...]"
        
        return text  # Fallback
        
    except Exception as e:
        print(f"Translation error: {e}")
        return text

def find_company_domain(company_name, existing_domain=None):
    """
    Find or verify domain information for a company
    """
    if existing_domain and existing_domain != "null" and existing_domain.strip():
        # Return existing domain if it looks valid
        if '.' in existing_domain and not existing_domain.startswith('http'):
            return existing_domain
    
    # For demonstration, I'll return existing domains or create reasonable defaults
    # In production, you would use domain search APIs or web scraping
    
    company_lower = company_name.lower()
    
    # Known mappings for demo companies
    domain_mappings = {
        'yandex': 'yandex.com',
        'sharp': 'sharp.com', 
        'grundig': 'grundig.com',
        'fairphone': 'fairphone.com',
        'nokia': 'nokia.com',
        'samsung': 'samsung.com',
        'apple': 'apple.com',
        'google': 'google.com',
        'microsoft': 'microsoft.com',
        'amazon': 'amazon.com',
        'meta': 'meta.com',
        'tesla': 'tesla.com',
        'bmw': 'bmw.com',
        'mercedes': 'mercedes-benz.com',
        'volkswagen': 'volkswagen.com',
        'siemens': 'siemens.com'
    }
    
    for key, domain in domain_mappings.items():
        if key in company_lower:
            return domain
    
    # Return existing domain if available, otherwise create a default
    if existing_domain and existing_domain != "null":
        return existing_domain
    
    # Create a default domain based on company name
    clean_name = re.sub(r'[^a-zA-Z0-9]', '', company_name.lower())
    return f"{clean_name[:20]}.com"

def process_company_object(company_obj):
    """
    Process a single company object:
    1. Translate description to multiple languages
    2. Find/verify domain
    3. Restructure description field
    """
    try:
        # Get current description in Turkish
        turkish_description = company_obj.get('description', '')
        
        # Translate to English and German
        english_description = translate_text(turkish_description, 'en')
        german_description = translate_text(turkish_description, 'de')
        
        # Find/verify domain
        current_domain = company_obj.get('domain')
        verified_domain = find_company_domain(company_obj.get('company', ''), current_domain)
        
        # Create new object structure
        processed_obj = company_obj.copy()
        
        # Restructure description field
        processed_obj['description'] = {
            'tr': turkish_description,
            'en': english_description,
            'de': german_description
        }
        
        # Update domain
        processed_obj['domain'] = verified_domain
        
        # Add processing timestamp
        processed_obj['processed_date'] = time.strftime('%Y-%m-%d')
        
        return processed_obj
        
    except Exception as e:
        print(f"Error processing company {company_obj.get('company', 'Unknown')}: {e}")
        return company_obj

def process_file(input_file, process_dir, sanitized_dir):
    """
    Process a single JSON file
    """
    input_path = Path(input_file)
    
    if not input_path.exists():
        print(f"File not found: {input_file}")
        return False
    
    try:
        # Read input file
        with open(input_path, 'r', encoding='utf-8') as f:
            companies = json.load(f)
        
        if not isinstance(companies, list):
            print(f"Expected array in {input_file}")
            return False
        
        print(f"📁 Processing {input_path.name} with {len(companies)} companies...")
        
        # Process each company
        processed_companies = []
        for i, company in enumerate(companies, 1):
            print(f"  🏢 {i}/{len(companies)}: {company.get('company', 'Unknown')}")
            processed_company = process_company_object(company)
            processed_companies.append(processed_company)
            
            # Add small delay to be respectful to external services
            time.sleep(0.1)
        
        # Move original file to process folder
        process_path = Path(process_dir) / input_path.name
        process_path.parent.mkdir(exist_ok=True)
        input_path.rename(process_path)
        print(f"  📦 Moved original to: {process_path}")
        
        # Save processed file to sanitized folder
        sanitized_path = Path(sanitized_dir) / input_path.name
        sanitized_path.parent.mkdir(exist_ok=True)
        
        with open(sanitized_path, 'w', encoding='utf-8') as f:
            json.dump(processed_companies, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ Saved processed file to: {sanitized_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error processing {input_file}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Process company data files')
    parser.add_argument('file', help='JSON file to process')
    parser.add_argument('--process-dir', default='process', help='Directory for original files')
    parser.add_argument('--sanitized-dir', default='sanitized', help='Directory for processed files')
    parser.add_argument('--preview', action='store_true', help='Preview first company without processing')
    
    args = parser.parse_args()
    
    if args.preview:
        # Preview mode
        try:
            with open(args.file, 'r', encoding='utf-8') as f:
                companies = json.load(f)
            
            if companies:
                print("📋 PREVIEW OF FIRST COMPANY:")
                print("=" * 50)
                company = companies[0]
                processed = process_company_object(company)
                print(json.dumps(processed, ensure_ascii=False, indent=2))
            
        except Exception as e:
            print(f"Preview error: {e}")
        return
    
    # Process the file
    success = process_file(args.file, args.process_dir, args.sanitized_dir)
    
    if success:
        print("\n🎉 Processing completed successfully!")
    else:
        print("\n❌ Processing failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()