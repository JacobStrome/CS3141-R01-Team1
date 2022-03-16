import React from "react"
import './searchResults.css'

class classRow extends React.Component{

  render(){
      return(<td class="table-border">{this.props.course.name}</td>)
  }
}
export default class SearchResults extends React.Component {

    render(){
      var tableRows = Object.keys(this.props.courses).filter((key)=> {
        if ((this.props.courses[key].subject+this.props.courses[key].crse +' '+this.props.courses[key].title).toLocaleLowerCase().includes(this.props.searchTerm.toLocaleLowerCase())) return true
        else return false
      }).map((key) =>{
        var courseString = this.props.courses[key].subject+this.props.courses[key].crse +' '+this.props.courses[key].title
          return(
            <tr>
              <td class="table-border">{courseString}</td>
            </tr>
          )
      }
        
      )
      console.log(tableRows)
      return(
          <div class="col-4 classes-div">
          <table>
            <tr>
              <th class="no-border gray-label"> Classes </th>
            </tr>
            {tableRows}
          </table>
        </div>
      )
    }
}


