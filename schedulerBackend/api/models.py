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
    
    def getDict(self):
        output = {
            'id' : self.id,
            'crn' : self.crn,
            'section' : self.section,
            'credits' : self.credits,
            'totalSeats' : self.totalSeats,
            'takenSeats' : self.takenSeats,
            'availableSeats': self.availableSeats,
            'buildingName' : self.buildingName,
            'room' : self.room,
            'startTime' : self.startTime,
            'endTime' : self.endTime,
            'startDate' : self.startDate,
            'endDate' : self.endDate,
            'monday' : self.monday,
            'tuesday' : self.tuesday,
            'wednesday' : self.wednesday,
            'thursday' : self.thursday,
            'friday' : self.friday
        }
        return output
    
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

    def getDict(self):
        output = {
            'id' : self.id,
            'year': self.year,
            'semester' : self.semester,
            'subject' : self.subject,
            'crse' : self.crse,
            'title' : self.title,
            'descripton' : self.description,
            'credits' : self.credits,
            'sections': [section.getDict() for section in self.sections.all()],
            'prereqs' : [prereq.id for prereq in self.prereqs.all()]
        }
        return output
    

