from unicodedata import name
from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('courses', views.courses, name='courses'),
    path('courses/<id>/', views.course, name="course"),
    path('semesters', views.semesters, name='semesters'),
    path('sections', views.sections, name='sections'),
    path('sections/<id>/', views.section, name='section'),
    path('subjects', views.subjects, name='subjects')
]