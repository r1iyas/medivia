import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function DoctorHome() {
    const [doctordata,setDotordata]=useState({});
    const logid=localStorage.getItem('logindoctorid');

    console.log('logid:',logid);
    
    const fetchData =async ()=>{
        console.log('fetching doctor data....');
        try{
            const result=await axios.get(`http://localhost:5000/getdoctordata/${logid}`);
            console.log('doctor data fetched:',result);
            setDotordata(result.data.result);
        }catch(error){
            console.error('error fetching doctor data:',error)
        }
        
    }
    useEffect(()=>{
        fetchData();
    },[])
    console.log(doctordata);
    
    
  return (
    <div
     className="shop-container">
      {doctordata._id ? (
        <>
           <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Login Page</Nav.Link>
            <Nav.Link as={Link} to={`/DoctorAppointments/${doctordata._id}`}>
                View Appointments
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
          <h1>doctor's home page</h1>

          <div className="shop-info">Email: {doctordata.email}</div>
          <div className="shop-info">Name: {doctordata.name}</div>
          <div className="shop-info">Name of clinic: { doctordata.clinic}</div>
          <div className="shop-info">Address: {doctordata.address}</div>
          <div className="shop-info">Phone number: {doctordata.number}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default DoctorHome