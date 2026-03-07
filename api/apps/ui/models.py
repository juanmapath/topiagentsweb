from django.db import models
from django.conf import settings

class HeroSection(models.Model):
    headline = models.CharField(max_length=255)
    subheadline = models.TextField()
    primary_btn_text = models.CharField(max_length=50)
    primary_btn_link = models.CharField(max_length=200)
    secondary_btn_text = models.CharField(max_length=50)
    secondary_btn_link = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = "Hero Sections"

    def __str__(self):
        return "Landing Page Hero Section"

class ValueLadderOffer(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    
    # Option 1
    opt1_title = models.CharField(max_length=100)
    opt1_description = models.TextField()
    opt1_price = models.DecimalField(max_digits=10, decimal_places=2)
    opt1_text = models.TextField()
    opt1_btn_text = models.CharField(max_length=50)

    # Option 2
    opt2_title = models.CharField(max_length=100)
    opt2_description = models.TextField()
    opt2_price = models.DecimalField(max_digits=10, decimal_places=2)
    opt2_text_1 = models.CharField(max_length=255)
    opt2_text_2 = models.CharField(max_length=255)
    opt2_guarantee = models.TextField()
    opt2_btn_text = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Value Ladder Offers"

    def __str__(self):
        return "Landing Page Value Ladder Offer"

# Chatbot Skeleton
class ChatSession(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'), 
        ('closed', 'Closed'), 
        ('pending_admin_reply', 'Pending Admin Reply')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    client_email = models.EmailField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatSession #{self.id} ({self.status})"

class ChatMessage(models.Model):
    SENDER_CHOICES = [
        ('bot', 'Bot'), 
        ('client', 'Client'), 
        ('admin', 'Admin')
    ]
    session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
    sender_type = models.CharField(max_length=20, choices=SENDER_CHOICES)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender_type} at {self.timestamp}"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'), 
        ('cancelled', 'Cancelled')
    ]
    session = models.ForeignKey(ChatSession, related_name='appointments', on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')

    def __str__(self):
        return f"Appointment on {self.date} ({self.status})"
