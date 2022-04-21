import { Button, Paper, Stack, Box, styled } from '@mui/material'
import React from 'react';

export default function SectionPane(props){

    const addSectionButton = (event) => {
        if(props.addToCalendar) props.addToCalendar(props.section, props.course)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ccc',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <Box elevation={3}>
            <Stack spacing={3}>
                <Item>Section: {props.section.section} CRN: {props.section.crn} <br/>
                Available Seats: {props.section.availableSeats} Total Seats: {props.section.totalSeats}</Item>
                <Item>{props.section.buildingName && `Building: ${props.section.buildingName} Room: ${props.section.room}`}
                {!props.section.buildingName && `Taught Online`} <br/>
                Times: {props.section.startTime + "-" + props.section.endTime}</Item>
                <Item>Prereqs: {props.course.prereqString}</Item>
                <Button Align = "center" variant="contained"
              onClick = {(event) => addSectionButton(event)}>Add Class to Calendar
                </Button>
            </Stack>
        </Box>
    )
}