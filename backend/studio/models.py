from django.db import models

# Create your models here.
class Studio(models.Model):
    studio_name = models.CharField (max_length=255)
    first_name = models.CharField (max_length=255)
    last_name = models.CharField (max_length=255)
    address = models.CharField (max_length=500)
    phone_number = models.BigIntegerField()
    email = models.EmailField(max_length=255)