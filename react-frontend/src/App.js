import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import SchedulerTable from './components/scheduler-table/scheduler-table'
import Calendar from './components/calender/calendar'
import React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';
export class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { courses: [], currentSearch: "", currentSections: {} }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/classes')
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
    var theme = createTheme({ palette: { mode: 'dark' } })
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {/*navbar*/}
          <Navbar onChange={this.onSearchChange} />
          <div className="row container p-4">
            {/*Div for class search results*/}
            <SchedulerTable courses={this.state.courses} searchTerm={this.state.currentSearch} addCourses={this.addCourses} />
            {/*div for calendar*/}
            <Calendar sections={this.state.currentSections} />
          </div>
        </div>
      </ThemeProvider>

    )
  }
}
export default App;
