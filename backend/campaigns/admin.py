from django.contrib import admin
from .models import Campaign, Milestone, CampaignGoal


class MilestoneInline(admin.TabularInline):
    model = Milestone
    extra = 1
    ordering = ['order']


class CampaignGoalInline(admin.StackedInline):
    model = CampaignGoal
    extra = 0
    ordering = ['order']


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'accent_color', 'goal_amount', 'raised_amount', 'is_active', 'display_order']
    list_filter = ['is_active']
    search_fields = ['name', 'slug', 'location']
    ordering = ['display_order']
    inlines = [MilestoneInline, CampaignGoalInline]
