from rest_framework import serializers
from .models import ClassesTaken

class ClassesTakenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassesTaken
        fields = ['id','classes_taken', 'student','student_id']
        depth = 1 
    student_id = serializers.IntegerField(write_only=True)