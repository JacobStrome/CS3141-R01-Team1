import React, {useState, useEffect} from "react"
import './scheduler-table.css'
import {Paper, TableCell, TableContainer, TableHead, TableRow, Table, FormControl, Select, InputLabel, MenuItem, Button, Skeleton} from '@mui/material'
import SubjectTable from "./subject-table"
import axios from "axios";


/**
 * Component used to display all the possible sections through nesting the subjects available
 * Also allows for switching which semester is displayed through the use of selction boxes
 * @param {courses: object, searchTerm : string, addCourses: function(event, sectionsToAdd)} props 
 * @returns React.Component
 */
export default function SchedulerTable(props){
  //Setup state variables
  const [semesters, setSemesters] = useState([])
  const [semester, setSemester] = useState({id : 0}); //Sets the default year
  const [sections, setSections] = useState({}) //Initially sets no sections as selected
  
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/api/semesters').then((response)=>{    
      if (semesters !=  Object.values(response.data)){
        setSemesters(Object.values(response.data))
        setSemester(Object.values(response.data)[0])
        console.log(semester)
      }
    })
  }, [])
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
  
  console.log(semester)
  //Finds which courses are valid based on the selected year, semester, and searchTerm
  const validCourses = Object.values(props.courses).filter((course) => {
    const courseHeader = (course.subject + course.crse + " " + course.title).toLowerCase()
    return courseHeader.includes(props.searchTerm.toLowerCase()) && semester.id in course.semester
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
                {semesters.length>0 &&
                  <TableCell colSpan={4}>
                    <FormControl >
                      <InputLabel>Semester</InputLabel>
                      <Select fullWidth value={semester} label="Semester" onChange={(event) => setSemester(event.target.value)}>
                        {semesters.map((s) => (<MenuItem key={s.id} value={s}>{s.semester + " " + s.year}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </TableCell>
                }
                
              
                <TableCell colSpan={2}>
                  <Button onClick={(event) => onButtonClick(event)}>Add Selected Courses</Button>
                </TableCell>

              </TableRow>
            </TableHead>
            {rows}
          </Table>
        </TableContainer>
        : [...Array(10).keys()].map((key) => (
          <Skeleton id="table-skeleton" key={key} variant="text" height={"8.5vh"} sx={{bgcolor : 'grey.500'}}/>
        ))
      }
    </div>
  )
}