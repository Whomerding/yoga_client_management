from django.db import models
from studio.models import Studio
class Student(models.Model):
    first_name = models.CharField (max_length=255)
    last_name = models.CharField (max_length=255)
    address = models.CharField (max_length=500)
    phone_number = models.IntegerField()
    email = models.EmailField(max_length=255)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)