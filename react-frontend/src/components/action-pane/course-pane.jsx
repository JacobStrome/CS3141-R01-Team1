import {Button, Divider, Grid, Stack, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionButton from './section-button';

export default function CoursePane(props){
    const [sections, setSections] = useState([])
    const [prereqs, setPrereqs] = useState([])

    useEffect(() => {
        const promises = []
            props.course.sections.forEach((section)=>{
                promises.push(axios.get('http://141.219.232.222:8000/api/sections/' + section))
            })
        Promise.all(promises).then((responses)=>{
            const rawSections = responses.map((response)=> response.data)
            console.log(props.currentSemester.id)
            const filteredSections = rawSections.filter((section) => {
                return section.semester === props.currentSemester.id
            })
            console.log(filteredSections)
            setSections(filteredSections)
        }).catch((error) =>{
            console.warn("Failed to fetch sections")
        })
    },[props.currentSemester, props.course])

    useEffect(() => {
        const promises = []
        props.course.prereqs.forEach((prereq) => {
            promises.push(axios.get('http://141.219.232.222:8000/api/courses/' + prereq))
        })
        Promise.all(promises).then((responses) => {
            setPrereqs(responses.map((response)=>response.data))
        }).catch((error) => {
            console.warn("Failed to fetch prereqs")
        })
    },[props.course])

    const prereqButtonClicked = (event, prereq) =>{
        if(props.prereqClicked) props.prereqClicked(event, prereq)
    }

    const getPrereqs = ()=>{
        let splitString = [props.course.prereqString]
        prereqs.forEach((prereq) => {
            const str = prereq.subject + " " + prereq.crse
            const prereqButton = <Button id={prereq.id} onClick={(event) => prereqButtonClicked(event, prereq)}>{str}</Button>
            const newSplitString = []
            splitString.forEach((splitStr) => {
                if(typeof splitStr === "string" && splitStr.indexOf(str)>-1){
                    const split = splitStr.split(str)
                    const splitToAdd = [split[0], prereqButton, split[1]]
                    newSplitString.push(...splitToAdd)
                }
                else{
                    newSplitString.push(splitStr)
                }
            })
            splitString = newSplitString
        })
        return splitString

    }

    return (
        <React.Fragment>
            <Typography padding={1}>
                {props.course.descripton}
            </Typography>
            <Divider orientation="vertical" flexItem />
            {getPrereqs()}
            <Divider orientation="vertical" flexItem />
            <Grid container columnSpacing={2} columns={8} justifyItems="center" alignItems="center" marginTop={0} padding={1}>
                <Grid item xs={1}>
                    <Typography align="center">Name</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography align="center">Credits</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography align="center">Days</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align="center">Time</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align="center">Instructor</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography align="center">Seats Open</Typography>
                </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Stack divider={<Divider orientation="vertical" flexItem />} spacing={2} marginTop="16px" padding={1} sx={{height:"58vh", overflow:"auto"}}>
                {sections.length>0 && sections.map((section) => <SectionButton onClick={(event) => {if(props.sectionClicked) props.sectionClicked(event, section)}} key={section.id} section={section}/>)}
            </Stack>
        </React.Fragment>

    )
}