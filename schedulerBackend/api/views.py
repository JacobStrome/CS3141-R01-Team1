from django.http import JsonResponse
from django.views.decorators.cache import cache_page
import requests


# Create your views here.
@cache_page(60*5)
def classes(request):
    courses = requests.get('https://api.michigantechcourses.com/courses').json()
    sections = requests.get('https://api.michigantechcourses.com/sections').json()
    for course in courses:
        course['sections'] = [section for section in sections if section['courseId'] == course['id']]
    
    return(JsonResponse({"classes" : courses}))

