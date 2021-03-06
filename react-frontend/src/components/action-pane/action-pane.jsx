import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActionHeader from './action-header';
import Calendar from './calender/calendar'
import CoursePane from './course-pane';
import SectionPane from './section-pane';
import axios from 'axios'

export default function ActionPane(props){
    const [calendarSections, setCalendarSections] = useState([])
    const [currentSection, setCurrentSection] = useState(undefined)
    const [currentCourse, setCurrentCourse] = useState(undefined)

    console.count("Action Rerender")
    useEffect(() => {
        if(props.currentCourse){
            axios.get('http://141.219.232.222:8000/api/courses/' + props.currentCourse).then((response) => {
                setCurrentCourse(response.data)
                setCurrentSection(undefined)
            }).catch((error) => {
                console.warn("Could not fetch course " +props.currentCourse)
            })
        }
        
    }, [props.currentCourse, props.currentSemester])

    const onBackArrowClicked = () => {
        if(currentSection) setCurrentSection(undefined)
        else {
            setCurrentCourse(undefined)
            if(props.onNavReset) props.onNavReset()
        }
    }

    const sectionAddedToCalendar = (section, course)=>{
        const calendarData = {
            section : section,
            course : course
        }
        const newSections = [...calendarSections, calendarData]
        setCalendarSections(newSections)
    }

    const sectionClicked = (event, section, course) => {
        setCurrentSection(section)
    }

    const deleteSection = (sectionId)=>{
        const newSections = calendarSections.filter((obj)=> obj.section.id !== sectionId)
        setCalendarSections(newSections)
    }


    const coursePane = currentCourse ? <CoursePane course={currentCourse} currentSemester={props.currentSemester} prereqClicked={(event,prereq) => setCurrentCourse(prereq)} sectionClicked={(event, section) => sectionClicked(event, section, currentCourse)}/> : undefined
    const sectionPane = currentSection ? <SectionPane section={currentSection} course = {currentCourse} addToCalendar={sectionAddedToCalendar}/> : undefined

    const paneToDisplay = sectionPane ?? coursePane

    const elementToDisplay = paneToDisplay ?? <Calendar sections={calendarSections} deleteSection={(sectionId) => deleteSection(sectionId)}/>
    const headerToDisplay = paneToDisplay ? currentCourse.subject + currentCourse.crse + " " + currentCourse.title : "Calendar"
    
    return (
        <Grid item xs={8} alignSelf="flex-start" marginTop={4}>
            <Paper sx={{height: "80vh"}}>
                <ActionHeader onBackArrowClicked={(event) => onBackArrowClicked()} currentHeader={headerToDisplay}/>
                {elementToDisplay}
            </Paper>
        </Grid>
    )
}