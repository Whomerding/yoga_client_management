from django.db import models
from student.models import Student

class ClassesTaken(models.Model):
    classes_taken= models.DateTimeField
    student = models.ForeignKey(Student, on_delete=models.CASCADE)