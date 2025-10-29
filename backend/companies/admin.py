from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Company, DataVersion, CompanyAlternative


class CompanyAlternativeInline(admin.TabularInline):
    """
    Inline admin for managing carbon neutral alternatives.
    Shows alternatives directly in the Company admin page.
    """
    model = CompanyAlternative
    fk_name = 'from_company'
    extra = 1
    verbose_name = "Carbon Neutral Alternative"
    verbose_name_plural = "Carbon Neutral Alternatives"
    
    fields = ['to_company', 'relevance_score', 'description']
    autocomplete_fields = ['to_company']
    
    def get_queryset(self, request):
        """Only show carbon neutral companies as alternatives."""
        return super().get_queryset(request).select_related('to_company')
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Limit to_company choices to only carbon neutral companies."""
        if db_field.name == "to_company":
            kwargs["queryset"] = Company.objects.filter(carbon_neutral=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    """
    Django admin interface for Company model.
    Provides comprehensive management of company sustainability data.
    """
    
    list_display = [
        'company',
        'domain', 
        'carbon_neutral_badge',
        'renewable_percentage',
        'parent',
        'sector',
        'headquarters',
        'origin',
        'updated_at'
    ]
    
    list_filter = [
        'carbon_neutral',
        'sector',
        'origin',
        ('renewable_share_percent', admin.EmptyFieldListFilter),
        'created_at',
        'updated_at'
    ]
    
    search_fields = [
        'company',
        'domain',
        'parent',
        'headquarters',
        'sector'
    ]
    
    readonly_fields = [
        'created_at',
        'updated_at',
        'get_normalized_domain'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'domain', 'parent')
        }),
        ('Sustainability Metrics', {
            'fields': ('carbon_neutral', 'renewable_share_percent'),
            'description': 'Environmental sustainability information'
        }),
        ('Corporate Details', {
            'fields': ('headquarters', 'origin', 'sector'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at', 'get_normalized_domain'),
            'classes': ('collapse',)
        })
    )
    
    ordering = ['company']
    
    # Inline models
    inlines = [CompanyAlternativeInline]
    
    # Admin actions
    actions = ['mark_carbon_neutral', 'mark_not_carbon_neutral', 'clear_renewable_data']
    
    def carbon_neutral_badge(self, obj):
        """Display carbon neutral status as a colored badge."""
        if obj.carbon_neutral:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Carbon Neutral</span>'
            )
        return format_html(
            '<span style="color: red;">✗ Not Carbon Neutral</span>'
        )
    carbon_neutral_badge.short_description = 'Carbon Status'
    carbon_neutral_badge.admin_order_field = 'carbon_neutral'
    
    def renewable_percentage(self, obj):
        """Display renewable energy percentage with formatting."""
        if obj.renewable_share_percent is not None:
            color = 'green' if obj.renewable_share_percent >= 50 else 'orange' if obj.renewable_share_percent >= 25 else 'red'
            return format_html(
                '<span style="color: {}; font-weight: bold;">{}%</span>',
                color,
                round(obj.renewable_share_percent, 1)
            )
        return format_html('<span style="color: gray;">No data</span>')
    renewable_percentage.short_description = 'Renewable Energy'
    renewable_percentage.admin_order_field = 'renewable_share_percent'
    
    def get_normalized_domain(self, obj):
        """Show normalized domain for debugging."""
        return obj.get_normalized_domain()
    get_normalized_domain.short_description = 'Normalized Domain'
    
    def mark_carbon_neutral(self, request, queryset):
        """Admin action to mark companies as carbon neutral."""
        updated = queryset.update(carbon_neutral=True)
        self.message_user(
            request, 
            '{} companies marked as carbon neutral.'.format(updated)
        )
    mark_carbon_neutral.short_description = 'Mark selected companies as carbon neutral'
    
    def mark_not_carbon_neutral(self, request, queryset):
        """Admin action to mark companies as not carbon neutral."""
        updated = queryset.update(carbon_neutral=False)
        self.message_user(
            request, 
            '{} companies marked as not carbon neutral.'.format(updated)
        )
    mark_not_carbon_neutral.short_description = 'Mark selected companies as NOT carbon neutral'
    
    def clear_renewable_data(self, request, queryset):
        """Admin action to clear renewable energy data."""
        updated = queryset.update(renewable_share_percent=None)
        self.message_user(
            request, 
            'Cleared renewable energy data for {} companies.'.format(updated)
        )
    clear_renewable_data.short_description = 'Clear renewable energy data'
    
    def get_queryset(self, request):
        """Optimize queryset to avoid N+1 queries."""
        return super().get_queryset(request).select_related()


@admin.register(CompanyAlternative)
class CompanyAlternativeAdmin(admin.ModelAdmin):
    """
    Django admin interface for CompanyAlternative model.
    Manages carbon neutral alternative relationships.
    """
    
    list_display = [
        'from_company',
        'to_company', 
        'relevance_score',
        'carbon_neutral_status',
        'created_at'
    ]
    
    list_filter = [
        'relevance_score',
        'created_at',
        'to_company__sector',
        'from_company__sector'
    ]
    
    search_fields = [
        'from_company__company',
        'from_company__domain',
        'to_company__company',
        'to_company__domain',
        'description'
    ]
    
    autocomplete_fields = ['from_company', 'to_company']
    
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Relationship', {
            'fields': ('from_company', 'to_company')
        }),
        ('Details', {
            'fields': ('relevance_score', 'description')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    ordering = ['-relevance_score', 'from_company__company']
    
    def carbon_neutral_status(self, obj):
        """Display carbon neutral status of the alternative."""
        if obj.to_company.carbon_neutral:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Carbon Neutral</span>'
            )
        return format_html(
            '<span style="color: red;">✗ Not Carbon Neutral</span>'
        )
    carbon_neutral_status.short_description = 'Alternative Status'
    carbon_neutral_status.admin_order_field = 'to_company__carbon_neutral'
    
    def get_queryset(self, request):
        """Optimize queryset to avoid N+1 queries."""
        return super().get_queryset(request).select_related(
            'from_company', 'to_company'
        )
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Customize foreign key choices."""
        if db_field.name == "to_company":
            kwargs["queryset"] = Company.objects.filter(carbon_neutral=True).order_by('company')
        elif db_field.name == "from_company":
            kwargs["queryset"] = Company.objects.order_by('company')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(DataVersion)
class DataVersionAdmin(admin.ModelAdmin):
    """
    Django admin interface for DataVersion model.
    Manages data versioning and statistics.
    """
    
    list_display = [
        'version',
        'total_companies', 
        'carbon_neutral_count',
        'renewable_data_count',
        'public_companies_count',
        'last_updated',
        'created_at'
    ]
    
    readonly_fields = [
        'created_at',
        'last_updated',
        'get_statistics_summary'
    ]
    
    fieldsets = (
        ('Version Info', {
            'fields': ('version',)
        }),
        ('Statistics', {
            'fields': (
                'total_companies',
                'carbon_neutral_count', 
                'renewable_data_count',
                'public_companies_count'
            )
        }),
        ('Metadata', {
            'fields': ('created_at', 'last_updated', 'get_statistics_summary'),
            'classes': ('collapse',)
        })
    )
    
    actions = ['refresh_statistics']
    
    def get_statistics_summary(self, obj):
        """Show computed statistics summary."""
        if obj.total_companies == 0:
            return "No data available"
            
        carbon_percent = (obj.carbon_neutral_count / obj.total_companies) * 100
        renewable_percent = (obj.renewable_data_count / obj.total_companies) * 100
        
        return format_html(
            '''
            <div>
                <strong>Carbon Neutral:</strong> {:.1f}% ({}/{})<br>
                <strong>Renewable Data:</strong> {:.1f}% ({}/{})<br>
                <strong>Public Companies:</strong> {} 
            </div>
            ''',
            carbon_percent, obj.carbon_neutral_count, obj.total_companies,
            renewable_percent, obj.renewable_data_count, obj.total_companies,
            obj.public_companies_count
        )
    get_statistics_summary.short_description = 'Statistics Summary'
    
    def refresh_statistics(self, request, queryset):
        """Admin action to refresh statistics for selected versions."""
        updated_count = 0
        for version in queryset:
            version.update_counts()
            updated_count += 1
        
        self.message_user(
            request,
            'Refreshed statistics for {} data versions.'.format(updated_count)
        )
    refresh_statistics.short_description = 'Refresh statistics'
    
    def has_add_permission(self, request):
        """Limit creation of new versions."""
        # Only allow one active version at a time in most cases
        if DataVersion.objects.count() >= 5:  # Allow up to 5 versions
            return False
        return super().has_add_permission(request)


# Custom admin site configuration
admin.site.site_header = "Sustainability API Administration"
admin.site.site_title = "Sustainability API Admin"
admin.site.index_title = "Welcome to Sustainability API Administration"

# Add some helpful statistics to the admin index
def get_admin_stats():
    """Get statistics for admin dashboard."""
    try:
        total_companies = Company.objects.count()
        carbon_neutral = Company.objects.filter(carbon_neutral=True).count()
        with_renewable = Company.objects.filter(renewable_share_percent__isnull=False).count()
        
        return {
            'total_companies': total_companies,
            'carbon_neutral': carbon_neutral,
            'with_renewable': with_renewable,
        }
    except:
        return {
            'total_companies': 0,
            'carbon_neutral': 0,
            'with_renewable': 0,
        }

# You can extend this with custom admin views if needed