from datetime import date, time
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from ...models import Section, Course, Semester, Subject
import requests


class Command(BaseCommand):


    def getUniqueCourses(self):

        # Gets course data from mtucourses.com
        print("starting course request")
        courses = requests.get("https://api.michigantechcourses.com/courses").json()
        print("finishing course request")

        # Converts the courses array into a dictionary using their id
        coursesDict = {course["id"]: course for course in courses}

        uniqueCourses = {}
        for course in coursesDict.values():
            if (course['subject'] + course['crse']) in uniqueCourses:
                uniqueCourses[course['subject'] + course['crse']]['repeatIds'].add(course['id'])
                uniqueCourses[course['subject'] + course['crse']]['semesters'].add((course['year'],course['semester']))
            else:
                uniqueCourses[course['subject'] + course['crse']] = course
                uniqueCourses[course['subject'] + course['crse']]['repeatIds'] = set([course['id']])
                uniqueCourses[course['subject'] + course['crse']]['semesters'] = set([(course['year'],course['semester'])])
        
        return {course['id'] : course for course in uniqueCourses.values()}


    def handle(self, *args, **kwargs):

        coursesDict = self.getUniqueCourses()

        # Loops through the values in the course dictionary and adds a sections key with an empty array to it
        print("starting course database additions")
        for course in coursesDict.values():

            # If description or title are None set them to an empty string
            if course["description"] is None:
                course["description"] = ""
            if course["title"] is None:
                course["title"] = ""
            if course['prereqs'] is None:
                course['prereqs'] = ""

            subject = Subject(ticker = course['subject'])
            try:
                subject = Subject.objects.get(ticker = course['subject'])
            except:
                subject.save()

            # Create the Course DB object
            courseDB = Course(
                id=course["id"],
                subject=subject,
                crse=course["crse"],
                title=course["title"],
                description=course["description"],
                credits=course["maxCredits"],
                prereqString = course['prereqs']
            )
            courseDB.save() #save the course to the DB


            # Add semesters to DB object
            for semester in course['semesters']:
                foundSem = Semester.objects.filter(year = semester[0], semester = semester[1]) #get semester from database
                if(len(foundSem) != 0): #if semster exists add it to the course
                    Course.objects.get(id=course['id']).semesters.add(foundSem[0])
                else: #if not found create it and add it to the course and the semester DB
                    semesterDB = Semester(year = semester[0], semester = semester[1])
                    semesterDB.save()
                    Course.objects.get(id=course['id']).semesters.add(semesterDB)
        print("finishing course database additions")

        subjects = list(set([course["subject"] for course in coursesDict.values()]))

        print("starting prereq database additions")
        for course in coursesDict.values():
            prereqString = course["prereqs"]
            if prereqString is None:
                continue
            courseDB = Course.objects.get(id=course["id"])
            for subject in subjects:
                subjectPos = prereqString.find(subject + " ")
                while subjectPos >= 0:
                    prereqDBs = Course.objects.filter(
                        subject=subject,
                        crse=prereqString[
                            subjectPos
                            + len(subject)
                            + 1 : subjectPos
                            + len(subject)
                            + 5
                        ],
                    )
                    if len(prereqDBs) > 0:
                        courseDB.prereqs.add(prereqDBs[0])
                    else:
                        print(
                            "prereq not found "
                            + subject
                            + " "
                            + prereqString[
                                subjectPos
                                + len(subject)
                                + 1 : subjectPos
                                + len(subject)
                                + 5
                            ]
                            + " not found"
                        )
                    subjectPos = prereqString.find(
                        subject + " ", subjectPos + len(subject) + 1
                    )

        print("finishing prereq database additions")
        # Loops through all the sections and adds it to the corrisponding course's sections key
        print("starting section database additions")

        print("starting sections request")
        sections = requests.get("https://api.michigantechcourses.com/sections").json()
        print("finishing sections request")


        print("starting instructors request")
        instructors = requests.get("https://api.michigantechcourses.com/instructors").json()
        print("finishing instructors request")
        instructors = {instructor['id'] : instructor for instructor in instructors}


        courseIdMatch = {course['id'] : (course['repeatIds'], course['semesters']) for course in coursesDict.values()}

        for section in sections:

            courseID = ""
            courseYear = ""

            for key in courseIdMatch.keys():
                l = courseIdMatch[key]
                if(section["courseId"] in l[0]):
                    courseYear = list(l[1])[list(l[0]).index(section["courseId"])]
                    courseID = key
            
            courseYear = Semester.objects.filter(year = courseYear[0], semester = courseYear[1])[0]
            sectionDB = Section(
                id=section["id"],
                crn=section["crn"],
                section=section["section"],
                credits=section["maxCredits"],
                totalSeats=section["totalSeats"],
                takenSeats=section["takenSeats"],
                availableSeats=section["availableSeats"],
                semester = courseYear
            )
            if len(section['instructors']) > 0:
                sectionDB.instructor=instructors[section['instructors'][0]['id']]['fullName']
            else:
                sectionDB.instructor = ""
            if type(section["buildingName"]) is str:
                sectionDB.buildingName = section["buildingName"]
            else:
                sectionDB.buildingName = ""
            if type(section["room"]) is str:
                sectionDB.room = section["room"]
            else:
                sectionDB.room = ""
            if (not section["time"] is None) and len(section["time"]["rrules"]) > 0:
                startTimeDict = section["time"]["rrules"][0]["config"]["start"]
                sectionDB.startTime = time(
                    hour=startTimeDict["hour"],
                    minute=startTimeDict["minute"],
                    second=startTimeDict["second"],
                )
                sectionDB.startDate = date(
                    startTimeDict["year"], startTimeDict["month"], startTimeDict["day"]
                )

                endTimeDict = section["time"]["rrules"][0]["config"]["end"]
                sectionDB.endTime = time(
                    hour=endTimeDict["hour"],
                    minute=endTimeDict["minute"],
                    second=endTimeDict["second"],
                )
                sectionDB.endDate = date(
                    endTimeDict["year"], endTimeDict["month"], endTimeDict["day"]
                )

                dayOfWeekDict = section["time"]["rrules"][0]["config"]["byDayOfWeek"]
                sectionDB.monday = "MO" in dayOfWeekDict
                sectionDB.tuesday = "TU" in dayOfWeekDict
                sectionDB.wednesday = "WE" in dayOfWeekDict
                sectionDB.thursday = "TH" in dayOfWeekDict
                sectionDB.friday = "FR" in dayOfWeekDict
            else:
                sectionDB.startTime = time(0, 0, 0)
                sectionDB.endTime = time(0, 0, 0)
                sectionDB.startDate = date(2022, 1, 1)
                sectionDB.endDate = date(2022, 1, 1)
                sectionDB.monday = False
                sectionDB.tuesday = False
                sectionDB.wednesday = False
                sectionDB.thursday = False
                sectionDB.friday = False
            sectionDB.save()
            Course.objects.get(id=courseID).sections.add(sectionDB)
        print("finishing section database additions")
