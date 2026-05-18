from django.urls import path
from .views import CampaignListView, CampaignDetailView

app_name = 'campaigns'

urlpatterns = [
    path('', CampaignListView.as_view(), name='campaign-list'),
    path('<str:slug>/', CampaignDetailView.as_view(), name='campaign-detail'),
]
