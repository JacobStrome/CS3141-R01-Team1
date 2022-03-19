import React from 'react';
import logo from '../assets/TSPlogo.png';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Navbar extends React.Component{

    render(){
        return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" sticky="top">
        <div className="navbar-header">
          {/*logo and title*/}
          <span className="navbar-brand">&nbsp;<img src={logo} alt="logo" id="site-logo"/>&nbsp;Schedule Helper</span>
        </div>
        <div className="container-fluid">
          <ul className="navbar-nav">
          <li>
          <form className="d-flex">
            <div className="input-group">
              {/*search bar*/}
              <input className="form-control" type="search" id="search-bar" placeholder="Search" onChange={this.props.onChange}></input>
              {/*button*/}
              <button className="btn btn-primary" id="search-button" type="button">
              {/*button icon*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" id= "search-icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              </button>
            </div>
          </form>
          </li>
          </ul>
        </div>
      </nav>
        )
    }
}