from rest_framework import serializers
from .models import Visitor, PageView, Event, Lead

class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ['session_id', 'ip_address', 'device_type', 'user_agent', 'created_at']
        read_only_fields = ['session_id', 'created_at']

class PageViewSerializer(serializers.ModelSerializer):
    session_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = PageView
        fields = ['session_id', 'url', 'path', 'title', 'referrer', 'timestamp']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        session_id = validated_data.pop('session_id')
        try:
            visitor = Visitor.objects.get(session_id=session_id)
        except Visitor.DoesNotExist:
            raise serializers.ValidationError({"session_id": "Visitor (Session) does not exist."})
        
        return PageView.objects.create(visitor=visitor, **validated_data)

class EventSerializer(serializers.ModelSerializer):
    session_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Event
        fields = ['session_id', 'event_category', 'event_action', 'event_label', 'event_data', 'timestamp']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        session_id = validated_data.pop('session_id')
        try:
            visitor = Visitor.objects.get(session_id=session_id)
        except Visitor.DoesNotExist:
            raise serializers.ValidationError({"session_id": "Visitor (Session) does not exist."})
        
        return Event.objects.create(visitor=visitor, **validated_data)

class LeadSerializer(serializers.ModelSerializer):
    session_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Lead
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone', 'company',
            'session_id', 'utm_source', 'utm_medium', 'utm_campaign', 
            'utm_term', 'utm_content', 'landing_page', 'form_name', 'status'
        ]
        read_only_fields = ['id', 'status']

    def create(self, validated_data):
        session_id = validated_data.pop('session_id', None)
        visitor = None
        if session_id:
            try:
                visitor = Visitor.objects.get(session_id=session_id)
            except Visitor.DoesNotExist:
                pass # Está bien que falle, lo dejamos en None

        return Lead.objects.create(visitor=visitor, **validated_data)
