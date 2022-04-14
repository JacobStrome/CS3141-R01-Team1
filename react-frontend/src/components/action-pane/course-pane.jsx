import {Paper} from '@mui/material';
import React, { useState } from 'react';

export default function CoursePane(props){

    return (
        <Paper>
            {props.course}
        </Paper>
    )
}