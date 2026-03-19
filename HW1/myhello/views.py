from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Course_table

logger = logging.getLogger("django")

@api_view(['GET'])
def addcourse(request):
    Department = request.GET.get('Department','')
    CourseTitle = request.GET.get('CourseTitle','')
    Instructor = request.GET.get('Instructor','')

    new_course = Course_table()
    new_course.Department = Department
    new_course.CourseTitle = CourseTitle
    new_course.Instructor = Instructor
    new_course.save()
    logger.debug(f"Added course: {new_course}")
    if Instructor:
        return Response({"data": Instructor + " inserted successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"data": "Failed to insert course"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def courselist(request):
    return JsonResponse(list(Course_table.objects.all().values()), safe=False)