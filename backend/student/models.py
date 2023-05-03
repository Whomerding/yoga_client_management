from django.db import models
from studio.models import Studio
from django.utils.translation import gettext as _
from datetime import date
from class_package.models import Classes

class Student(models.Model):
    first_name = models.CharField (max_length=255)
    last_name = models.CharField (max_length=255)
    date_joined = models.DateField(default=date.today)
    address = models.CharField (max_length=500)
    phone_number = models.BigIntegerField()
    email = models.EmailField(max_length=255)
    last_payment = models.DateField(null=True, blank=True)
    current_class_package=models.ForeignKey(Classes, on_delete=models.CASCADE, null=True, blank=True)
    classes_remaining = models.IntegerField(null=True, blank=True, default=0)
    last_class_taken=models.DateField(null=True, blank=True)
    payment_last_resolved=models.DateField(default=date.today)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)