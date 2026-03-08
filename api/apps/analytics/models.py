from django.db import models
import uuid

class Visitor(models.Model):
    """
    Representa un visitante único de la página web (rastreado por cookie/local storage).
    """
    session_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    device_type = models.CharField(max_length=50, null=True, blank=True, help_text="desktop, mobile, tablet")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.session_id)

class PageView(models.Model):
    """
    Registra cada página vista de la web por un visitante.
    """
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE, related_name='page_views')
    url = models.URLField(max_length=2000)
    path = models.CharField(max_length=500, null=True, blank=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    referrer = models.URLField(max_length=2000, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.visitor} viewed {self.path or self.url}"

class Event(models.Model):
    """
    Rastrea interacciones específicas (clics, reproducciones de video, intentos de comprar, etc).
    """
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE, related_name='events')
    page_view = models.ForeignKey(PageView, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    event_category = models.CharField(max_length=100, help_text="Ej: Video, Form, Button")
    event_action = models.CharField(max_length=100, help_text="Ej: Play, Submit, Click")
    event_label = models.CharField(max_length=200, null=True, blank=True, help_text="Ej: hero_video, contact_form")
    event_data = models.JSONField(null=True, blank=True, help_text="Datos adicionales sobre el evento")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_category}:{self.event_action} by {self.visitor}"

class Lead(models.Model):
    """
    Un potencial cliente que ha dejado sus datos y demostró interés.
    """
    STATUS_CHOICES = [
        ('NEW', 'Nuevo'),
        ('CONTACTED', 'Contactado'),
        ('QUALIFIED', 'Calificado (MQL/SQL)'),
        ('DISQUALIFIED', 'Descartado'),
        ('CUSTOMER', 'Cliente'),
    ]

    # Datos Personales/Contacto
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    email = models.EmailField(unique=True, db_index=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    company = models.CharField(max_length=150, null=True, blank=True)
    
    # Vinculación de Actividad
    visitor = models.ForeignKey(Visitor, on_delete=models.SET_NULL, null=True, blank=True, related_name='leads', help_text="Permite ver qué hizo el lead en la web antes de convertirse.")
    
    # Origen del Lead (UTMs y Tracking)
    utm_source = models.CharField(max_length=100, null=True, blank=True, help_text="Identificador del anunciante, sitio o publicación.")
    utm_medium = models.CharField(max_length=100, null=True, blank=True, help_text="Medio publicitario o de marketing (cpc, banner, email).")
    utm_campaign = models.CharField(max_length=100, null=True, blank=True, help_text="Nombre de la campaña, lema o código promocional.")
    utm_term = models.CharField(max_length=200, null=True, blank=True, help_text="Palabras clave de la búsqueda.")
    utm_content = models.CharField(max_length=200, null=True, blank=True, help_text="Identificador de lo que se pulsó, útil para pruebas A/B.")
    
    # Datos Adicionales/Contexto
    form_name = models.CharField(max_length=100, null=True, blank=True, help_text="Nombre del formulario donde dejó los datos.")
    landing_page = models.URLField(max_length=2000, null=True, blank=True, help_text="Página en la que aterrizó o dejó el lead.")
    notes = models.TextField(null=True, blank=True, help_text="Notas del equipo de ventas.")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    
    # Tiempos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} ({self.email})"
