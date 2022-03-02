from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
# def index(request):
#    return render(request, 'build/index.html')
def index(request):
    return HttpResponse("Hello world, you are at our index!")


def classpage(request):
    return HttpResponse("You are now looking at our class page!")
