from django.contrib import admin
from .models import HeroSection, ValueLadderOffer, ChatSession, ChatMessage, Appointment

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow creating only 1 instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(ValueLadderOffer)
class ValueLadderOfferAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'client_email', 'status', 'created_at')
    list_filter = ('status',)

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('session', 'sender_type', 'timestamp')
    list_filter = ('sender_type',)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('session', 'date', 'status')
    list_filter = ('status',)
