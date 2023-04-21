from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ['id','package_type', 'price', 'stripe_payment_url', 'studio_id']
        depth = 1 
    studio_id = serializers.IntegerField(write_only=True)