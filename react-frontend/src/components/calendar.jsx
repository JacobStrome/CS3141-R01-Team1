import React from "react"
import './calendar.css'
export default class Calendar extends React.Component {


    render(){
        return(
            <div className="col-7">
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
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 9am </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 10am </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 11am </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 12pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 1pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 2pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr> 
              <tr>
                <th className="no-border gray-label time-label"> 3pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 4pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 5pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 6pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 7pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 8pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 9pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
              <tr>
                <th className="no-border gray-label time-label"> 10pm </th>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
                <td className="table-border"> - </td>
              </tr>
            </table>
          </div>
        )
    }
}