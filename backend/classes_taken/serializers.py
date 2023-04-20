from rest_framework import serializers
from .models import ClassesTaken

class ClassesTakenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassesTaken
        fields = ['classes_taken', 'student']
        depth = 1 