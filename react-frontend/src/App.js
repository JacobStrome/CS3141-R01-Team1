import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import React, { useState } from 'react';
import {createTheme, Grid, ThemeProvider } from '@mui/material';
import TableContainer from './components/left-navigation/table-container';
import ActionPane from './components/action-pane/action-pane';
import { jsPDF } from "jspdf";


export default function App(props){
  const [currentCourse, setCurrentCourse] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSemester, setCurrentSemester] = useState({})
  const handleCourseClick = (event, course) =>{
    setCurrentCourse(course)
  }
  const downloadSchedule = ()=>{
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const cal = document.getElementById("calendar");

    if (cal) {
      console.log(cal);
      doc.html(cal).then(()=>{
        doc.save("schedule.pdf");
      })
    }
  }
  const theme = createTheme({ 
    mode:'light',
    palette: { 
      primary: {
        main: '#104dc7',
      },
      secondary: {
        main: '#7e8187',
      }
    }
  })



  return (
    <div style={{ paddingLeft: 32, paddingRight:32, paddingTop: 16}}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justifyItems="center" alignItems="center">
          <Navbar onChange={(event) => setSearchTerm(event.target.value)} downloadSchedule={downloadSchedule}/>
          <TableContainer searchTerm={searchTerm} onCourseClick={handleCourseClick} onSemChange={(semester) => setCurrentSemester(semester)}/>
          <ActionPane currentCourse={currentCourse} onNavReset={() => setCurrentCourse(undefined)} currentSemester={currentSemester}/>
        </Grid>
      </ThemeProvider>
    </div>
  )
}