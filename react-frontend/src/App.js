import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import SchedulerTable from './components/scheduler-table/scheduler-table'
import Calendar from './components/calender/calendar'
import React from 'react';
import axios from 'axios';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import TableContainer from './components/left-navigation/table-container';
export class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { courses: [], currentSearch: "", currentSections: {} }
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/courses')
      .then((response) => {

        this.setState({
          courses: response.data,
          currentSearch: this.state.currentSearch,
          currentSections: this.state.currentSections
        })

      }).catch((error) => {
        console.warn("Failed to fetch courses")
      })
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange(event) {
    this.setState({
      courses: this.state.courses,
      currentSearch: event.target.value,
      currentSections: this.state.currentSections
    })
  }
  addCourses(event, sections) {
    this.setState({
      courses: this.state.courses,
      currentSearch: this.state.currentSearch,
      currentSections: sections
    })
  }
  render() {
    var theme = createTheme({ palette: { mode: 'light' } })
    return (
      <div style={{ paddingLeft: 32, paddingRight:32, paddingTop: 16}}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} justifyItems="center" alignItems="center">
            <Navbar onChange={this.onSearchChange}/>
            <TableContainer/>
          </Grid>
        </ThemeProvider>
      </div>


    )
  }
}
export default App;
