from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClassesSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Classes

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def class_list(request):
    if request.method == "GET":
        studio=request.query_params.get('studio')
        class_packages = Classes.objects.all()
        if studio:
          class_packages=class_packages.filter(studio__id=studio)  
        serializer = ClassesSerializer(class_packages, many = True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ClassesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response (serializer.data, status = status.HTTP_201_CREATED)

@api_view (['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
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

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_classes(request, pk):
    try:
        class_package = Classes.objects.get(pk=pk)
    except Classes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ClassesSerializer(class_package, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)