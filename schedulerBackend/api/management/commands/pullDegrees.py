from datetime import date, time
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from ...models import Section, Course, Semester
import requests

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        print("Starting to pull degrees")
