import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import React, { useState } from 'react';
import {createTheme, Grid, ThemeProvider } from '@mui/material';
import TableContainer from './components/left-navigation/table-container';


export default function App(props){
  const [navStack, setNavStack] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSemester, setCurrentSemester] = useState({})
  const handleCourseClick = (event, course) =>{
    setNavStack([course])
  }

  const theme = createTheme({ palette: { mode: 'light' } })
  return (
    <div style={{ paddingLeft: 32, paddingRight:32, paddingTop: 16}}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} justifyItems="center" alignItems="center">
          <Navbar onChange={(event) => setSearchTerm(event.target.value)}/>
          <TableContainer searchTerm={searchTerm} onCourseClick={handleCourseClick} onSemChange={setCurrentSemester}/>
        </Grid>
      </ThemeProvider>
    </div>
  )
}