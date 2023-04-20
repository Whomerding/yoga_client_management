from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClassesTakenSerializer
from .models import ClassesTaken
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def class_log(request):
    if request.method == "GET":
        classes_taken = ClassesTaken.objects.all()
        serializer = ClassesTakenSerializer(classes_taken, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ClassesTakenSerializer(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save ()
        return Response (serializer.data, status=status.HTTP_201_CREATED)