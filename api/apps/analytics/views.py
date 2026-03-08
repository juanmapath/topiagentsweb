from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Visitor, PageView, Event, Lead
from .serializers import VisitorSerializer, PageViewSerializer, EventSerializer, LeadSerializer

class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Capturar IP real (incluso detrás de proxies como Cloudflare, Nginx, Coolify)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
            
        serializer.save(ip_address=ip)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PageViewViewSet(viewsets.ModelViewSet):
    queryset = PageView.objects.all()
    serializer_class = PageViewSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from django.db.models import Count

class DashboardAnalyticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Top Sources
        top_sources = Lead.objects.values('utm_source').annotate(count=Count('id')).order_by('-count')[:10]
        # Top Mediums
        top_mediums = Lead.objects.values('utm_medium').annotate(count=Count('id')).order_by('-count')[:10]
        
        # Recent Leads
        recent_leads = Lead.objects.all().order_by('-created_at')[:50]
        serializer = LeadSerializer(recent_leads, many=True)

        return Response({
            'top_sources': [{'name': item['utm_source'] or 'unknown', 'value': item['count']} for item in top_sources],
            'top_mediums': [{'name': item['utm_medium'] or 'unknown', 'value': item['count']} for item in top_mediums],
            'recent_leads': serializer.data
        })

class LeadHistoryView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, lead_id):
        try:
            lead = Lead.objects.get(id=lead_id)
        except Lead.DoesNotExist:
            return Response({"error": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)

        visitor = lead.visitor
        if not visitor:
            return Response({"error": "No visitor tracking associated with this lead"}, status=status.HTTP_404_NOT_FOUND)

        pageviews = PageView.objects.filter(visitor=visitor).order_by('timestamp')
        events = Event.objects.filter(visitor=visitor).order_by('timestamp')

        pv_serializer = PageViewSerializer(pageviews, many=True)
        ev_serializer = EventSerializer(events, many=True)

        # Merge and sort chronologically
        history = []
        for pv in pv_serializer.data:
            history.append({**pv, 'type': 'pageview'})
        for ev in ev_serializer.data:
            history.append({**ev, 'type': 'event'})

        history.sort(key=lambda x: x['timestamp'])

        return Response({
            'lead': LeadSerializer(lead).data,
            'visitor': VisitorSerializer(visitor).data,
            'history': history
        })
