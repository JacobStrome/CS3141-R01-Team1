import React from "react"
import './calendar.css'
export default class Calendar extends React.Component {


    render(){
        return(
            <div class="col-8">
            <table>
              <col class="time-label"></col>
              <col class="calendar-col"></col>
              <col class="calendar-col"></col>
              <col class="calendar-col"></col>
              <col class="calendar-col"></col>
              <col class="calendar-col"></col>
              <tr>
                <th class="time-label"> </th>
                <th class="no-border gray-label"> M </th>
                <th class="no-border gray-label"> T </th>
                <th class="no-border gray-label"> W </th>
                <th class="no-border gray-label"> R </th>
                <th class="no-border gray-label"> F </th>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 8am </th>
                <td class="table-border" id="8amM"> - </td>
                <td class="table-border" id="8amT"> - </td>
                <td class="table-border" id="8amW"> - </td>
                <td class="table-border" id="8amR"> - </td>
                <td class="table-border" id="8amF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 9am </th>
                <td class="table-border" id="9amM"> - </td>
                <td class="table-border" id="9amT"> - </td>
                <td class="table-border" id="9amW"> - </td>
                <td class="table-border" id="9amR"> - </td>
                <td class="table-border" id="9amF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 10am </th>
                <td class="table-border" id="10amM"> - </td>
                <td class="table-border" id="10amT"> - </td>
                <td class="table-border" id="10amW"> - </td>
                <td class="table-border" id="10amR"> - </td>
                <td class="table-border" id="10amF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 11am </th>
                <td class="table-border" id="11amM"> - </td>
                <td class="table-border" id="11amT"> - </td>
                <td class="table-border" id="11amW"> - </td>
                <td class="table-border" id="11amR"> - </td>
                <td class="table-border" id="11amF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 12pm </th>
                <td class="table-border" id="12pmM"> - </td>
                <td class="table-border" id="12pmT"> - </td>
                <td class="table-border" id="12pmW"> - </td>
                <td class="table-border" id="12pmR"> - </td>
                <td class="table-border" id="12pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 1pm </th>
                <td class="table-border" id="1pmM"> - </td>
                <td class="table-border" id="1pmT"> - </td>
                <td class="table-border" id="1pmW"> - </td>
                <td class="table-border" id="1pmR"> - </td>
                <td class="table-border" id="1pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 2pm </th>
                <td class="table-border" id="2pmM"> - </td>
                <td class="table-border" id="2pmT"> - </td>
                <td class="table-border" id="2pmW"> - </td>
                <td class="table-border" id="2pmR"> - </td>
                <td class="table-border" id="2pmF"> - </td>
              </tr> 
              <tr>
                <th class="no-border gray-label time-label"> 3pm </th>
                <td class="table-border" id="3pmM"> - </td>
                <td class="table-border" id="3pmT"> - </td>
                <td class="table-border" id="3pmW"> - </td>
                <td class="table-border" id="3pmR"> - </td>
                <td class="table-border" id="3pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 4pm </th>
                <td class="table-border" id="4pmM"> - </td>
                <td class="table-border" id="4pmT"> - </td>
                <td class="table-border" id="4pmW"> - </td>
                <td class="table-border" id="4pmR"> - </td>
                <td class="table-border" id="4pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 5pm </th>
                <td class="table-border" id="5pmM"> - </td>
                <td class="table-border" id="5pmT"> - </td>
                <td class="table-border" id="5pmW"> - </td>
                <td class="table-border" id="5pmR"> - </td>
                <td class="table-border" id="5pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 6pm </th>
                <td class="table-border" id="6pmM"> - </td>
                <td class="table-border" id="6pmT"> - </td>
                <td class="table-border" id="6pmW"> - </td>
                <td class="table-border" id="6pmR"> - </td>
                <td class="table-border" id="6pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 7pm </th>
                <td class="table-border" id="7pmM"> - </td>
                <td class="table-border" id="7pmT"> - </td>
                <td class="table-border" id="7pmW"> - </td>
                <td class="table-border" id="7pmR"> - </td>
                <td class="table-border" id="7pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 8pm </th>
                <td class="table-border" id="8pmM"> - </td>
                <td class="table-border" id="8pmT"> - </td>
                <td class="table-border" id="8pmW"> - </td>
                <td class="table-border" id="8pmR"> - </td>
                <td class="table-border" id="8pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 9pm </th>
                <td class="table-border" id="9pmM"> - </td>
                <td class="table-border" id="9pmT"> - </td>
                <td class="table-border" id="9pmW"> - </td>
                <td class="table-border" id="9pmR"> - </td>
                <td class="table-border" id="9pmF"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 10pm </th>
                <td class="table-border" id="10pmM"> - </td>
                <td class="table-border" id="10pmT"> - </td>
                <td class="table-border" id="10pmW"> - </td>
                <td class="table-border" id="10pmR"> - </td>
                <td class="table-border" id="10pmF"> - </td>
              </tr>
            </table>
          </div>
        )
    }
}