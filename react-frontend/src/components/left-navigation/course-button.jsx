import { Button, Grid, Typography } from "@mui/material"
import React from "react"

export default function CourseButton(props){

    return(
        <Grid item xs={4}>
            <Button fullWidth variant={"outlined"} onClick={(event) =>{if(props.onClick) props.onClick(event)}}>
                <Grid container columns={4} spacing ={2} marginLeft={0} width={"100%"}>
                    <Grid item xs={1}>
                        <Typography>{props.course.crse}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{props.course.title}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{props.course.credits}</Typography>
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    )
}