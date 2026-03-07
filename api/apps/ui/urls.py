from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroSectionView, ValueLadderOfferView, ChatSessionViewSet, ChatMessageViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'chat-sessions', ChatSessionViewSet)
router.register(r'chat-messages', ChatMessageViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('landing/hero/', HeroSectionView.as_view(), name='hero-section'),
    path('landing/value-ladder/', ValueLadderOfferView.as_view(), name='value-ladder'),
    path('', include(router.urls)),
]
