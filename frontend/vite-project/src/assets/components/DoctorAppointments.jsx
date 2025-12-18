import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";
import './DoctorAppointments.css';

function DoctorAppointments() {

    const [appointments,setAppointments]=useState([]);
    const params =useParams()
    console.log(params);
      let doctorId =params.id

        console.log(doctorId);
        
    useEffect(()=>{
        const fetchAppointments =async ()=>{
            try{
                const res =await axios.get(`http://localhost:5000/getDoctorAppointments/${doctorId}`)
                console.log("Appointments:",res.data);
                setAppointments(res.data)
            }catch(err){
                console.error("error fetching doctor appointments",err);
                   
            }
        }
        fetchAppointments();
    },[doctorId])

    if(appointments.length===0){
       return <p className="text-center mt-4">No appointments found.</p>; 
    }

  return (
       <div className="appointments-container">
      {appointments.map((appt) => (
        <Card key={appt._id} className="appointment-card">
          <Card.Body>
            <Card.Title className="appointment-title">Appointment</Card.Title>
            <Card.Text className="appointment-text">
              <strong>Patient:</strong> {appt.userId?.username || "Unknown"} <br />
              <strong>Date:</strong> {appt.date} <br />
              <strong>Time:</strong> {appt.timeSlot} <br />
              <strong>Reason:</strong> {appt.reason}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default DoctorAppointments