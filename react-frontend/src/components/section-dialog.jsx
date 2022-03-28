import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material'
import React, {useState} from 'react'

export default function SectionDialog(props){

    const getTimes = (section) =>{
        //Sets default string
        var outputString = ""
        if(!section.time) return outputString
        if(section.time.rrules.length ===0) return outputString //Returns empty string if no times are given 
    
        //Gets the list of days the section is held
        const daysOfWeek = section.time.rrules[0].config.byDayOfWeek
  
        //Adds the letters corrisponding to the day to the string with Tuesday and Thursday using 2 letters and Mon,Wed,Fri using 1 letter
        daysOfWeek.forEach((day) =>{
          day.includes("T") ? outputString = outputString.concat(day,","): outputString = outputString.concat(day[0],",")
        })
  
        //Gets the start time of the section as a object then convert to a date object
        const startObject = section.time.rrules[0].config.start
        const startTime = new Date(startObject.year, startObject.month, startObject.day, startObject.hour, startObject.minute, startObject.second)
  
        //Gets the end time of the section as a object then convert to a date object
        const endObject = section.time.rrules[0].config.end
        const endTime = new Date(endObject.year, endObject.month, endObject.day, endObject.hour, endObject.minute, endObject.second)
  
        //Adds the start time to the course in the format hour:minuteAM/PM
        outputString = outputString.concat(` ${(startTime.getHours()%12 || 12)}:${startTime.getMinutes() || "00"}${startTime.getHours()/12>=1 ? "PM": "AM"}`)
  
        //Adds the end time to the course in the format hour:minuteAM/PM
        outputString = outputString.concat(`-${(endTime.getHours()%12 || 12)}:${endTime.getMinutes() || "00"}${endTime.getHours()/12>=1 ? "PM": "AM"}`)
  
        return outputString //returns the completed string
    }



    return(
        <Dialog open={props.open} fullWidth maxWidth = "md">
            <DialogTitle>{`${props.course.subject+props.course.crse} ${props.course.title}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Section: {props.section.section} CRN: {props.section.crn} Credits: {props.section.maxCredits}<br/>
                    Available Seats: {props.section.availableSeats} Total Seats: {props.section.totalSeats}<br/>
                    {props.section.buildingName && `Building: ${props.section.buildingName} Room: ${props.section.room}`}
                    {!props.section.buildingName && `Taught Online`}<br/>
                    {getTimes(props.section).length > 0 && `Times: ${getTimes(props.section)}`}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}