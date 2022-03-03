import logo from './assets/TSPlogo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <body>
        {/*navbar*/}
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark" sticky="top">
        <div class="navbar-header">
          {/*logo and title*/}
          <span class="navbar-brand">&nbsp;<img src={logo} alt="logo" id="site-logo"/>&nbsp;Schedule Helper</span>
        </div>
        <div class="container-fluid">
          <ul class="navbar-nav">
          <li>
          <form class="d-flex">
            <div class="input-group">
              {/*search bar*/}
              <input class="form-control" type="search" id="search-bar" placeholder="Search"></input>
              {/*button*/}
              <button class="btn btn-primary" id="search-button" type="button">
              {/*button icon*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" id= "search-icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              </button>
            </div>
          </form>
          </li>
          </ul>
        </div>
      </nav>
        <div class="row container p-4">
          {/*Div for class search results*/}
          <div class="col-4 classes-div">

            <table>
              <tr>
                <th class="no-border gray-label"> Classes </th>
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
              <tr>
                <td class="table-border">cs3xxx</td>
              </tr>
              <tr>
                <td class="table-border">cs3xxx</td>
              </tr>
            </table>
          </div>
          {/*div for calendar*/}
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
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 9am </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 10am </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 11am </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 12pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 1pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 2pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr> 
              <tr>
                <th class="no-border gray-label time-label"> 3pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 4pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 5pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 6pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 7pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 8pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 9pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
              <tr>
                <th class="no-border gray-label time-label"> 10pm </th>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
                <td class="table-border"> - </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
