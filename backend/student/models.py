from django.db import models
from studio.models import Studio
from django.utils.translation import gettext as _
from datetime import datetime

class Student(models.Model):
    first_name = models.CharField (max_length=255)
    last_name = models.CharField (max_length=255)
    date_joined = models.DateField(default=datetime.now)
    address = models.CharField (max_length=500)
    phone_number = models.BigIntegerField()
    email = models.EmailField(max_length=255)
    current_class_package = models.CharField (max_length=255, null=True, blank=True)
    classes_remaining = models.IntegerField(null=True, blank=True)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)