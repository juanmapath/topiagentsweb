from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NicheViewSet, SystemProductViewSet, UseCaseViewSet

router = DefaultRouter()
router.register(r'niches', NicheViewSet)
router.register(r'products', SystemProductViewSet)
router.register(r'use-cases', UseCaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
