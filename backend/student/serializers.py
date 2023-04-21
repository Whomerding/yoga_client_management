from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name', 'date_joined', 'address', 'phone_number', 'email', 'current_class_package','classes_remaining', 'studio', 'studio_id']
        depth = 1 
    studio_id = serializers.IntegerField(write_only=True)