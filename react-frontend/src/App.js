import logo from './assets/TSPlogo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <body>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark" sticky="top">
        <div class="navbar-header">
          <span class="navbar-brand">&nbsp;<img src={logo} alt="logo" id="site-logo"/>&nbsp;Schedule Helper</span>
        </div>
        <div class="container-fluid">
          
          <ul class="navbar-nav">
          <li>
          <form class="d-flex">
            <div class="input-group">
              <input class="form-control" type="search" id="search-bar" placeholder="Search"></input>
              <button class="btn btn-primary" id="search-button" type="button">
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
        <div class="row">
          <div class="col-4">

          </div>
          <div class="col-8">

          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
