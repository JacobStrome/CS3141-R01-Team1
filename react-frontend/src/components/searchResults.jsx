import React from "react"
import './searchResults.css'
import {IconButton, Paper, TableCell, TableContainer, TableHead, TableRow, Table, Collapse} from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'
class SubTable extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      open : false,
    }
  }
  render(){
    return(
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={()=> this.setState({open: !this.state.open})}>
              {this.state.open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {this.props.subject}
          </TableCell>
          <TableCell/>
        </TableRow>
        {this.state.open && this.props.courses.map((course) =>(
          <TableRow>
              <TableCell/>
              <TableCell>{course.subject+course.crse+" " + course.title}</TableCell>
              <TableCell>{course.maxCredits}</TableCell>
          </TableRow>
          
        ))}
      </React.Fragment>
    )
  }
}
export default class SearchResults extends React.Component {

    constructor(props){
      super(props);

      this.getRowsFromKeys = this.getRowsFromKeys.bind(this)
    }
    getRowsFromKeys(){
      var validCourses = Object.keys(this.props.courses).filter((key)=> {
        if ((this.props.courses[key].subject+this.props.courses[key].crse +' '+this.props.courses[key].title).toLocaleLowerCase().includes(this.props.searchTerm.toLocaleLowerCase())) return true
        else return false
      })
      var subjectDict = {};
      validCourses.forEach((courseId) =>{
        var course = this.props.courses[courseId]
        if(!(course.subject in subjectDict))
          subjectDict[course.subject] = []
        subjectDict[course.subject].push(course)
      })
      var rows = Object.keys(subjectDict).map((key)=>
        <SubTable subject={key} courses={subjectDict[key]}/>
      )
      console.log(rows)
      return rows
    }
    render(){
      var tableRows = this.getRowsFromKeys()

      return(
        <div className="col-4 classes-div">
          <TableContainer component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell/>
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


