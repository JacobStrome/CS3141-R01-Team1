import React, {useState} from "react"
import './searchResults.css'
import {IconButton, Paper, TableCell, TableContainer, TableHead, TableRow, Table, FormControl, Select, InputLabel, MenuItem, Menu} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'

function SubjectTable(props){
  const[open, setOpen] = useState(false)

  return(
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.subject}
        </TableCell>
        <TableCell/>
        <TableCell/>
      </TableRow>
      {open && props.courses.map((course) =>(
        <TableRow>
            <TableCell>{course.subject+course.crse}</TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell/>
            <TableCell>{course.maxCredits}</TableCell>
        </TableRow>
        
      ))}
    </React.Fragment>
  )
  }

export default class SearchResults extends React.Component {

    constructor(props){
      super(props);

      this.getRowsFromKeys = this.getRowsFromKeys.bind(this)
      this.state = {
        year : 2022,
        semester : "FALL"
      }
    }

    getGivenYears(){
      var years = []
      Object.keys(this.props.courses).forEach((key) => {
        if(!years.includes(this.props.courses[key].year)) years.push(this.props.courses[key].year)
      })
      return years;
    }
    getRowsFromKeys(){
      var validCourses = Object.keys(this.props.courses).filter((key)=> {
        if ((this.props.courses[key].subject+this.props.courses[key].crse +' '+this.props.courses[key].title)
              .toLocaleLowerCase().includes(this.props.searchTerm.toLocaleLowerCase())
             && this.props.courses[key].year == this.state.year 
             && this.props.courses[key].semester == this.state.semester) return true

        else return false
      })
      var subjectDict = {};
      validCourses.forEach((courseId) =>{
        var course = this.props.courses[courseId]
        if(!(course.subject in subjectDict))
          subjectDict[course.subject] = []
        subjectDict[course.subject].push(course)
      })
      
      var rows = Object.keys(subjectDict).sort().map((key)=>{
        subjectDict[key] = subjectDict[key].sort((courseA, courseB) =>{
          let crseA = parseInt(courseA.crse);
          let crseB = parseInt(courseB.crse);
          return crseA - crseB;
        })
        return (<SubjectTable subject={key} courses={subjectDict[key]}/>)
      }
        
      )
      console.log(validCourses)
      console.log(this.state.semester)
      return rows
    }
    
    render(){
      var tableRows = this.getRowsFromKeys()

      return(
        <div className="col-5 classes-div">
          <TableContainer className="table-container" component={Paper} >
            <Table stickyHeader>
              <TableHead>
                <TableRow className = "table-head-row">
                  {Object.keys(this.props.courses).length>0 
                    ? 
                    <TableCell>
                      <FormControl >
                        <InputLabel>Year</InputLabel>
                        <Select value={this.state.year} label="Year" onChange={(event) => this.setState({year: event.target.value, semester: this.state.semester})}>
                          {this.getGivenYears().map((year) => (
                            <MenuItem value={year}>{year}</MenuItem>
                          ))
                          }
                        </Select>
                      </FormControl>
                      
                    </TableCell>
                    : <TableCell/>
                  }
                  {Object.keys(this.props.courses).length>0 
                    ?
                    <TableCell>
                      <FormControl >
                        <InputLabel>Semester</InputLabel>
                        <Select value={this.state.semester} label="Semester" onChange={(event) => this.setState({year: this.state.year, semester: event.target.value})}>
                            <MenuItem value="FALL">FALL</MenuItem>
                            <MenuItem value="SPRING">SPRING</MenuItem>
                            <MenuItem value="SUMMER">SUMMER</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    : <TableCell/>
                  }
                  <TableCell>Course Title</TableCell>
                  <TableCell align="right"> Credits </TableCell>
                </TableRow>
              </TableHead>
              {tableRows}
            </Table>

          </TableContainer>
        </div>
      )
    }
}


