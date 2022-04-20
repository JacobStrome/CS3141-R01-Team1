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
                promises.push(axios.get('http://127.0.0.1:8000/api/sections/' + section))
            })
        Promise.all(promises).then((responses)=>{
            const rawSections = responses.map((response)=> response.data)
            const filteredSections = rawSections.filter((section) => {
                return section.semester === props.currentSemester.id
            })
            setSections(filteredSections)
        }).catch((error) =>{
            console.warn("Failed to fetch sections")
        })
    },[props.currentSemester, props.course])

    useEffect(() => {
        const promises = []
        props.course.prereqs.forEach((prereq) => {
            promises.push(axios.get('http://127.0.0.1:8000/api/courses/' + prereq))
        })
        Promise.all(promises).then((responses) => {
            setPrereqs(responses.map((response)=>response.data))
        }).catch((error) => {
            console.warn("Failed to fetch prereqs")
        })
    },[props.course])

    const prereqButtonClicked = (event, prereq) =>{

    }

    const getPrereqs = ()=>{
        return " "
        const prereqsAsStrings = prereqs.map((prereq) => prereq.subject + " " + prereq.crse)
        const indexes = prereqsAsStrings.map((str) => props.courses.prereqString.indexOf(str))

        const finalJSX = []
        const replacePrereqWithButton = (string, prereq) => {
            const buttonText = prereq.subject + " " + prereq.crse
            const indexToReplace = string.indexOf(buttonText)
            if(indexToReplace>0){
                console.log("Found:" + buttonText)
                finalJSX.push(
                    <React.Fragment>{string.slice(0,indexToReplace)}</React.Fragment>
                )
                finalJSX.push(
                    <Button id={prereq.id} onClick={(event) => prereqButtonClicked(event, prereq)}>{buttonText}</Button>
                )
                return string.slice(indexToReplace+buttonText.length+1)
            }
            return string
        }

        const endString = prereqs.reduce(replacePrereqWithButton, props.course.prereqString)
        finalJSX.push(<React.Fragment>{endString}</React.Fragment>)

        return (
            <React.Fragment>
                {finalJSX}
            </React.Fragment>
        )
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