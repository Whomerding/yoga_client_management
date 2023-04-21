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
        students_classes_taken=request.query_params.get('id')
        sort=request.query_params.get('sort')
        classes_taken = ClassesTaken.objects.all()
        if students_classes_taken:
            classes_taken=classes_taken.filter(student__id=students_classes_taken)
        if sort:
            classes_taken=classes_taken.order_by(sort)[0:10]
        serializer = ClassesTakenSerializer(classes_taken, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ClassesTakenSerializer(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save ()
        return Response (serializer.data, status=status.HTTP_201_CREATED)