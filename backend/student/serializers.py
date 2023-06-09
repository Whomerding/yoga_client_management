from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name', 'date_joined', 'last_payment', 'address', 'phone_number', 'email','classes_remaining', 'payment_last_resolved', 'last_class_taken', 'studio', 'studio_id', 'current_class_package','current_class_package_id']
        depth = 2
    studio_id = serializers.IntegerField(write_only=True) 
    current_class_package_id = serializers.IntegerField(write_only=True, required=False)
  