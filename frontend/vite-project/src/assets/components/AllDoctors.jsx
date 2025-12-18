import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './AllDoctors.css'

function AllDoctors() {
    const [doctors,setDoctors] =useState([])

    const navigate =useNavigate();
    
        useEffect(()=>{
            const fetchDoctors =async ()=>{
                try{
                    const res =await axios.get("http://localhost:5000/viewAllDoctors")
                    setDoctors(res.data.result || [] )

                }catch(err){
                    console.error("error fetching doctors:",err)
                }
            }
            fetchDoctors();
        },[]);
    


  return (
    <div className='maindiv'>

      <Button
          className="back-dribbble"
          variant="secondary"
          onClick={() => navigate(`/UserHome/${userId}`)}
        >
          Back to Home
        </Button>
        
        <Container className="doctors-container mt-4">
    <h2 className="doctors-title">Available Doctors</h2>

    {/* Use grid wrapper for consistent spacing; you may keep Row/Col if preferred */}
    <div className="doctors-grid">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <Card key={doctor._id} className="doctor-card">
            <Card.Body>
              <Card.Title className="doctor-title">{doctor.name}</Card.Title>
              <Card.Subtitle className="doctor-subtitle">
                {doctor.clinic}
              </Card.Subtitle>

              <Card.Text className="doctor-info">
                📍 <strong>Address:</strong> {doctor.address} <br />
                📞 <strong>Phone:</strong> {doctor.number}
              </Card.Text>

              <Link to={`/BookDoctor/${doctor._id}`}>
                <Button className="doctor-btn">Book Appointment</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="doctors-empty">No doctors available at the moment.</div>
      )}
    </div>
  </Container>
    </div>

   
  )
}

export default AllDoctors