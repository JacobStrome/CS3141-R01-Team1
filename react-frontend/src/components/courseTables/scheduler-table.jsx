import React, {useState} from "react"
import './scheduler-table.css'
import {Paper, TableCell, TableContainer, TableHead, TableRow, Table, FormControl, Select, InputLabel, MenuItem, Button, Skeleton} from '@mui/material'
import SubjectTable from "./subject-table"


/**
 * Component used to display all the possible sections through nesting the subjects available
 * Also allows for switching which semester is displayed through the use of selction boxes
 * @param {courses: object, searchTerm : string, addCourses: function(event, sectionsToAdd)} props 
 * @returns React.Component
 */
export default function SchedulerTable(props){
  //Setup state variables
  const [year, setYear] = useState(2022); //Sets the default year to 2022
  const [semester, setSemester] = useState("FALL") //sets the default semester to the Fall
  const [sections, setSections] = useState({}) //Initially sets no sections as selected

  /**
   * Handles when a new section is selected by the user
   * @param {React.MouseEvent<HTMLTableRowElement, MouseEvent>} event 
   * @param {Array<String>} crns 
   * @param {String} subject 
   */
  const selectionChanged = (event, crns, subject) =>{
    //gets a new object containing the previous sections
    const newSections = {...sections}

    //saves the new list of sections to the object
    newSections[subject] = crns

    //saves the new object to the component state
    setSections(newSections)
  }

  /**
   * Handles when the user presses the Add Selected Courses Button
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
   */
  const onButtonClick = (event) =>{

    //If the user passed the addCourses function as a prop
    if(props.addCourses){
      //Changes the object of crn arrays to a single conjoined array
      const crns = []
      Object.values(sections).forEach((value) =>
        crns.push(...value)
      )  
      //Calls the passed function
      props.addCourses(event, crns)
    }
  }
  
  //Gets a list of all of the years given back by the courses object
  const years = []
  Object.values(props.courses).forEach((course) => {
    if(!years.includes(course.year)) years.push(course.year) 
  })

  //Finds which courses are valid based on the selected year, semester, and searchTerm
  const validCourses = Object.values(props.courses).filter((course) => {
    const courseHeader = (course.subject + course.crse + " " + course.title).toLowerCase()
    return courseHeader.includes(props.searchTerm.toLowerCase()) && course.year === year && course.semester === semester
  })

  //Sorts the courses by subject into a dictionary in the format {subject: [...courses]}
  const subjectDict = {}
  validCourses.forEach((course) => {
    if(!(course.subject in subjectDict)) subjectDict[course.subject] = [] //adds the subject to the dictionary if not present
    subjectDict[course.subject].push(course) //adds the course to the dictionary
  })

  //Creates the SubjectTable components used to create the dropdowns within the table
  const rows = Object.keys(subjectDict).sort().map((subject) => {
    subjectDict[subject].sort((courseA, courseB) =>(
      parseInt(courseA.crse) - parseInt(courseB.crse) //sorts the courses within the dictionary by course number
    ))
    return (<SubjectTable key={subject} subject={subject} courses={subjectDict[subject]} onChange={(event, crns) => selectionChanged(event, crns, subject)}/>)
  }) 

  return(
    <div className="col-5 classes-div">
      {Object.keys(props.courses).length>0 ?
        <TableContainer className="table-container" component={Paper} >
          <Table stickyHeader>
            <TableHead>
              <TableRow className = "table-head-row">
                
                <TableCell colSpan={2}>
                  <FormControl >
                    <InputLabel>Year</InputLabel>
                    <Select fullWidth value={year} label="Year" onChange={(event) => setYear(event.target.value)}>
                      {years.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}
                    </Select>
                  </FormControl>
                </TableCell>
              
                <TableCell colSpan={2}>
                  <FormControl >
                    <InputLabel>Semester</InputLabel>
                    <Select fullWidth value={semester} label="Semester" onChange={(event) => setSemester(event.target.value)}>
                        <MenuItem value="FALL">FALL</MenuItem>
                        <MenuItem value="SPRING">SPRING</MenuItem>
                        <MenuItem value="SUMMER">SUMMER</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              
                <TableCell colSpan={2}>
                  <Button onClick={(event) => onButtonClick(event)}>Add Selected Courses</Button>
                </TableCell>

              </TableRow>
            </TableHead>
            {rows}
          </Table>
        </TableContainer>
        : [...Array(10).keys()].map((key) => (
          <Skeleton key={key} variant="text" height={"8.5vh"} sx={{bgcolor : 'grey.500'}}/>
        ))
      }
      
    </div>
  )
}