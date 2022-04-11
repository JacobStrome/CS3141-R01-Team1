import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'
import React, {useState} from 'react'

export default function TableRow(props){
    const[open, setOpen] = useState(false) //Sets the initial dropdown to false aka not shown

    return(
        <React.Fragment>
            <Grid item xs={1}>
                <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
                  {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <Typography justifyContent={"center"}>{props.subject.ticker}</Typography>
            </Grid>
        </React.Fragment>

    )
}