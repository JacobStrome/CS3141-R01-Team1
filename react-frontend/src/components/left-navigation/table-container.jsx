import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, {useState} from 'react'

export default function TableContainer(props){
    const [semester, setSemester] = useState(1)
    const [degree, setDegree] = useState(1)
    return (
        <Grid item xs={4} marginTop={4}>
            <Grid container columns={4} spacing={2}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Semester</InputLabel>
                        <Select fullWidth value={semester} label="Semester" onChange={(event) => setSemester(event.target.value)}>
                            <MenuItem value={1}>Fall 2022</MenuItem>
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
            </Grid>

        </Grid>
    )
}