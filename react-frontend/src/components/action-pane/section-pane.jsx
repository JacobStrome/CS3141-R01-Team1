import { Button, Paper } from '@mui/material'
import React, {useState, useEffect} from 'react'

export default function SectionPane(props){

    const addSectionButton = (event) => {
        if(props.addToCalendar) props.addToCalendar(props.section, props.course)
    }

    //<Button onClick={addSection}>Text</Button>
    return(
        <Paper>
            <Button onClick = {(event) => addSectionButton(event)}>Click Me</Button>
        </Paper>
    )
}