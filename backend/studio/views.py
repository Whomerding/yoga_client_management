from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudioSerializer
from .models import Studio
from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def create_studio(request):
    if request.method == 'POST':
        studio = Studio.objects.all ()
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
