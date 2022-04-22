import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Divider, Paper, Skeleton } from '@mui/material'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import TableRow from './table-row'

export default function TableContainer(props){
    
    const [subjects, setSubjects] = useState([])
    const [filteredSubjects, setFilteredSubjects] = useState([])
    const [semesters, setSemesters] = useState([])
    const [semester, setSemester] = useState(undefined)
    const [degree, setDegree] = useState(1)
    const semChange = props.onSemChange

    console.log(semester)
    useEffect(()=>{
        axios.get('http://141.219.232.222:8000/api/semesters').then((response)=>{
            setSemesters(Object.values(response.data))
        }).catch((error) =>{
            console.warn("Failed to fetch semesters")
        })
        axios.get('http://141.219.232.222:8000/api/subjects').then((response) => {
            setSubjects(Object.values(response.data))
        }).catch((error) =>{
            console.warn("Failed to fetch subjects")
        })
        
    },[])

    useEffect(()=>{
        if(semester && props.onSemChange) props.onSemChange(semester)
    },[semester])

    useEffect(()=>{
        if(semesters.length>0) setSemester(semesters[0])
    },[semesters])

    useEffect(()=> {
        const filterBySearchTerm = (course) =>{
            const courseId = Object.keys(course)[0]
            const courseTitle = course[courseId].trim().toLowerCase()
    
            return courseTitle.indexOf(props.searchTerm.trim().toLowerCase())!== -1 || props.searchTerm.length ==0
        }
    
        const filterBySemester = (course) => {
            const courseId = Object.keys(course)[0]
            
            return semester == undefined || semester.courses.indexOf(courseId)>-1 
        }
    
        const  newFilteredSubjects = []
        subjects.forEach((subject)=> {
            const newSubject = {...subject}

            const temp = newSubject.courses.filter(filterBySemester)
            newSubject.courses = temp.filter(filterBySearchTerm)
            if(newSubject.courses.length>0)
                newFilteredSubjects.push(newSubject)
        })
        setFilteredSubjects(newFilteredSubjects)
    }, [props.searchTerm, subjects])

    const onCourseClick = (event, course) => {
        if(props.onCourseClick) props.onCourseClick(event,course)
    }

    
    return (
        <Grid item xs={4} marginTop={4} >
            {(semesters.length>0 && semester) &&
                <Paper>
                    <Grid container columns={4} spacing={0} width="95%" marginLeft="2.5%" paddingTop="2vh" height="8vh">
                        <Grid item xs={2} paddingRight="16px">
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
                
                    <Stack spacing={1} sx={{height: "75vh", overflow: "auto", marginTop: "16px", paddingRight: "16px"}} divider={<Divider orientation="vertical" flexItem />}>
                        {filteredSubjects.sort((a,b)=> a.ticker.localeCompare(b.ticker)).map((subject) => (<TableRow key={subject.ticker} searchTerm={props.searchTerm} subject={subject} semester={semester} onCourseClick={onCourseClick}/>))} 
                    </Stack>
                </Paper>
            }
            {semesters.length === 0 && <Skeleton variant="rectangular"  height="80vh"/>}
        </Grid>
    )
}