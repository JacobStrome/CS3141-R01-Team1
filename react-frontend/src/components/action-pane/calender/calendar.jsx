import React from "react"
import './calendar.css'
export default class Calendar extends React.Component {


  render() {
    return (
      <div id="calendar" className="col-7">
        <table>
          <col className="time-label"></col>
          <col className="calendar-col"></col>
          <col className="calendar-col"></col>
          <col className="calendar-col"></col>
          <col className="calendar-col"></col>
          <col className="calendar-col"></col>
          <tr>
            <th className="time-label"> </th>
            <th className="no-border gray-label"> M </th>
            <th className="no-border gray-label"> T </th>
            <th className="no-border gray-label"> W </th>
            <th className="no-border gray-label"> R </th>
            <th className="no-border gray-label"> F </th>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 8am </th>
            <td className="table-border" id="8amM"> - </td>
            <td className="table-border" id="8amT"> - </td>
            <td className="table-border" id="8amW"> - </td>
            <td className="table-border" id="8amR"> - </td>
            <td className="table-border" id="8amF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 9am </th>
            <td className="table-border" id="9amM"> - </td>
            <td className="table-border" id="9amT"> - </td>
            <td className="table-border" id="9amW"> - </td>
            <td className="table-border" id="9amR"> - </td>
            <td className="table-border" id="9amF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 10am </th>
            <td className="table-border" id="10amM"> - </td>
            <td className="table-border" id="10amT"> - </td>
            <td className="table-border" id="10amW"> - </td>
            <td className="table-border" id="10amR"> - </td>
            <td className="table-border" id="10amF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 11am </th>
            <td className="table-border" id="11amM"> - </td>
            <td className="table-border" id="11amT"> - </td>
            <td className="table-border" id="11amW"> - </td>
            <td className="table-border" id="11amR"> - </td>
            <td className="table-border" id="11amF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 12pm </th>
            <td className="table-border" id="12pmM"> - </td>
            <td className="table-border" id="12pmT"> - </td>
            <td className="table-border" id="12pmW"> - </td>
            <td className="table-border" id="12pmR"> - </td>
            <td className="table-border" id="12pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 1pm </th>
            <td className="table-border" id="1pmM"> - </td>
            <td className="table-border" id="1pmT"> - </td>
            <td className="table-border" id="1pmW"> - </td>
            <td className="table-border" id="1pmR"> - </td>
            <td className="table-border" id="1pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 2pm </th>
            <td className="table-border" id="2pmM"> - </td>
            <td className="table-border" id="2pmT"> - </td>
            <td className="table-border" id="2pmW"> - </td>
            <td className="table-border" id="2pmR"> - </td>
            <td className="table-border" id="2pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 3pm </th>
            <td className="table-border" id="3pmM"> - </td>
            <td className="table-border" id="3pmT"> - </td>
            <td className="table-border" id="3pmW"> - </td>
            <td className="table-border" id="3pmR"> - </td>
            <td className="table-border" id="3pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 4pm </th>
            <td className="table-border" id="4pmM"> - </td>
            <td className="table-border" id="4pmT"> - </td>
            <td className="table-border" id="4pmW"> - </td>
            <td className="table-border" id="4pmR"> - </td>
            <td className="table-border" id="4pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 5pm </th>
            <td className="table-border" id="5pmM"> - </td>
            <td className="table-border" id="5pmT"> - </td>
            <td className="table-border" id="5pmW"> - </td>
            <td className="table-border" id="5pmR"> - </td>
            <td className="table-border" id="5pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 6pm </th>
            <td className="table-border" id="6pmM"> - </td>
            <td className="table-border" id="6pmT"> - </td>
            <td className="table-border" id="6pmW"> - </td>
            <td className="table-border" id="6pmR"> - </td>
            <td className="table-border" id="6pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 7pm </th>
            <td className="table-border" id="7pmM"> - </td>
            <td className="table-border" id="7pmT"> - </td>
            <td className="table-border" id="7pmW"> - </td>
            <td className="table-border" id="7pmR"> - </td>
            <td className="table-border" id="7pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 8pm </th>
            <td className="table-border" id="8pmM"> - </td>
            <td className="table-border" id="8pmT"> - </td>
            <td className="table-border" id="8pmW"> - </td>
            <td className="table-border" id="8pmR"> - </td>
            <td className="table-border" id="8pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 9pm </th>
            <td className="table-border" id="9pmM"> - </td>
            <td className="table-border" id="9pmT"> - </td>
            <td className="table-border" id="9pmW"> - </td>
            <td className="table-border" id="9pmR"> - </td>
            <td className="table-border" id="9pmF"> - </td>
          </tr>
          <tr>
            <th className="no-border gray-label time-label"> 10pm </th>
            <td className="table-border" id="10pmM"> - </td>
            <td className="table-border" id="10pmT"> - </td>
            <td className="table-border" id="10pmW"> - </td>
            <td className="table-border" id="10pmR"> - </td>
            <td className="table-border" id="10pmF"> - </td>
          </tr>
        </table>
      </div>
    )
  }
}