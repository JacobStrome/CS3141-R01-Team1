import React, { useState } from 'react';
import Navbar from './navbar'
import TableContainer from './left-navigation/table-container';


export default function NavPanes(props) {
    const [searchTerm, setSearchTerm] = useState("")

    return(
        <React.Fragment>
            <Navbar onChange={(event) => setSearchTerm(event.target.value)} downloadSchedule={() => {if(props.downloadSchedule)props.downloadSchedule()}}/>
            <TableContainer searchTerm={searchTerm} onCourseClick={(event,course)=>{if(props.handleCourseClick)props.handleCourseClick(event,course)}} onSemChange={(semester) => {if(props.setSem)props.setSem(semester)}}/>
        </React.Fragment>
    )
}