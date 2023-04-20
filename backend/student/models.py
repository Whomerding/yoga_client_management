from django.db import models
from studio.models import Studio
class Student(models.Model):
    first_name = models.CharField (max_length=255)
    last_name = models.CharField (max_length=255)
    address = models.CharField (max_length=500)
    phone_number = models.IntegerField()
    email = models.EmailField(max_length=255)
    current_class_package = models.CharField (max_length=255, null=True)
    classes_remaining = models.IntegerField(null=True)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)