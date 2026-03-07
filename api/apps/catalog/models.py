from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class TriggerTag(Tag):
    pass

class ActionTag(Tag):
    pass

class ComplexityTag(Tag):
    pass

class ObjectiveTag(Tag):
    pass


class Niche(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class SystemProduct(models.Model):
    niches = models.ManyToManyField(Niche, related_name='products')
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Precio original (tachado) para mostrar descuento")
    is_active = models.BooleanField(default=True)
    
    # Tags
    triggers = models.ManyToManyField(TriggerTag, blank=True, related_name='products')
    actions = models.ManyToManyField(ActionTag, blank=True, related_name='products')
    complexities = models.ManyToManyField(ComplexityTag, blank=True, related_name='products')
    objectives = models.ManyToManyField(ObjectiveTag, blank=True, related_name='products')
    
    def __str__(self):
        return self.title

class UseCase(models.Model):
    product = models.ForeignKey(SystemProduct, related_name='use_cases', on_delete=models.CASCADE)
    niche = models.CharField(max_length=100)
    scenario = models.TextField()
    problem = models.TextField()
    magic_solution = models.TextField()

    def __str__(self):
        return f"UseCase for {self.product.title}"

class ProductMedia(models.Model):
    product = models.ForeignKey(SystemProduct, related_name='media', on_delete=models.CASCADE)
    file = models.FileField(upload_to='product_media/', null=True, blank=True)
    url = models.URLField(max_length=500, null=True, blank=True, help_text="URL del video o imagen (e.g. YouTube, S3)")
    is_video = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Media for {self.product.title}"
