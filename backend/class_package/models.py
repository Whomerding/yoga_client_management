from django.db import models
from studio.models import Studio

class Classes(models.Model):
    package_type = models.CharField (max_length=255)
    number_of_classes_included_in_package=models.CharField(max_length=255, null=True, blank=True, default='Unlimited')
    price = models.DecimalField (max_digits=5, decimal_places=2)
    stripe_payment_url = models.URLField (max_length=1000, null=True, blank=True)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)