from django.db import models

# Create your models here.
class Section(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    crn = models.CharField(max_length=7)
    section = models.CharField(max_length=5)
    credits = models.IntegerField()
    totalSeats = models.IntegerField()
    takenSeats = models.IntegerField()
    availableSeats = models.IntegerField()
    buildingName = models.CharField(max_length=50)
    room = models.CharField(max_length=10)
    startTime = models.TimeField()
    endTime = models.TimeField()
    startDate = models.DateField()
    endDate = models.DateField()
    monday = models.BooleanField()
    tuesday = models.BooleanField()
    wednesday = models.BooleanField()
    thursday = models.BooleanField()
    friday = models.BooleanField()


    def __str__(self):
        return self.crn

    def getDays(self):
        outputString = ""
        if(self.monday):    outputString += "M,"
        if(self.tuesday):   outputString += "TU,"
        if(self.wednesday): outputString += "W,"
        if(self.thursday):  outputString += "TH,"
        if(self.friday):    outputString += "F,"
        if(len(outputString)>0): outputString = outputString[0:-1]        
        return outputString
    
class Course(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    year = models.IntegerField()
    semester = models.CharField(max_length=10)
    subject = models.CharField(max_length=4)
    crse = models.CharField(max_length=4)
    title = models.CharField(max_length=100)
    description = models.TextField()
    credits = models.IntegerField()
    sections = models.ManyToManyField(Section, symmetrical=False)
    prereqs = models.ManyToManyField('self', symmetrical=False)


    def __str__(self):
        return self.subject + self.crse + " " + self.title
    

