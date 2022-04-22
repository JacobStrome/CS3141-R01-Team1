import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import {createTheme, Grid, ThemeProvider } from '@mui/material';
import ActionPane from './components/action-pane/action-pane';
import { jsPDF } from "jspdf";
import NavPanes from './components/navigation';


export default function App(props){
  const [currentCourse, setCurrentCourse] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSemester, setCurrentSemester] = useState({})
  const handleCourseClick = (event, course) =>{
    setCurrentCourse(course)
  }
  const downloadSchedule = ()=>{
    const doc = new jsPDF('l');
    const cal = document.getElementById("calendar");

    if (cal) {
      console.log(cal);
      doc.html(cal).then(()=>{
        doc.save("schedule.pdf");
      })
    }
  }

  const theme = createTheme({ palette: { mode: 'light' } })
  return (
    <div style={{ paddingLeft: 32, paddingRight:32, paddingTop: 16}}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justifyItems="center" alignItems="center">
          <NavPanes downloadSchedule={downloadSchedule} handleCourseClick={handleCourseClick} setSem={(semester) => setCurrentSemester(semester)}/>
          <ActionPane currentCourse={currentCourse} onNavReset={() => setCurrentCourse(undefined)} currentSemester={currentSemester}/>
        </Grid>
      </ThemeProvider>
    </div>
  )
}