from rest_framework import serializers
from .models import Company, DataVersion


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Company model.
    Matches the JSON structure from the Node.js backend.
    """
    
    class Meta:
        model = Company
        fields = [
            'domain',
            'company', 
            'carbon_neutral',
            'renewable_share_percent',
            'parent',
            'headquarters',
            'sector',
            'esg_policy',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class CompanyListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for company lists (excludes large text fields).
    """
    
    class Meta:
        model = Company
        fields = [
            'domain',
            'company',
            'carbon_neutral', 
            'renewable_share_percent',
            'parent',
            'headquarters',
            'sector'
        ]


class CompanySearchSerializer(serializers.ModelSerializer):
    """
    Serializer for search results with minimal fields.
    """
    
    class Meta:
        model = Company
        fields = [
            'domain',
            'company',
            'carbon_neutral',
            'renewable_share_percent'
        ]


class DataVersionSerializer(serializers.ModelSerializer):
    """
    Serializer for data version and statistics.
    Matches the Node.js backend structure.
    """
    
    class Meta:
        model = DataVersion
        fields = [
            'version',
            'total_companies',
            'carbon_neutral_count', 
            'renewable_data_count',
            'public_companies_count',
            'last_updated'
        ]