import React, {useState} from "react"
import {IconButton, TableCell, TableHead, TableRow} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'


/**
 * Component used for creating table rows corrisponding to a paticular course 
 * this includes the sections that are offered for that paticular course
 * 
 * @param {course : object, onChange? : function(event, selectedCourses)} props 
 * @returns React.Component which displays all the rows 
 */
export default function CourseTable(props){
    //Sets up the state variables
    const [open, setOpen] = useState(false) //Used to determine if the the dropdown has been selected
    const [selected, setSelected] = useState({}) //Used to track the sections which have been selected
  
    /**
     * Gets a string which is used to display the times that a section takes place
     * @param {...backendSection} section 
     * @returns String
     */
    const getTimes = (section) =>{
      //Sets default string
      var outputString = ""
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
  
    /**
     * 
     * @param {React.MouseEvent<HTMLTableRowElement, MouseEvent>} event 
     * @param {...backendSection} section 
     */
    const onClick = (event, section) => {

      //Gets a new object containing all the keys from the old object
      const newSelected = {...selected}

      //Deletes the section if it already occured in the object otherwise add it to the object
      if(newSelected[section.crn]) delete newSelected[section.crn]
      else{
        newSelected[section.crn] = true
      }
  
      //Sets the state to the new object
      setSelected(newSelected)

      //Call the onChange function if given
      if(props.onChange) props.onChange(event, newSelected)
    }
    
    return(
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
              {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
            </IconButton>
          </TableCell>
          <TableCell>{props.course.subject+props.course.crse}</TableCell>
          <TableCell colSpan={3}>{props.course.title}</TableCell>
          <TableCell>{props.course.maxCredits}</TableCell>
        </TableRow>
        {open &&
          <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>CRN</TableCell>
            <TableCell colSpan={3}>Times</TableCell>
            <TableCell>Seats(offered/taken/open)</TableCell>
          </TableRow>
          </TableHead>
        }
        {open && props.course.sections.map((section)=> (
          <TableRow key={section.crn} onClick={(event) => onClick(event, section)} selected={selected[section.crn]}>
            <TableCell>{section.section}</TableCell>
            <TableCell>{section.crn}</TableCell>
            <TableCell colSpan={3}>{getTimes(section)}</TableCell>
            <TableCell>{section.totalSeats}/{section.takenSeats}/{section.availableSeats}</TableCell>
          </TableRow>
        ))
        }
      </React.Fragment>
    )
  }