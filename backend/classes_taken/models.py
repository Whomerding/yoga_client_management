from django.db import models
from student.models import Student
from datetime import date

class ClassesTaken(models.Model):
    classes_taken = models.DateField(default=date.today)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)