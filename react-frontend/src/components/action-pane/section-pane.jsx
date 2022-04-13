import { Button, Paper } from '@mui/material'
import React, {useState, useEffect} from 'react'
export default function SectionPane(props){
    const [section, setSection] = useState({})
    const [course, setCourse] = useState({})

    const addSection = (event) => {

        
        props.addSection(event, section.id)
    }
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/sections/' + props.section).then((response)=>{
            setSection(response.data)
        }).catch((error) =>{
            console.warn("Failed to fetch section")
        })
        axios.get('http://127.0.0.1:8000/api/courses/' + props.course).then((response)=>{
            setCourse(response.data)
        }).catch((error) =>{
            console.warn("Failed to fetch course")
        })
        
    },[props.section, props.course])

    //<Button onClick={addSection}>Text</Button>
    return(
        <Paper>
            
        </Paper>
    )
}