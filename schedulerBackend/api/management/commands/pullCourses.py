from datetime import date, time
from django.core.management.base import BaseCommand
from ...models import Section, Course
import requests

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        courses = requests.get('https://api.michigantechcourses.com/courses').json()
        sections = requests.get('https://api.michigantechcourses.com/sections').json()

        #Converts the courses array into a dictionary using their id
        coursesDict = {course['id']: course for course in courses}

        #Loops through the values in the course dictionary and adds a sections key with an empty array to it 
        for course in coursesDict.values():
            course['sections'] = []
            if course['description'] is None: course['description'] = ''
            if course['title'] is None: course['title'] = ''
            courseDB = Course(
                id=course['id'],
                year=course['year'],
                semester=course['semester'],
                crse=course['crse'],
                title=course['title'],
                description=course['description'],
                credits=course['maxCredits']
            )
            courseDB.save()

        #Loops through all the sections and adds it to the corrisponding course's sections key
        for section in sections:
                
            sectionDB = Section(
                id=section['id'],
                crn=section['crn'],
                section=section['section'],
                credits=section['maxCredits'],
                totalSeats=section['totalSeats'],
                takenSeats=section['takenSeats'],
                availableSeats=section['availableSeats']
            )
            if(type(section['buildingName']) is str): 
                sectionDB.buildingName = section['buildingName']
            else:
                sectionDB.buildingName = ''
            if(type(section['room']) is str):
                sectionDB.room = section['room']
            else:
                sectionDB.room = ''
            if ((not section['time'] is None) and len(section['time']['rrules'])>0):
                startTimeDict = section['time']['rrules'][0]['config']['start']
                sectionDB.startTime = time(hour=startTimeDict['hour'],minute=startTimeDict['minute'], second=startTimeDict['second'])
                sectionDB.startDate = date(startTimeDict['year'], startTimeDict['month'], startTimeDict['day'])

                
                endTimeDict = section['time']['rrules'][0]['config']['end']
                sectionDB.endTime = time(hour=endTimeDict['hour'],minute=endTimeDict['minute'], second=endTimeDict['second'])
                sectionDB.endDate = date(endTimeDict['year'], endTimeDict['month'], endTimeDict['day'])
                

                dayOfWeekDict = section['time']['rrules'][0]['config']['byDayOfWeek']
                sectionDB.monday = "MO" in dayOfWeekDict
                sectionDB.tuesday = "TU" in dayOfWeekDict
                sectionDB.wednesday = "WE" in dayOfWeekDict
                sectionDB.thursday = "TH" in dayOfWeekDict
                sectionDB.friday = "FR" in dayOfWeekDict
            else:
                sectionDB.startTime = time(0,0,0)
                sectionDB.endTime = time(0,0,0)
                sectionDB.startDate = date(2022,1,1)
                sectionDB.endDate = date(2022,1,1)
                sectionDB.monday    = False 
                sectionDB.tuesday   = False
                sectionDB.wednesday = False
                sectionDB.thursday  = False
                sectionDB.friday    = False
            sectionDB.save()
            if(section['courseId'] in coursesDict):
                Course.objects.get(id=section['courseId']).sections.add(sectionDB)

                

        
        

    
