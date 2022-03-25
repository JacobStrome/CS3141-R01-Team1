import React, {useState} from "react"
import './searchResults.css'
import {IconButton, Paper, TableCell, TableContainer, TableHead, TableRow, Table, FormControl, Select, InputLabel, MenuItem, Menu, Button} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown, Subject} from '@mui/icons-material'


function CourseTable(props){
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState({})

  const getTimes = (section) =>{
    var outputString = ""
    if(section.time.rrules.length ==0){
      return outputString
    } 

    const daysOfWeek = section.time.rrules[0].config.byDayOfWeek
    daysOfWeek.forEach((day) =>{
      day.includes("T") ? outputString = outputString.concat(day,","): outputString = outputString.concat(day[0],",")
    })
    const startObject = section.time.rrules[0].config.start
    const startTime = new Date(startObject.year, startObject.month, startObject.day, startObject.hour, startObject.minute, startObject.second)
    const endObject = section.time.rrules[0].config.end
    const endTime = new Date(endObject.year, endObject.month, endObject.day, endObject.hour, endObject.minute, endObject.second)
    outputString = outputString.concat(` ${(startTime.getHours()%12 || 12)}:${startTime.getMinutes() || "00"}${startTime.getHours()/12>=1 ? "PM": "AM"}`)
    outputString = outputString.concat(`-${(endTime.getHours()%12 || 12)}:${endTime.getMinutes() || "00"}${endTime.getHours()/12>=1 ? "PM": "AM"}`)
    return outputString
  }

  const onClick = (event, section) => {
    const newSelected = {...selected}
    if(newSelected[section.crn]) delete newSelected[section.crn]
    else{
      newSelected[section.crn] = true
    }

    setSelected(newSelected)
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

function SubjectTable(props){
  const[open, setOpen] = useState(false)
  const[selectedSections, setSelectedSections] = useState({})

  const onCourseSelectionChange = (event, selected, course) =>{
    const newSelectedSections = {...selectedSections}
    newSelectedSections[course.id] = selected

    setSelectedSections(newSelectedSections)
    const crns = []
    Object.values(newSelectedSections).forEach((value) => {
      crns.push(...Object.keys(value))
    })
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

export default function SchedulerTable(props){
  const [year, setYear] = useState(2022);
  const [semester, setSemester] = useState("FALL")
  const [sections, setSections] = useState({})

  const selectionChanged = (event, crns, subject) =>{
    const newSections = {...sections}
    newSections[subject] = crns
    setSections(newSections)
  }

  const onButtonClick = (event) =>{

    if(props.addCourses){
      const crns = []
      Object.values(sections).forEach((value) =>
        crns.push(...value)
      )  
      props.addCourses(event, crns)
    }
  }
  const years = []
  Object.values(props.courses).forEach((course) => {
    if(!years.includes(course.year)) years.push(course.year) 
  })

  const validCourses = Object.values(props.courses).filter((course) => {
    const courseHeader = (course.subject + course.crse + " " + course.title).toLowerCase()
    return courseHeader.includes(props.searchTerm.toLowerCase()) && course.year == year && course.semester == semester
  })

  const subjectDict = {}
  validCourses.forEach((course) => {
    if(!(course.subject in subjectDict)) subjectDict[course.subject] = []
    subjectDict[course.subject].push(course)
  })

  const rows = Object.keys(subjectDict).sort().map((subject) => {
    subjectDict[subject].sort((courseA, courseB) =>(
      parseInt(courseA) - parseInt(courseB)
    ))
    return (<SubjectTable key={subject} subject={subject} courses={subjectDict[subject]} onChange={(event, crns) => selectionChanged(event, crns, subject)}/>)
  }) 

  return(
    <div className="col-5 classes-div">
      <TableContainer className="table-container" component={Paper} >
        <Table stickyHeader>
          <TableHead>
            <TableRow className = "table-head-row">
              {Object.keys(props.courses).length>0 
                ? 
                <TableCell colSpan={2}>
                  <FormControl >
                    <InputLabel>Year</InputLabel>
                    <Select fullWidth value={year} label="Year" onChange={(event) => setYear(event.target.value)}>
                      {years.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}
                    </Select>
                  </FormControl>
                </TableCell>
                : <TableCell colSpan={2}/>
              }
              {Object.keys(props.courses).length>0 
                ?
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
                : <TableCell colSpan={2}/>
              }
              <TableCell colSpan={2}>
                <Button onClick={(event) => onButtonClick(event)}>Add Selected Courses</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          {rows}
        </Table>
      </TableContainer>
    </div>
  )
}