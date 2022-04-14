import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActionHeader from './action-header';
import Calendar from './calender/calendar'
import CoursePane from './course-pane';

export default function ActionPane(props){
    const [navStack, setNavStack] =  useState([<Calendar/>])
    const [currentHeader, setCurrentHeader] = useState("Calendar")

    useEffect(() => {
        if(props.currentCourse)
        setNavStack([<Calendar/>, <CoursePane course={props.currentCourse}/>])
    }, [props.currentCourse])

    useEffect(() => {
        if(props.currentCourse && props.onNavReset && navStack.length == 1) props.onNavReset()
    },[navStack])



    return (
        <Grid item xs={8} alignSelf="flex-start" marginTop={4}>
            <Paper sx={{height: "50vh"}}>
                <ActionHeader onBackArrowClicked={(event) => setNavStack(navStack.slice(0,-1))} currentHeader={currentHeader}/>
                {navStack[navStack.length-1]}
            </Paper>
        </Grid>
    )
}