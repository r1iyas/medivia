import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './UserHome.css'




function UserHome() {
  const  [userdata,setUserdata]=useState({})

  let logid =localStorage.getItem('loginuserid')
  console.log('logId',logid);
  
    const fetchData=async()=>{
      console.log('start');
      
      const result= await axios.get(`http://localhost:5000/userdata/${logid}`)
      console.log(result);
      
      setUserdata(result.data.result)
    }

    useEffect(()=>{
      fetchData()
    },[])
    console.log(userdata);
    
  return (
    
    <div className="userhome-container">
      {userdata._id ? (
        <>
          <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
            <Container>
              <Navbar.Brand href="#home">CureCart</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Login Page</Nav.Link>
                  <Nav.Link as={Link} to={`/AllShopProducts/${userdata._id}`}>
                    View Products
                  </Nav.Link>
                   <Nav.Link as={Link} to={`/AllDoctors/${userdata._id}`}>
                    All Doctors 
                  </Nav.Link>
                   
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className='description'>
                  <h1 className='story-script-regular'>Discover a platform designed for your convenience  <br /> — book appointments with experienced doctors <br /> and explore a 
                    variety of quality products, all in one place. <br /> Stay healthy, shop smart, and make the most of our easy-to-use 
                    services today</h1>
          </div>

          <div className="user-info">
            <h1>UserHome</h1>
            <h1>Name: {userdata.name}</h1>
            <h1>Email: {userdata.email}</h1>
            <h1>Address: {userdata.address}</h1>
            <h1>Phone: {userdata.phonenumber}</h1>
            
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default UserHome