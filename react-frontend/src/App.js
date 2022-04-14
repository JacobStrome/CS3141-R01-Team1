import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import React, { useState } from 'react';
import {createTheme, Grid, ThemeProvider } from '@mui/material';
import TableContainer from './components/left-navigation/table-container';
import ActionPane from './components/action-pane/action-pane';


export default function App(props){
  const [currentCourse, setCurrentCourse] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSemester, setCurrentSemester] = useState({})
  const handleCourseClick = (event, course) =>{
    setCurrentCourse(course)
  }
  const theme = createTheme({ palette: { mode: 'light' } })
  return (
    <div style={{ paddingLeft: 32, paddingRight:32, paddingTop: 16}}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justifyItems="center" alignItems="center">
          <Navbar onChange={(event) => setSearchTerm(event.target.value)}/>
          <TableContainer searchTerm={searchTerm} onCourseClick={handleCourseClick} onSemChange={(semester) => setCurrentSemester(semester)}/>
          <ActionPane currentCourse={currentCourse} onNavReset={() => setCurrentCourse(undefined)} currentSemester={currentSemester}/>
        </Grid>
      </ThemeProvider>
    </div>
  )
}