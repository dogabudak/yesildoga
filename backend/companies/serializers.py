from rest_framework import serializers
from .models import Company, DataVersion, CompanyAlternative


class CompanyAlternativeSerializer(serializers.ModelSerializer):
    """
    Serializer for carbon neutral alternatives.
    Returns the alternative company data with relevance info.
    """
    name = serializers.CharField(source='to_company.company', read_only=True)
    url = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    domain = serializers.CharField(source='to_company.domain', read_only=True)
    
    class Meta:
        model = CompanyAlternative
        fields = ['name', 'url', 'description', 'domain', 'relevance_score']
    
    def get_url(self, obj):
        """Generate URL for the alternative company."""
        domain = obj.to_company.domain
        if not domain.startswith('http'):
            return f"https://{domain}"
        return domain
    
    def get_description(self, obj):
        """Get description, fallback to company sector info."""
        if obj.description:
            return obj.description
        
        sector = obj.to_company.sector
        carbon_info = "Carbon neutral" if obj.to_company.carbon_neutral else ""
        renewable_info = ""
        
        if obj.to_company.renewable_share_percent:
            renewable_info = f", {obj.to_company.renewable_share_percent}% renewable energy"
        
        return f"{sector} company. {carbon_info}{renewable_info}".strip(', ')


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Company model.
    Matches the JSON structure from the Node.js backend.
    """
    carbon_neutral_alternatives = serializers.SerializerMethodField()
    origin = serializers.CharField(source='origin.code', read_only=True, allow_null=True)
    
    class Meta:
        model = Company
        fields = [
            'domain',
            'company', 
            'carbon_neutral',
            'renewable_share_percent',
            'parent',
            'headquarters',
            'origin',
            'sector',
            'esg_policy',
            'carbon_neutral_alternatives',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_carbon_neutral_alternatives(self, obj):
        """
        Get carbon neutral alternatives for this company.
        Only return alternatives if the company is NOT carbon neutral.
        """
        if obj.carbon_neutral:
            return []  # No alternatives needed for carbon neutral companies
        
        alternatives_qs = CompanyAlternative.objects.filter(
            from_company=obj
        ).select_related('to_company').order_by('-relevance_score')
        
        return CompanyAlternativeSerializer(alternatives_qs, many=True).data


class CompanyListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for company lists (excludes large text fields).
    """
    origin = serializers.CharField(source='origin.code', read_only=True, allow_null=True)
    
    class Meta:
        model = Company
        fields = [
            'domain',
            'company',
            'carbon_neutral', 
            'renewable_share_percent',
            'parent',
            'headquarters',
            'origin',
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