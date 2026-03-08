from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VisitorViewSet, PageViewViewSet, EventViewSet, LeadViewSet, DashboardAnalyticsView, LeadHistoryView

router = DefaultRouter()
router.register(r'session', VisitorViewSet, basename='visitor')
router.register(r'pageview', PageViewViewSet, basename='pageview')
router.register(r'event', EventViewSet, basename='event')
router.register(r'lead', LeadViewSet, basename='lead')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
    path('dashboard/lead/<int:lead_id>/', LeadHistoryView.as_view(), name='dashboard-lead-history'),
]
