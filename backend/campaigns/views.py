from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics

from .models import Campaign
from .serializers import CampaignListSerializer, CampaignDetailSerializer


@method_decorator(cache_page(60 * 60), name='dispatch')
class CampaignListView(generics.ListAPIView):
    serializer_class = CampaignListSerializer
    queryset = Campaign.objects.filter(is_active=True).order_by('display_order')
    pagination_class = None


@method_decorator(cache_page(60 * 15), name='dispatch')
class CampaignDetailView(generics.RetrieveAPIView):
    serializer_class = CampaignDetailSerializer
    queryset = Campaign.objects.prefetch_related('milestones', 'goals')
    lookup_field = 'slug'
