from rest_framework import serializers
from .models import Studio

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['studio_name', 'first_name', 'last_name', 'address', 'phone_number', 'email']
    