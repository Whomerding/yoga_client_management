from django.db import models
from student.models import Student
from datetime import datetime

class ClassesTaken(models.Model):
    classes_taken = models.DateTimeField(default=datetime.now)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)