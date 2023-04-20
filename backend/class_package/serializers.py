from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ['package_type', 'price', 'stripe_payment_url', 'studio']
        depth = 1 