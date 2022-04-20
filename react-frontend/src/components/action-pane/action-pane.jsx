import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActionHeader from './action-header';
import Calendar from './calender/calendar'
import CoursePane from './course-pane';
import SectionPane from './section-pane';
import axios from 'axios'

export default function ActionPane(props){
    const [navStack, setNavStack] =  useState([<Calendar/>])
    const [headerStack, setHeaderStack] = useState(["Calendar"])

    const sectionAddedToCalendar = (section, course)=>{

    }
    const sectionClicked = (event, section, course) => {
        
        const coursePane = <CoursePane course={course} currentSemester={props.currentSemester} sectionClicked={(event, sec) => sectionClicked(event, sec, course)}/>
        const sectionPane = <SectionPane section={section} course = {course} addToCalendar={sectionAddedToCalendar}/>
        const newNavStack = [<Calendar/>,coursePane, sectionPane]
        setNavStack(newNavStack)
        setHeaderStack(["Calendar", course.subject + course.crse + " " + course.title, course.subject + course.crse + " " + course.title])
    }

    useEffect(() => {
        if(props.currentCourse){
            axios.get('http://127.0.0.1:8000/api/courses/' + props.currentCourse).then((response) => {
                setNavStack([<Calendar/>, <CoursePane course={response.data} currentSemester={props.currentSemester} sectionClicked={(event, section) => sectionClicked(event, section, response.data)}/>])
                setHeaderStack(["Calendar", response.data.subject + response.data.crse + " " + response.data.title])
            }).catch((error) => {
                console.warn("Could not fetch course " +props.currentCourse)
            })
        }
        
    }, [props.currentCourse, props.currentSemester])

    useEffect(() => {
        if(props.currentCourse && props.onNavReset && navStack.length == 1) props.onNavReset()
    },[navStack])


    const onBackArrowClicked = () => {
        setNavStack(navStack.slice(0,-1))
        setHeaderStack(headerStack.slice(0,-1))
    }

    return (
        <Grid item xs={8} alignSelf="flex-start" marginTop={4}>
            <Paper sx={{height: "85vh"}}>
                <ActionHeader onBackArrowClicked={(event) => onBackArrowClicked()} currentHeader={headerStack[headerStack.length-1]}/>
                {navStack[navStack.length-1]}
            </Paper>
        </Grid>
    )
}