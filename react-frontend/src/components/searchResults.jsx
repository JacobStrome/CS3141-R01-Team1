import React from "react"
import '../App.css'

export default class SearchResults extends React.Component {


    render(){
      var tableRows = Object.keys(this.props.courses).map((key, index) =>{
        <tr>
          <classRow class={this.props.courses[key]}/>
        </tr>
      })
      console.log(tableRows)
      return(
          <div class="col-4 classes-div">
          <table>
            <tr>
              <th class="no-border gray-label"> Classes </th>
            </tr>
            {tableRows}
            <tr>
              <td class="table-border">cs3xxx</td>
            </tr>
            <tr>
              <td class="table-border">cs3xxx</td>
            </tr>
            <tr>
              <td class="table-border">cs3xxx</td>
            </tr>
            <tr>
              <td class="table-border">cs3xxx</td>
            </tr>
            <tr>
              <td class="table-border">cs3xxx</td>
            </tr>
          </table>
        </div>
      )
    }
}


class classRow extends React.Component{

    render(){
        return(<td class="table-border">{this.props.courses.name}</td>)
    }
}