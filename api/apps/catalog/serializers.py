from rest_framework import serializers
from .models import (
    Niche, SystemProduct, UseCase, 
    TriggerTag, ActionTag, ComplexityTag, ObjectiveTag,
    ProductMedia
)

class TriggerTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriggerTag
        fields = ('id', 'name')

class ActionTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionTag
        fields = ('id', 'name')

class ComplexityTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplexityTag
        fields = ('id', 'name')

class ObjectiveTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectiveTag
        fields = ('id', 'name')

class ProductMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMedia
        fields = ('id', 'file', 'url', 'is_video', 'order')

class NicheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niche
        fields = '__all__'

class UseCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UseCase
        fields = '__all__'

class SystemProductSerializer(serializers.ModelSerializer):
    niches = NicheSerializer(many=True, read_only=True)
    use_cases = UseCaseSerializer(many=True, read_only=True)
    media = ProductMediaSerializer(many=True, read_only=True)
    
    triggers = TriggerTagSerializer(many=True, read_only=True)
    actions = ActionTagSerializer(many=True, read_only=True)
    complexities = ComplexityTagSerializer(many=True, read_only=True)
    objectives = ObjectiveTagSerializer(many=True, read_only=True)

    class Meta:
        model = SystemProduct
        fields = '__all__'
