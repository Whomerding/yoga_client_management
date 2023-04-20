from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudentSerializer
from .models import Student
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def student(request):
    if request.method == 'POST':
        Student = Student.objects.all ()
        serializer = StudentSerializer(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save ()
        return Response (serializer.data, status=status.HTTP_201_CREATED)

@api_view (['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'GET': 
        serializer = StudentSerializer(student)
        return Response (serializer.data)
    elif request.method == 'PUT':  
        serializer = StudentSerializer(student, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        student.delete()
        return Response (status=status.HTTP_204_NO_CONTENT)
