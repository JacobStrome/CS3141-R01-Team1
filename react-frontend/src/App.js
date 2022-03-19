import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import SearchResults from './components/searchResults'
import Calendar from './components/calendar'
import React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';
export class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {courses: [], currentSearch : ""}
  }

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/classes')
    .then((response) => {
      
      this.setState({
      courses : response.data,
      currentSearch : this.state.currentSearch
      })

    }).catch((error) => {
      console.error(error)
    })
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange(event){
    this.setState({
      courses : this.state.courses,
      currentSearch : event.target.value
    })
  }
  render(){
    var theme = createTheme({palette:{mode: 'dark'}})
    return(
      <ThemeProvider theme={theme}>
        <div className="App">
          {/*navbar*/}
          <Navbar onChange = {this.onSearchChange}/>
          <div className="row container p-4">
            {/*Div for class search results*/}
            <SearchResults courses = {this.state.courses} searchTerm = {this.state.currentSearch}/>

            {/*div for calendar*/}
            <Calendar/>
          </div>
        </div>
      </ThemeProvider>
      
    )
  }
}
export default App;
