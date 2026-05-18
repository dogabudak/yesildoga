from django.db import models


class Campaign(models.Model):
    slug = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300)
    description = models.TextField()
    accent_color = models.CharField(max_length=7)
    icon = models.CharField(max_length=10)
    location = models.CharField(max_length=200)
    target_metric = models.CharField(max_length=300)
    budget = models.CharField(max_length=100)
    timeline = models.CharField(max_length=200)
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    raised_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class Milestone(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='milestones')
    title = models.CharField(max_length=200)
    target_date = models.CharField(max_length=100, blank=True, default='')
    is_completed = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.campaign.name} - {self.title}'


class CampaignGoal(models.Model):
    STATUS_CHOICES = [
        ('PLANNING', 'Planning'),
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
    ]

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='goals')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True, default='')
    target_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    raised_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PLANNING')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.campaign.name} - {self.title}'
