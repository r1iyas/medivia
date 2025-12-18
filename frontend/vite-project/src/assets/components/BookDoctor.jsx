import axios from 'axios';
import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from 'react-router-dom';

function BookDoctor() {

    const { doctorId } = useParams();
    const [date,setDate]=useState("")
    const [timeSlot,setTimeSlot]=useState("")
    const [reason,setReason]=useState("")


    const handleBooking =async (event)=>{
        event.preventDefault();

        const userId=localStorage.getItem("loginuserid")
        const body ={userId,doctorId,date,timeSlot,reason}
        
        try{
            const res=await axios.post("http://localhost:5000/addDoctorBooking",body)
            alert(res.data.message || "appoinment booked successfully!")
        }catch(err){
            console.error("error booking appointment:",err)
            alert("failed to book appointmet. please try again")
        }
    }


  return (
 <div className="container mt-4">
      <h3 className="text-center mb-3">Book Doctor Appointment</h3>
      <Form onSubmit={handleBooking}>
        <Form.Group className="mb-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Time Slot</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., 10:00 AM - 11:00 AM"
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reason for Visit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reason"
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Book Appointment
        </Button>
      </Form>
    </div>
  )
}

export default BookDoctor