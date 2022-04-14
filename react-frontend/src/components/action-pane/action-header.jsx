import { Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function ActionHeader(props){

    return (
        <Paper>
            <Grid container columnSpacing={2} columns={8} justifyItems="center" alignItems="center" marginTop={0}>
                <Grid item xs={1}>
                    <IconButton aria-label="download schedule" size="large" onClick={props.onBackArrowClicked}>
                          <ArrowBack/>
                    </IconButton>
                </Grid>
                <Grid item  xs={6}>
                <div style={{textAlign: "center", display: "flex", height:"100%", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h4'>{props.currentHeader}</Typography>
                </div>
                </Grid>
            </Grid>
        </Paper>
    )
}