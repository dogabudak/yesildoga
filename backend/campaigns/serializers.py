from rest_framework import serializers
from .models import Campaign, Milestone, CampaignGoal


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['id', 'title', 'target_date', 'is_completed', 'order']


class CampaignGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignGoal
        fields = ['id', 'title', 'description', 'target_amount', 'raised_amount', 'status', 'order']


class CampaignListSerializer(serializers.ModelSerializer):
    milestone_count = serializers.SerializerMethodField()
    milestones_completed = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'slug', 'name', 'tagline', 'icon', 'accent_color', 'location',
            'goal_amount', 'raised_amount', 'display_order',
            'milestone_count', 'milestones_completed',
        ]

    def get_milestone_count(self, obj):
        return obj.milestones.count()

    def get_milestones_completed(self, obj):
        return obj.milestones.filter(is_completed=True).count()


class CampaignDetailSerializer(serializers.ModelSerializer):
    milestones = MilestoneSerializer(many=True, read_only=True)
    goals = CampaignGoalSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = [
            'slug', 'name', 'tagline', 'description', 'icon', 'accent_color',
            'location', 'target_metric', 'budget', 'timeline',
            'goal_amount', 'raised_amount', 'is_active', 'display_order',
            'milestones', 'goals',
        ]
