from django.contrib import admin
from .models import (
    Niche, SystemProduct, UseCase, ProductMedia,
    TriggerTag, ActionTag, ComplexityTag, ObjectiveTag
)

admin.site.register(TriggerTag)
admin.site.register(ActionTag)
admin.site.register(ComplexityTag)
admin.site.register(ObjectiveTag)

class UseCaseInline(admin.StackedInline):
    model = UseCase
    extra = 1

class ProductMediaInline(admin.TabularInline):
    model = ProductMedia
    extra = 1

@admin.register(Niche)
class NicheAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(SystemProduct)
class SystemProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'original_price', 'is_active')
    list_filter = ('niches', 'is_active', 'objectives', 'complexities')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('niches', 'triggers', 'actions', 'complexities', 'objectives')
    inlines = [ProductMediaInline, UseCaseInline]

@admin.register(UseCase)
class UseCaseAdmin(admin.ModelAdmin):
    list_display = ('product', 'niche')
    list_filter = ('product',)
