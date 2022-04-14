import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Divider, Paper, Skeleton } from '@mui/material'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import TableRow from './table-row'

export default function TableContainer(props){
    const [subjects, setSubjects] = useState([])
    const [semesters, setSemesters] = useState([])
    const [semester, setSemester] = useState(undefined)
    const [degree, setDegree] = useState(1)

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/semesters').then((response)=>{
            setSemesters(Object.values(response.data))
        }).catch((error) =>{
            console.warn("Failed to fetch semesters")
        })
        
    },[])

    useEffect(()=>{
        if(semesters.length>0) setSemester(semesters[0])
    },[semesters])

    useEffect(() => {
        if(semesters.length>0){
            axios.get('http://127.0.0.1:8000/api/subjects').then((response)=>{
                const newSubjects = Object.values(response.data)
                newSubjects.forEach((subject)=>{
                    subject.courses = subject.courses.filter((course) => semester.courses.indexOf(course))
                })
                setSubjects(newSubjects)
            }).catch((error) =>{
                console.warn("Failed to fetch subjects")
            })
            if(props.onSemChange) props.onSemChange(semester)
        }
    },[semester])

    const onCourseClick = (event, course) => {
        if(props.onCourseClick) props.onCourseClick(event,course)
    }
    
    return (
        <Grid item xs={4} marginTop={4}>
            {(semesters.length>0 && semester) &&
                <Paper>
                    <Grid container columns={4} spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel>Semester</InputLabel>
                                <Select fullWidth value={semester} label="Semester" onChange={(event) => setSemester(event.target.value)}>
                                    {semesters.map((s) => (<MenuItem key={s.id} value={s}>{s.semester + " " + s.year}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel>Degree</InputLabel>
                                <Select fullWidth value={degree} label="Degree" onChange={(event) => setDegree(event.target.value)}>
                                    <MenuItem value={1}>Computer Engineering</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                
                    <Stack spacing={1} sx={{height: "74vh", overflow: "auto", marginTop: "16px", paddingRight: "16px"}} divider={<Divider orientation="vertical" flexItem />}>
                        {subjects.sort((a,b)=> a.ticker.localeCompare(b.ticker)).map((subject) => (<TableRow key={subject.ticker} searchTerm={props.searchTerm} subject={subject} onCourseClick={onCourseClick}/>))} 
                    </Stack>
                </Paper>
            }
            {semesters.length == 0 && <Skeleton variant="rectangular"  height="80vh"/>}
        </Grid>
    )
}