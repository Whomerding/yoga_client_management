from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name', 'date_joined', 'address', 'phone_number', 'email','classes_remaining', 'status', 'studio', 'studio_id', 'current_class_package','current_class_package_id']
        depth = 1 
    studio_id = serializers.IntegerField(write_only=True)
    current_class_package_id = serializers.IntegerField(write_only=True, required=False)
  