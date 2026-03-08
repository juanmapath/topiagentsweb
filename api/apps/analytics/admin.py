from django.contrib import admin
from .models import Visitor, PageView, Event, Lead

@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'ip_address', 'device_type', 'created_at')
    search_fields = ('session_id', 'ip_address')
    list_filter = ('device_type', 'created_at')
    readonly_fields = ('session_id', 'created_at', 'updated_at')

@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ('visitor', 'path', 'title', 'timestamp')
    search_fields = ('url', 'path', 'title', 'visitor__session_id')
    list_filter = ('timestamp',)
    readonly_fields = ('timestamp',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('event_category', 'event_action', 'event_label', 'visitor', 'timestamp')
    search_fields = ('event_category', 'event_action', 'event_label', 'visitor__session_id')
    list_filter = ('event_category', 'event_action', 'timestamp')
    readonly_fields = ('timestamp',)

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'status', 'utm_source', 'utm_campaign', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'company', 'utm_source', 'utm_medium', 'utm_campaign')
    list_filter = ('status', 'utm_source', 'utm_medium', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Información de Contacto', {
            'fields': ('first_name', 'last_name', 'email', 'phone', 'company')
        }),
        ('Gestión del Lead', {
            'fields': ('status', 'notes')
        }),
        ('Tracking & UTMs', {
            'fields': ('visitor', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'landing_page', 'form_name')
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
