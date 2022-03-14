from time import time
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
import requests


# Create your views here.
@cache_page(60*5)
def classes(request):
    query = request.path.split('/api/classes',1)[1]
    courses = requests.get('https://api.michigantechcourses.com/courses' + query).json()
    sections = requests.get('https://api.michigantechcourses.com/sections' + query).json()
    prevTime = time()
    coursesDict = {course['id']: course for course in courses}
    for course in coursesDict.values():
        course['sections'] = []
    for section in sections:
        if(section['courseId'] in coursesDict):
            coursesDict[section['courseId']]['sections'].append(section)
    #for section in sections:
        
    print("Total Time: ", time() - prevTime)
    return(JsonResponse(coursesDict))

