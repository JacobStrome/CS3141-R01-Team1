from time import time
from xmlrpc.client import ResponseError
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.views.decorators.cache import cache_page
from django.core import serializers
import requests

from .models import Course, Semester, Section


# Create your views here.
def courses(request):
    year = request.GET.get("year")
    semester = request.GET.get("semester")
    filteredSemesters = Semester.objects.all()
    if year: filteredSemesters = filteredSemesters.filter(year = int(year))
    if semester: filteredSemesters = filteredSemesters.filter(semester = semester)
    print(request.path)

    courseData = {course.id : course.getDict() for course in Course.objects.filter(semesters__in=filteredSemesters).all()}
    return(JsonResponse(courseData, safe=False))

def course(request, id):
    courseDB = Course.objects.filter(id=id)
    if(len(courseDB) == 0): return HttpResponseNotFound("ID invalid")
    return JsonResponse(courseDB[0].getDict(), safe =False)

def sections(request):
    sectionData = {section.id : section.getDict() for section in Section.objects.all()}
    return JsonResponse(sectionData, safe=False)

def section(request, id):
    sectionDB = Section.objects.filter(id = id)
    if(len(sectionDB) == 0 ): return HttpResponseNotFound("ID invalid")
    return JsonResponse(sectionDB[0].getDict(), safe=False)


@cache_page(60*60)
def semesters(request):
    sems = {semester.pk : semester.getDict() for semester in Semester.objects.all()}
    return JsonResponse(sems, safe=False)
