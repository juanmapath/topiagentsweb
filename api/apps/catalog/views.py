from rest_framework import viewsets
from .models import Niche, SystemProduct, UseCase
from .serializers import NicheSerializer, SystemProductSerializer, UseCaseSerializer

class NicheViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Niche.objects.all()
    serializer_class = NicheSerializer

class SystemProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SystemProduct.objects.filter(is_active=True)
    serializer_class = SystemProductSerializer

class UseCaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UseCase.objects.all()
    serializer_class = UseCaseSerializer
