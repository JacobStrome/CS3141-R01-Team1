from datetime import date, time
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from ...models import Section, Course
import requests


class Command(BaseCommand):
    def handle(self, *args, **kwargs):

        print("starting course request")
        courses = requests.get("https://api.michigantechcourses.com/courses").json()
        print("finishing course request")

        print("starting sections request")
        sections = requests.get("https://api.michigantechcourses.com/sections").json()
        print("finishing sections request")

        # Converts the courses array into a dictionary using their id
        coursesDict = {course["id"]: course for course in courses}

        # Loops through the values in the course dictionary and adds a sections key with an empty array to it
        print("starting course database additions")
        for course in coursesDict.values():
            course["sections"] = []
            if course["description"] is None:
                course["description"] = ""
            if course["title"] is None:
                course["title"] = ""
            courseDB = Course(
                id=course["id"],
                year=course["year"],
                semester=course["semester"],
                subject=course["subject"],
                crse=course["crse"],
                title=course["title"],
                description=course["description"],
                credits=course["maxCredits"],
            )
            courseDB.save()
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
        for section in sections:

            sectionDB = Section(
                id=section["id"],
                crn=section["crn"],
                section=section["section"],
                credits=section["maxCredits"],
                totalSeats=section["totalSeats"],
                takenSeats=section["takenSeats"],
                availableSeats=section["availableSeats"],
            )
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
            if section["courseId"] in coursesDict:
                Course.objects.get(id=section["courseId"]).sections.add(sectionDB)

        print("finishing section database additions")
