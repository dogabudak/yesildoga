from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django_countries.fields import CountryField


class Company(models.Model):
    """
    Company sustainability data model.
    Based on the Node.js backend structure for compatibility.
    """
    
    # Core company information
    domains = models.JSONField(
        default=list,
        blank=True,
        help_text="List of domains owned by the company (e.g., ['google.com', 'alphabet.com'])"
    )
    company = models.CharField(
        max_length=255,
        db_index=True,
        help_text="Company name"
    )
    
    # Sustainability metrics
    carbon_neutral = models.BooleanField(
        default=False,
        help_text="Whether the company is carbon neutral"
    )
    renewable_share_percent = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)],
        help_text="Percentage of renewable energy usage (0-100)"
    )
    
    # Corporate structure
    parent = models.CharField(
        max_length=255, 
        null=True, 
        blank=True,
        help_text="Parent company name"
    )
    
    # Additional metadata
    headquarters = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Company headquarters location"
    )
    origin = CountryField(
        null=True,
        blank=True,
        help_text="Country of origin (ISO 3166-1 alpha-2 code)"
    )
    sector = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Business sector/industry"
    )
    description = models.JSONField(
        null=True,
        blank=True,
        help_text="Description of the company in multiple languages (e.g., {'en': 'description', 'tr': 'açıklama'})"
    )
    
    is_approved = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Whether the company data is approved by an admin"
    )
    
    carbon_neutral_alternatives = models.ManyToManyField(
        'self',
        through='CompanyAlternative',
        through_fields=('from_company', 'to_company'),
        symmetrical=False,
        blank=True,
        related_name='alternative_for',
        help_text="Carbon neutral alternatives for this company"
    )
    
    # Tracking fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ['company']
        indexes = [
            models.Index(fields=['company']),
            models.Index(fields=['carbon_neutral']),
            models.Index(fields=['parent']),
            models.Index(fields=['origin']),
            models.Index(fields=['is_approved']),
        ]
    
    def __str__(self):
        domains_str = ", ".join(self.domains) if self.domains else "No domains"
        return "{} ({})".format(self.company, domains_str)
    
    @property
    def is_carbon_neutral(self):
        """Alias for carbon_neutral field for better readability."""
        return self.carbon_neutral
    
    @property
    def has_renewable_data(self):
        """Check if company has renewable energy data."""
        return self.renewable_share_percent is not None
    
    def get_normalized_domains(self):
        """
        Get normalized domains for matching (removes www., converts to lowercase).
        Returns list of normalized domains.
        """
        normalized = []
        for domain in self.domains:
            normalized_domain = domain.lower()
            if normalized_domain.startswith('www.'):
                normalized_domain = normalized_domain[4:]
            normalized.append(normalized_domain)
        return normalized
    
    @property
    def primary_domain(self):
        """Get the first domain as primary domain for compatibility."""
        return self.domains[0] if self.domains else None
    
    @classmethod
    def find_by_domain(cls, domain):
        """
        Find company by domain with flexible matching across domains array.
        Mimics the Node.js backend domain matching logic.
        """
        if not domain:
            return None
            
        # Normalize input domain
        normalized_domain = domain.lower()
        if normalized_domain.startswith('www.'):
            normalized_domain = normalized_domain[4:]
        
        # Search for companies that contain this domain in their domains array
        # Try exact match first
        companies = cls.objects.filter(domains__icontains=normalized_domain)
        for company in companies:
            for comp_domain in company.domains:
                comp_normalized = comp_domain.lower()
                if comp_normalized.startswith('www.'):
                    comp_normalized = comp_normalized[4:]
                if comp_normalized == normalized_domain:
                    return company
        
        # Try with www prefix
        www_domain = f"www.{normalized_domain}"
        companies = cls.objects.filter(domains__icontains=www_domain)
        for company in companies:
            if www_domain in [d.lower() for d in company.domains]:
                return company
        
        return None


class DataVersion(models.Model):
    """
    Track data versions and metadata for the API.
    Provides statistics similar to the Node.js backend.
    """
    
    version = models.CharField(
        max_length=50,
        unique=True,
        help_text="Version identifier for the data"
    )
    total_companies = models.PositiveIntegerField(
        default=0,
        help_text="Total number of companies in the database"
    )
    carbon_neutral_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of carbon neutral companies"
    )
    renewable_data_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of companies with renewable energy data"
    )
    public_companies_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of public companies"
    )
    last_updated = models.DateTimeField(
        auto_now=True,
        help_text="When this version was last updated"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Data Version"
        verbose_name_plural = "Data Versions"
        ordering = ['-created_at']
    
    def __str__(self):
        return "Version {} ({} companies)".format(self.version, self.total_companies)
    
    @classmethod
    def get_current_version(cls):
        """Get the current/latest data version."""
        return cls.objects.first()
    
    def update_counts(self):
        """Update all count fields based on current data."""
        self.total_companies = Company.objects.count()
        self.carbon_neutral_count = Company.objects.filter(carbon_neutral=True).count()
        self.renewable_data_count = Company.objects.filter(
            renewable_share_percent__isnull=False
        ).count()
        # Note: We don't have public company data yet, so this remains 0
        self.public_companies_count = 0
        self.save()
        return self


class CompanyAlternative(models.Model):
    """
    Through model for company carbon neutral alternatives.
    Allows non-carbon-neutral companies to reference carbon-neutral alternatives.
    """
    
    from_company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='alternative_relationships',
        help_text="The company that needs carbon neutral alternatives"
    )
    to_company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='alternative_for_relationships',
        help_text="The carbon neutral alternative company"
    )
    relevance_score = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="Relevance score (1-10) - how similar the alternative is"
    )
    description = models.CharField(
        max_length=500,
        blank=True,
        help_text="Optional description of why this is a good alternative"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('from_company', 'to_company')
        verbose_name = "Company Alternative"
        verbose_name_plural = "Company Alternatives"
        ordering = ['-relevance_score', 'to_company__company']
        indexes = [
            models.Index(fields=['from_company']),
            models.Index(fields=['to_company']),
            models.Index(fields=['relevance_score']),
        ]
    
    def __str__(self):
        return f"{self.from_company.company} → {self.to_company.company}"
    
    def clean(self):
        """Validation to ensure to_company is carbon neutral."""
        from django.core.exceptions import ValidationError
        if self.to_company and not self.to_company.carbon_neutral:
            raise ValidationError("Alternative company must be carbon neutral")

        if self.from_company and self.to_company and self.from_company == self.to_company:
            raise ValidationError("Company cannot be an alternative to itself")


class CompanyRequest(models.Model):
    """
    Track domain lookup requests for companies not in the database.
    Helps prioritize which companies to add based on request frequency.
    """

    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        APPROVED = 'approved', 'Approved'
        REJECTED = 'rejected', 'Rejected'

    domain = models.CharField(
        max_length=255,
        unique=True,
        db_index=True,
        help_text="The domain that was searched but not found"
    )
    request_count = models.PositiveIntegerField(
        default=1,
        help_text="Number of times this domain has been requested"
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
        help_text="Current status of the request"
    )
    created_company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='company_requests',
        help_text="The company created from this request (if approved)"
    )
    admin_notes = models.TextField(
        blank=True,
        help_text="Optional notes from admin about this request"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_requested_at = models.DateTimeField(
        auto_now_add=True,
        help_text="When this domain was last requested"
    )

    class Meta:
        verbose_name = "Company Request"
        verbose_name_plural = "Company Requests"
        ordering = ['-request_count', '-last_requested_at']
        indexes = [
            models.Index(fields=['domain']),
            models.Index(fields=['status']),
            models.Index(fields=['request_count']),
            models.Index(fields=['-last_requested_at']),
        ]

    def __str__(self):
        return f"{self.domain} ({self.request_count} requests) - {self.status}"

    @classmethod
    def record_request(cls, domain):
        """
        Record a request for a domain. Creates new record or increments count.
        Returns the CompanyRequest instance.
        """
        # Normalize domain
        normalized_domain = domain.lower()
        if normalized_domain.startswith('www.'):
            normalized_domain = normalized_domain[4:]

        # Use get_or_create with update on existing
        request, created = cls.objects.get_or_create(
            domain=normalized_domain,
            defaults={
                'request_count': 1,
                'status': cls.Status.PENDING,
            }
        )

        if not created:
            # Increment count and update timestamp
            request.request_count += 1
            request.last_requested_at = timezone.now()
            request.save(update_fields=['request_count', 'last_requested_at', 'updated_at'])

        return request

    def approve_and_create_company(self, company_name, **kwargs):
        """
        Approve this request and create a Company from it.
        kwargs can include: carbon_neutral, sector, headquarters, origin, etc.
        """
        if self.status == self.Status.APPROVED:
            raise ValueError("Request already approved")

        # Create the company
        company = Company.objects.create(
            domains=[self.domain],
            company=company_name,
            **kwargs
        )

        # Update request status
        self.status = self.Status.APPROVED
        self.created_company = company
        self.save(update_fields=['status', 'created_company', 'updated_at'])

        return company

    def reject(self, notes=''):
        """Reject this request with optional notes."""
        self.status = self.Status.REJECTED
        if notes:
            self.admin_notes = notes
        self.save(update_fields=['status', 'admin_notes', 'updated_at'])