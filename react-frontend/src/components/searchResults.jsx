import React from "react"
import './searchResults.css'

class classRow extends React.Component{

  render(){
      return(<td class="table-border">{this.props.course.name}</td>)
  }
}
export default class SearchResults extends React.Component {

    render(){
      var tableRows = Object.keys(this.props.courses).map((key) =>
        <tr>
          <td class="table-border">{ this.props.courses[key].subject+this.props.courses[key].crse +' '+this.props.courses[key].title}</td>
        </tr>
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


