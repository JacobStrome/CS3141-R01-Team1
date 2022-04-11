import React, {useState} from "react"
import {IconButton, TableCell, TableHead, TableRow} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown, InfoRounded} from '@mui/icons-material'
import SectionDialog from '../section-dialog'

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
    const [openDialog, setOpenDialog] = useState(false) //Used to determine if the dialog for a section has been opened
    const [dialogSection, setDialogSection] = useState({}) //Used to fill in the section data for the dialog

    /**
     * Gets a string which is used to display the times that a section takes place
     * @param {...backendSection} section 
     * @returns String
     */
    const getTimes = (section) =>{
      //Sets default string
      var outputString = ""
      if(section.monday)    outputString = outputString.concat("M,")
      if(section.tuesday)   outputString = outputString.concat("TU,")
      if(section.wednesday) outputString = outputString.concat("W,")
      if(section.thursday)  outputString = outputString.concat("TH,")
      if(section.friday)    outputString = outputString.concat("F,")
      if(outputString.length>0) outputString = outputString.slice(0, -1)


      const startTime = new Date(section.startTime)
      const endTime =   new Date(section.endTime)

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
        newSelected[section.crn] = section
      }
  
      //Sets the state to the new object
      setSelected(newSelected)

      //Call the onChange function if given
      if(props.onChange) props.onChange(event, newSelected)
    }
    
    const openInfo = (event) =>{
      event.stopPropagation()
      const callerID = event.target.parentNode.id.slice(12)
      var callerSection = {}
      props.course.sections.forEach((section) => {
        callerID === section.crn ? callerSection = section : callerSection = callerSection
      })
      setDialogSection(callerSection)
      setOpenDialog(true)
    }
    
    return(
      <React.Fragment>
        <SectionDialog open={openDialog} course={props.course} section={dialogSection} courses={props.courses} handleClose={()=> setOpenDialog(false)}/>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand section row" size="small" onClick={()=> setOpen(!open)}>
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
            <TableCell colSpan={2}>Times</TableCell>
            <TableCell>Seats(offered/taken/open)</TableCell>
            <TableCell>Additional Info</TableCell>
          </TableRow>
          </TableHead>
        }
        {open && props.course.sections.map((section)=> (
          <TableRow id ={"section-" + section.crn} key={section.id} onClick={(event) => onClick(event, section)} selected={selected[section.crn] !== undefined}>
            <TableCell>{section.section}</TableCell>
            <TableCell>{section.crn}</TableCell>
            <TableCell colSpan={2}>{getTimes(section)}</TableCell>
            <TableCell>{section.totalSeats}/{section.takenSeats}/{section.availableSeats}</TableCell>
            <TableCell>
              <IconButton aria-label='additional info' onClick={(event) => openInfo(event)}>
                <InfoRounded id={`info-button-${section.crn}`}/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))
        }
      </React.Fragment>
    )
  }