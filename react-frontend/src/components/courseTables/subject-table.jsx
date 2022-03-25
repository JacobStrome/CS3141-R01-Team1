import React, {useState} from "react"
import {IconButton, TableCell, TableHead, TableRow} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'
import CourseTable from "./course-table"

/**
 * Component used to display a list of courses for a paticular subject within the scheduler table
 * @param {subject : string, courses : [...backendCourse], onChange : function(event, sectionsCurrentlySelected)} props 
 * @returns 
 */
export default function SubjectTable(props){
  //Sets initial state
  const[open, setOpen] = useState(false) //Sets the initial dropdown to false aka not shown
  const[selectedSections, setSelectedSections] = useState({}) //Sets the object containing the selected sections to an empty object

  /**
   * 
   * @param {React.MouseEvent<HTMLTableRowElement, MouseEvent>} event 
   * @param {courseid : {crn : true}} selected 
   * @param {...backendCourse} course 
   */
  const onCourseSelectionChange = (event, selected, course) =>{
    //Gets a new object containing all the keys from the old object
    const newSelectedSections = {...selectedSections}

    //Sets the new object list of selected sections for the given course to the given array
    newSelectedSections[course.id] = selected

    //Sets the state using the new object
    setSelectedSections(newSelectedSections)

    //Gets the full list of the crns as a single list to pass to the function
    const crns = []
    Object.values(newSelectedSections).forEach((value) => {
      crns.push(...Object.keys(value))
    })

    //Call the onChange function if given
    if(props.onChange) props.onChange(event, crns)
  }

  return(
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell colSpan={5} component="th" scope="row" align="center">
          {props.subject}
        </TableCell>
      </TableRow>

      {open &&
        <TableHead>
        <TableRow>
          <TableCell colSpan={2}>Course Number</TableCell>
          <TableCell colSpan={3}>Course Title</TableCell>
          <TableCell>Credits</TableCell>
        </TableRow>
        </TableHead>
      }

      {open && props.courses.sort((courseA, courseB) =>(
        parseInt(courseA.crse) - parseInt(courseB.crse)
      )).map((course) =>(
        <CourseTable key={course.id} course={course} onChange={(event, selected) => onCourseSelectionChange(event, selected, course)}/>
      ))}
    </React.Fragment>
  )
}
  