import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'
import React, {useState} from 'react'

export default function TableRow(props){
    const[open, setOpen] = useState(false) //Sets the initial dropdown to false aka not shown

    return(
        <Grid container columns={4} columnSpacing ={2}>
            <Grid item xs={1}>
                <IconButton aria-label="expand row" size="small" onClick={()=> setOpen(!open)}>
                  {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <div style={{textAlign: "center", display: "flex", height:"100%", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h5'>{props.subject.ticker}</Typography>
                </div>
            </Grid>
        </Grid>

    )
}