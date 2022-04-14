import {Divider, Grid, Paper, Stack, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionButton from './section-button';

export default function CoursePane(props){
    const [sections, setSections] = useState([])

    useEffect(() => {
        const promises = []
            props.course.sections.forEach((section)=>{
                promises.push(axios.get('http://127.0.0.1:8000/api/sections/' + section))
            })
        Promise.all(promises).then((responses)=>{
            const rawSections = responses.map((response)=> response.data)
            const filteredSections = rawSections.filter((section) => {
                return section.semester == props.currentSemester.id
            })
            setSections(filteredSections)
        }).catch((error) =>{
            console.warn("Failed to fetch sections")
        })
    },[props.currentSemester])
    return (
        <Paper>
            <Stack divider={<Divider orientation="vertical" flexItem />} spacing={2} marginTop="16px">
                <Typography>
                    {props.course.descripton}
                </Typography>
                <Typography>
                    {props.course.prereqs}
                </Typography>
                <Grid container columnSpacing={2} columns={8} justifyItems="center" alignItems="center" marginTop={0}>
                    <Grid item xs={1}>
                        <Typography>Name</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>Credits</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>Days</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Time</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Instructor</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>Seats Open</Typography>
                    </Grid>
                </Grid>
                {sections.length>0 &&
                        sections.map((section) => <SectionButton key={section.id} section={section}/>)
                    }
            </Stack>
        </Paper>
    )
}