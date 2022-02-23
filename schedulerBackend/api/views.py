from django.http import HttpResponse
from django.shortcuts import render
import requests

# Create your views here.
def classes(request):
    return(HttpResponse(requests.get('https://api.michigantechcourses.com/courses')))