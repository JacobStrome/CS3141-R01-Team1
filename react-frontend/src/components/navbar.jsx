import React from 'react';
import logo from '../assets/TSPlogo.png';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import DownloadIcon from '@mui/icons-material/Download';


export default class Navbar extends React.Component{

    render(){
        return(
          <React.Fragment>
            <Grid item xs={1}>
              <img id="logo" src={logo}/>
            </Grid>
            <Grid item xs={5}>
              <TextField fullWidth variant="filled" type='search' onChange={this.props.onChange} label='Search for a course' InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}/>
            </Grid>
            <Grid item xs={5}/>
            <Grid item xs={1}>
              <div id="download-button">
                <IconButton aria-label="download schedule" size="large" onClick={this.props.downloadSchedule}>
                  <DownloadIcon/>
                </IconButton>
              </div>
            </Grid>
          </React.Fragment>
        )
    }
}