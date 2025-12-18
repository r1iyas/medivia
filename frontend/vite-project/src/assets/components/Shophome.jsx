import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Shophome.css';

function Shophome() {

    const [shopdata,setShopdata]=useState({})

    
   let logid= localStorage.getItem('loginshopId')
   console.log('logId',logid);
    const fetchData=async()=>{
        console.log('start');
        
    const result = await axios.get(`http://localhost:5000/viewdata/${logid}`)
    console.log(result);
    
        setShopdata(result.data.result)
    }
    useEffect(()=>{
        fetchData()
    },[])

    console.log(shopdata);

    
    
  return (
   <div className="shop-container">
      {shopdata._id ? (
        <>
          <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
            <Container>
              
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Login Page</Nav.Link>
                  <Nav.Link as={Link} to={`/Product/${shopdata._id}`}>Add Products</Nav.Link>
                  <Nav.Link as={Link} to={`/ViewProducts/${shopdata._id}`}>View Products</Nav.Link>
                  <Nav.Link as={Link} to={`/BookedInShop/${shopdata._id}`}>View Bookings</Nav.Link>
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="shop-info">Name of shop: {shopdata.nameofshop}</div>
          <div className="shop-info">Address: {shopdata.address}</div>
          <div className="shop-info">Email: {shopdata.email}</div>
          <div className="shop-info">Owner: {shopdata.ownersname}</div>
          <div className="shop-info">Phone: {shopdata.phonenumber}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    
  )
}

export default Shophome