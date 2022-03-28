from time import time
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
import requests


# Create your views here.
@cache_page(60*5)
def classes(request):
    #Gets The query string aka (?year=2022&semester=FALL)
    query = request.path.split('/api/classes',1)[1]

    #Gets the course and section data from the michigantechcourses api and saves them as a dictonary
    courses = requests.get('https://api.michigantechcourses.com/courses' + query).json()
    sections = requests.get('https://api.michigantechcourses.com/sections' + query).json()
    
    #Converts the courses array into a dictionary using their id
    coursesDict = {course['id']: course for course in courses}

    #Loops through the values in the course dictionary and adds a sections key with an empty array to it 
    for course in coursesDict.values():
        course['sections'] = []

    #Loops through all the sections and adds it to the corrisponding course's sections key
    for section in sections:
        if(section['courseId'] in coursesDict):
            coursesDict[section['courseId']]['sections'].append(section)

    subjectList = [course['subject'] for course in coursesDict.values()]
    print("starting prereq processing")
    for key in coursesDict.keys():
        value = coursesDict[key]
        prereqString = value['prereqs']
        newPrereqs = []
        if(type(prereqString) is str):
            for subject in subjectList:
                subjectPos = prereqString.find(subject + " ")
                while(subjectPos>=0):
                    courseNumber = prereqString[subjectPos+3:subjectPos+7]
                    for course in coursesDict.values():
                        if(course['subject'] == subject and course['crse'] == courseNumber): 
                            newPrereqs.append(course['id'])
                    subjectPos = prereqString.find(subject + " ", subjectPos+7)
        else:
            value['prereqs'] = []
        value['prereqs'] = newPrereqs
    print("ending prereq processing")

    #The data stored in courseDictionary after the processing is formatted as such
    # courseDict = { //outer dictionary
    #  "asdf2342sfs22fs3f2" : { //dictonary for each class
    #      "id" : "cktkjc9ac167746826ybe5irz406" // ID for the class
    #      "year" : 2022 //other fields in class
    #          |
    #          |
    #          |
    #      "sections" : [ //array containing all the sections
    #           { //each section is itself a dictionary
    #               "crn" : "12181" //fields inside the section
    #                       |
    #                       |
    #                       |
    #           }
    #       ]
    #       "prereqs" : [ //the prereqs should be a list of ids for the classes that are prereqs
    #           "asdf324sf45df3223csdf", //prereq id1
    #           "asdf324sf45df3223csdf", //prereq id2
    #           "asdf324sf45df3223csdf", //etc
    #       ]
    #   }
    # }
    return(JsonResponse(coursesDict))

