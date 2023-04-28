from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudioSerializer
from .models import Studio
from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_studio(request):
    if request.method == "GET":
        studio_email=request.query_params.get('email')
        studio=Studio.objects.all()
        if studio_email:
            studio=studio.filter(email=studio_email)
        serializer = StudioSerializer(studio, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = StudioSerializer(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save ()
        return Response (serializer.data, status=status.HTTP_201_CREATED)

@api_view (['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def studio_detail(request, pk):
    studio = get_object_or_404(Studio, pk=pk)
    if request.method == 'GET': 
        serializer = StudioSerializer(studio)
        return Response (serializer.data)
    elif request.method == 'PUT':  
        serializer = StudioSerializer(studio, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        studio.delete()
        return Response (status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_studio(request, pk):
    try:
        studio = Studio.objects.get(pk=pk)
    except Studio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = StudioSerializer(studio, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)