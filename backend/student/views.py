from django.shortcuts import get_object_or_404
from datetime import date, timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudentSerializer
from .models import Student
from rest_framework.permissions import IsAuthenticated

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def student(request):
    if request.method == "GET":
        startdate=date.today()
        thirty_days_ago=startdate-timedelta(days=30)
        print(thirty_days_ago)
        student_studio=request.query_params.get('studio')
        new_student=request.query_params.get('new')
        sort=request.query_params.get('sort')
    
        student = Student.objects.all()
        if student_studio:
            student = student.filter(studio__id=student_studio)
        if new_student:
            student = student.filter(date_joined__gte=thirty_days_ago)   
        if sort:
            student=student.order_by(sort)[0:10]
        serializer = StudentSerializer(student, many = True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
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

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = StudentSerializer(student, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)