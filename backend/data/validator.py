#!/usr/bin/env python3
"""
Data Validator Script

This script validates JSON files in the data directory by:
- Counting total number of JSON files
- Counting objects in each file
- Providing statistics and summaries
- Detecting files with more than expected objects (default: 5)
- Generating detailed reports
"""

import json
import os
import glob
from pathlib import Path
import argparse
from collections import defaultdict, Counter
import sys

def validate_json_files(data_dir=".", max_objects=5, show_details=False, output_file=None):
    """
    Validate JSON files in the specified directory.
    
    Args:
        data_dir (str): Directory containing JSON files
        max_objects (int): Maximum expected objects per file
        show_details (bool): Show detailed file-by-file breakdown
        output_file (str): Optional file to save the report
    """
    data_path = Path(data_dir)
    if not data_path.exists():
        print(f"Error: Directory {data_dir} does not exist")
        return
    
    # Find all JSON files
    json_files = list(data_path.glob('*.json'))
    
    if not json_files:
        print(f"No JSON files found in {data_dir}")
        return
    
    # Statistics containers
    file_stats = []
    object_count_distribution = Counter()
    total_objects = 0
    error_files = []
    over_limit_files = []
    
    print(f"🔍 Validating JSON files in: {data_path.absolute()}")
    print(f"📊 Found {len(json_files)} JSON files")
    print("=" * 60)
    
    # Process each file
    for json_file in sorted(json_files):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if isinstance(data, list):
                object_count = len(data)
                total_objects += object_count
                object_count_distribution[object_count] += 1
                
                file_info = {
                    'file': json_file.name,
                    'objects': object_count,
                    'size_bytes': json_file.stat().st_size,
                    'status': 'OK' if object_count <= max_objects else 'OVER_LIMIT'
                }
                
                file_stats.append(file_info)
                
                if object_count > max_objects:
                    over_limit_files.append((json_file.name, object_count))
                    
            else:
                error_files.append((json_file.name, "Not an array"))
                file_stats.append({
                    'file': json_file.name,
                    'objects': 'N/A',
                    'size_bytes': json_file.stat().st_size,
                    'status': 'ERROR_NOT_ARRAY'
                })
                
        except json.JSONDecodeError as e:
            error_files.append((json_file.name, f"JSON decode error: {e}"))
            file_stats.append({
                'file': json_file.name,
                'objects': 'N/A',
                'size_bytes': json_file.stat().st_size,
                'status': 'ERROR_INVALID_JSON'
            })
        except Exception as e:
            error_files.append((json_file.name, f"Error: {e}"))
            file_stats.append({
                'file': json_file.name,
                'objects': 'N/A',
                'size_bytes': 0,
                'status': 'ERROR_OTHER'
            })
    
    # Generate report
    report_lines = []
    
    # Summary statistics
    valid_files = [f for f in file_stats if isinstance(f['objects'], int)]
    
    report_lines.append("📈 VALIDATION SUMMARY")
    report_lines.append("=" * 60)
    report_lines.append(f"Total JSON files: {len(json_files)}")
    report_lines.append(f"Valid files: {len(valid_files)}")
    report_lines.append(f"Error files: {len(error_files)}")
    report_lines.append(f"Files over {max_objects} objects: {len(over_limit_files)}")
    report_lines.append(f"Total objects across all files: {total_objects:,}")
    
    if valid_files:
        avg_objects = total_objects / len(valid_files)
        min_objects = min(f['objects'] for f in valid_files)
        max_objects_found = max(f['objects'] for f in valid_files)
        report_lines.append(f"Average objects per file: {avg_objects:.2f}")
        report_lines.append(f"Min objects in a file: {min_objects}")
        report_lines.append(f"Max objects in a file: {max_objects_found}")
    
    # Object count distribution
    report_lines.append("\n📊 OBJECT COUNT DISTRIBUTION")
    report_lines.append("=" * 60)
    for count in sorted(object_count_distribution.keys()):
        files_with_count = object_count_distribution[count]
        percentage = (files_with_count / len(valid_files)) * 100 if valid_files else 0
        report_lines.append(f"{count:2d} objects: {files_with_count:4d} files ({percentage:5.1f}%)")
    
    # Files over limit
    if over_limit_files:
        report_lines.append(f"\n🚨 FILES EXCEEDING {max_objects} OBJECTS")
        report_lines.append("=" * 60)
        for filename, count in over_limit_files:
            report_lines.append(f"{filename}: {count} objects")
    
    # Error files
    if error_files:
        report_lines.append("\n❌ ERROR FILES")
        report_lines.append("=" * 60)
        for filename, error in error_files:
            report_lines.append(f"{filename}: {error}")
    
    # Detailed file listing
    if show_details:
        report_lines.append("\n📋 DETAILED FILE LIST")
        report_lines.append("=" * 60)
        report_lines.append(f"{'File Name':<60} {'Objects':<8} {'Size (KB)':<10} {'Status'}")
        report_lines.append("-" * 95)
        
        for file_info in sorted(file_stats, key=lambda x: x['file']):
            size_kb = file_info['size_bytes'] / 1024
            objects_str = str(file_info['objects']) if file_info['objects'] != 'N/A' else 'N/A'
            report_lines.append(f"{file_info['file']:<60} {objects_str:<8} {size_kb:<10.1f} {file_info['status']}")
    
    # File size analysis
    total_size = sum(f['size_bytes'] for f in file_stats)
    report_lines.append(f"\n💾 STORAGE ANALYSIS")
    report_lines.append("=" * 60)
    report_lines.append(f"Total size: {total_size / (1024*1024):.2f} MB")
    report_lines.append(f"Average file size: {total_size / len(file_stats) / 1024:.2f} KB")
    
    # Print report
    report_text = "\n".join(report_lines)
    print(report_text)
    
    # Save to file if requested
    if output_file:
        output_path = Path(output_file)
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(report_text)
            print(f"\n💾 Report saved to: {output_path.absolute()}")
        except Exception as e:
            print(f"\n❌ Error saving report: {e}")
    
    # Return validation results
    return {
        'total_files': len(json_files),
        'valid_files': len(valid_files),
        'error_files': len(error_files),
        'over_limit_files': len(over_limit_files),
        'total_objects': total_objects,
        'file_stats': file_stats,
        'validation_passed': len(error_files) == 0 and len(over_limit_files) == 0
    }

def main():
    parser = argparse.ArgumentParser(description='Validate JSON files in data directory')
    parser.add_argument('--data-dir', default='.', help='Directory containing JSON files (default: current directory)')
    parser.add_argument('--max-objects', type=int, default=5, help='Maximum expected objects per file (default: 5)')
    parser.add_argument('--details', action='store_true', help='Show detailed file-by-file breakdown')
    parser.add_argument('--output', help='Save report to file')
    parser.add_argument('--quick', action='store_true', help='Quick validation - show only summary')
    
    args = parser.parse_args()
    
    # Run validation
    results = validate_json_files(
        data_dir=args.data_dir,
        max_objects=args.max_objects,
        show_details=args.details and not args.quick,
        output_file=args.output
    )
    
    if results:
        # Exit code based on validation results
        if not results['validation_passed']:
            print(f"\n⚠️  Validation completed with {results['error_files']} errors and {results['over_limit_files']} files over limit")
            sys.exit(1)
        else:
            print(f"\n✅ Validation passed! All {results['total_files']} files are valid and within limits")
            sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()