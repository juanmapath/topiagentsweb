from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HeroSection, ValueLadderOffer, ChatSession, ChatMessage, Appointment
from .serializers import HeroSectionSerializer, ValueLadderOfferSerializer, ChatSessionSerializer, ChatMessageSerializer, AppointmentSerializer

class HeroSectionView(APIView):
    def get(self, request):
        hero = HeroSection.objects.first()
        if hero:
            serializer = HeroSectionSerializer(hero)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        if not request.user or not request.user.is_staff:
            return Response({"detail": "Requires admin privileges"}, status=status.HTTP_403_FORBIDDEN)
        hero = HeroSection.objects.first()
        if hero:
            serializer = HeroSectionSerializer(hero, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

class ValueLadderOfferView(APIView):
    def get(self, request):
        offer = ValueLadderOffer.objects.first()
        if offer:
            serializer = ValueLadderOfferSerializer(offer)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        if not request.user or not request.user.is_staff:
            return Response({"detail": "Requires admin privileges"}, status=status.HTTP_403_FORBIDDEN)
        offer = ValueLadderOffer.objects.first()
        if offer:
            serializer = ValueLadderOfferSerializer(offer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

class ChatSessionViewSet(viewsets.ModelViewSet):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
