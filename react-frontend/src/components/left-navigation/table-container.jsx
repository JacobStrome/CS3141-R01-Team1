import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import TableRow from './table-row'

export default function TableContainer(props){
    const [subjects, setSubjects] = useState([])
    const [semesters, setSemesters] = useState([])
    const [semester, setSemester] = useState(1)
    const [degree, setDegree] = useState(1)

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/subjects').then((response)=>{
            setSubjects(Object.values(response.data))
        }).catch((error) =>{
            console.warn("Failed to fetch subjects")
        })
        axios.get('http://127.0.0.1:8000/api/semesters').then((response)=>{
            setSemesters(Object.values(response.data))
        }).catch((error) =>{
            console.warn("Failed to fetch semesters")
        })
        
    },[])
    
    return (
        <Grid item xs={4} marginTop={4}>
            <Grid container columns={4} spacing={2} justifyItems="center">
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
                <Grid item xs={4}>
                    <div style={{ borderTop: "2px solid #555 ", marginLeft: 5, marginRight: 5 }}/>
                </Grid>
                {
                subjects.map((subject) => (<TableRow subject={subject}/>))
                }
            </Grid>

        </Grid>
    )
}