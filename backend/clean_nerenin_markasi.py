#!/usr/bin/env python3
import json
import os
import glob

def clean_description_nerenin_markasi(description):
    """Split on 'Nerenin Markası/Markasıdır' patterns and keep only the second part"""
    patterns = [
        'Nerenin Markasıdır', 
        'Nerenin markasıdır', 
        'Nerenin Markası',
        'Nerenin markası',
        'Nerenin Markası :',
        'Nerenin markası :',
        'Sahibi Kim Nerenin Markasıdır',
        'Sahibi Kim Nerenin markasıdır',
        'Sahibi Kim Nerenin Markası',
        'Sahibi Kim Nerenin markası'
    ]
    
    for pattern in patterns:
        if pattern in description:
            parts = description.split(pattern, 1)
            if len(parts) > 1 and parts[1].strip():
                return parts[1].strip()
            else:
                # If there's nothing after the pattern, remove the pattern entirely
                return parts[0].strip()
    return description

def process_file(filepath):
    """Process a single JSON file to clean descriptions"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        changes_made = 0
        for item in data:
            if 'description' in item and item['description']:
                original = item['description']
                cleaned = clean_description_nerenin_markasi(original)
                if cleaned != original:
                    item['description'] = cleaned
                    changes_made += 1
        
        if changes_made > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f'Cleaned {changes_made} descriptions in {os.path.basename(filepath)}')
        
        return changes_made
    except Exception as e:
        print(f'Error processing {filepath}: {e}')
        return 0

def main():
    # Process all JSON files in chunked directory
    chunked_dir = '/Users/doga.budak/Documents/piarcha/yesildoga/yesildoga/backend/data/chunked'
    json_files = glob.glob(os.path.join(chunked_dir, '*.json'))
    
    print(f"Found {len(json_files)} JSON files to process")
    
    total_changes = 0
    processed_files = 0
    
    # Process all files
    for filepath in json_files:
        changes = process_file(filepath)
        total_changes += changes
        processed_files += 1
        
        # Show progress every 100 files
        if processed_files % 100 == 0:
            print(f"Progress: {processed_files}/{len(json_files)} files processed")
    
    print(f'\nProcessing completed:')
    print(f'Processed {processed_files} files')
    print(f'Total descriptions cleaned: {total_changes}')

if __name__ == "__main__":
    main()