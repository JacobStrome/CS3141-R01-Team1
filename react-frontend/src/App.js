import logo from './assets/TSPlogo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar'
import SearchResults from './components/searchResults'
import Calendar from './components/calendar'

function App() {
  return (
    <div className="App">
      <body>
        {/*navbar*/}
        <Navbar/>
        <div class="row container p-4">
          {/*Div for class search results*/}
          <SearchResults/>
          {/*div for calendar*/}
          <Calendar/>
        </div>
      </body>
    </div>
  );
}

export default App;
