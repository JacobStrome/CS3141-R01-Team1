import {Divider, Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import CourseButton from './course-button'

export default function TableRow(props){
    const[open, setOpen] = useState(false) //Sets the initial dropdown to false aka not shown
    const[courses, setCourses] = useState([])

    useEffect(()=> {
        if(open){
            const promises = []
            props.subject.courses.forEach((course)=>{
                promises.push(axios.get('http://141.219.232.222:8000/api/courses/' + Object.keys(course)[0]))
            })
            Promise.all(promises).then((responses)=>{
                const rawCourses = responses.map((response)=> response.data)
                if(props.searchTerm.length!==0) setCourses(rawCourses)
                else setCourses(rawCourses)
            }).catch((error) =>{
                console.warn("Failed to fetch courses")
            })
        }
    }, [open,props.searchTerm, props.subject.courses])
    useEffect(()=> {
        setOpen(false)
    },[props.semester])

    const onCourseClick = (event, course) =>{
        if(props.onCourseClick)
        props.onCourseClick(event, course.id)
    }

    return(
        <Grid container columns={4} spacing={2} width={"100%"} marginLeft={0}>
            <Grid item xs={1}>
                <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
                  {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                </IconButton>
            </Grid>
            <Grid item xs={2}>
                <div style={{textAlign: "center", display: "flex", height:"100%", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h5'>{props.subject.ticker}</Typography>
                </div>
            </Grid>
            <Grid item xs={1}>

            </Grid>
            {(open && courses.length>0) &&
            <React.Fragment>
                <Grid item xs={1}>
                    <Typography align={"center"}>Course Number</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align={"center"}>Course Title</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography align={"center"}>Credits</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Divider orientation="vertical" flexItem />
                </Grid>
                {courses.sort((a,b)=> parseInt(a.crse) - parseInt(b.crse)).map((course) => <CourseButton key={course.id} course={course} onClick={(event) => onCourseClick(event, course)}/>)}
            </React.Fragment> 
            }
        </Grid>

    )
}