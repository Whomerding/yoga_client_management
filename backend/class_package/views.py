from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClassesSerializer
from .models import Classes

@api_view(['GET', 'POST'])
def class_list(request):
    if request.method == "GET":
        class_packages = Classes.objects.all()
        serializer = ClassesSerializer(songs, many = True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ClassesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response (serializer.data, status = status.HTTP_201_CREATED)

@api_view (['GET', 'PUT', 'DELETE'])
def class_detail(request, pk):
    class_package = get_object_or_404(Classes, pk=pk)
    if request.method == 'GET': 
        serializer = ClassesSerializer(class_package)
        return Response (serializer.data)
    elif request.method == 'PUT':  
        serializer = ClassesSerializer(class_package, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        class_package.delete()
        return Response (status=status.HTTP_204_NO_CONTENT)
