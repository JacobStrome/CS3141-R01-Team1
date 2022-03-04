from django.urls import path

from . import views

urlpatterns = [
    # Default
    path('', views.index, name='index'),
]