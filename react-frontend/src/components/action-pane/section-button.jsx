import { Button, Grid, Typography } from "@mui/material"
import React from "react"

export default function SectionButton(props){

    const getDaysOfWeek = () => {
        let output = ""
        if(props.section.monday) output+="M,"
        if(props.section.tuesday) output+="TU,"
        if(props.section.wednesday) output+="W,"
        if(props.section.thursday) output+="TH,"
        if(props.section.friday) output+="F,"
        return output.slice(0,-1)
    }
    return(
            <Button fullWidth variant={"outlined"} onClick={(event) =>{if(props.onClick) props.onClick(event)}}>
                <Grid container columns={8} spacing ={2} width={"100%"} marginLeft="0px">
                    <Grid item xs={1}>
                        <Typography>{props.section.section}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{props.section.credits}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{getDaysOfWeek()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{props.section.startTime + "-" + props.section.endTime}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{props.section.instructor}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{props.section.availableSeats}</Typography>
                    </Grid>
                </Grid>
            </Button>
    )
}