import React, { useEffect, useState } from "react"
import {Paper} from '@mui/material'
import {Scheduler, WeekView, Appointments, AppointmentTooltip, } from '@devexpress/dx-react-scheduler-material-ui'
import './calendar.css'
export default function Calendar(props) {
    const [data, setData] = useState([])

    useEffect(() => {
      console.log(props.sections)
      const newData = []
      props.sections.forEach((sectionData) =>{
        const {section, course}  = sectionData
        const days = []
        if(section.monday) days.push(18)
        if(section.tuesday) days.push(19)
        if(section.wednesday) days.push(20)
        if(section.thursday) days.push(21)
        if(section.friday) days.push(22)
        if(days.length === 0){
          const appointment = {
            startDate : `April 18, 2022 ${section.startTime}`,
            endDate : `April 22, 2022 ${section.endTime}`,
            title: section.section+" "+course.subject + course.crse + " " + course.title,
            id: "  "+section.id,
            allDay: true,
            
          }
          newData.push(appointment)
        }
        days.forEach((day) => {
          const appointment = {
            startDate : `April ${day}, 2022 ${section.startTime}`,
            endDate : `April ${day}, 2022 ${section.endTime}`,
            title: section.section+" "+course.subject + course.crse + " " + course.title,
            id: day+section.id
          }
          newData.push(appointment)
        })
      })
      setData(newData)
    },[props.sections])

    const onDeleteClick = (appData) =>{
      if(props.deleteSection) props.deleteSection(appData.id.slice(2))
    }

    const header = ({children, appointmentData, ...restProps}) => (
      <AppointmentTooltip.Header  {...restProps} showDeleteButton={true} onDeleteButtonClick={() =>onDeleteClick(appointmentData)} />
    )



    return (
      <Paper padding={1} sx={{height:"100%"}}>
        <Scheduler data={data} >
          <WeekView startDayHour={8} endDayHour={22} excludedDays={[0,6]}/>
          <Appointments/>
          <AppointmentTooltip  headerComponent={header}/>
        </Scheduler>
      </Paper>

    )
}