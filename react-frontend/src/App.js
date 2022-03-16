import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import SearchResults from './components/searchResults'
import Calendar from './components/calendar'
import React from 'react';
import axios from 'axios';
export class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {courses: [], currentSearch : ""}
  }

  componentDidMount(){
    axios.defaults.headers.get = 'Access-Control-Allow-Origin: *'
    axios.get('http://127.0.0.1:8000/api/classes').then((response) => {
      
      this.setState({
      courses : response.data,
      currentSearch : this.state.currentSearch
      })
    });
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange(event){
    this.setState({
      courses : this.state.courses,
      currentSearch : event.target.value
    })
  }
  render(){
    return(
      <div className="App">
      <body>
        {/*navbar*/}
        <Navbar onChange = {this.onSearchChange}/>
        <div class="row container p-4">
          {/*Div for class search results*/}
          <SearchResults courses = {this.state.courses} searchTerm = {this.state.currentSearch}/>

          {/*div for calendar*/}
          <Calendar/>
        </div>
      </body>
    </div>
    )
  }
}
export default App;
