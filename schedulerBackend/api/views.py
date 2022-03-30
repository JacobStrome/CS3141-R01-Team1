from time import time
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from django.core import serializers
import requests

from .models import Course


# Create your views here.
@cache_page(60*60)
def classes(request):
    courseData = {course.id : course.getDict() for course in Course.objects.all()}
    return(JsonResponse(courseData, safe=False))

