import React from 'react'
import './AdminHome.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function AdminHome() {
    let logid =localStorage.getItem('loginadminid')
     console.log('logId',logid);
  return (
    <div className='main-container'>
            <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/">
                    <h4>login Page</h4>
            </Nav.Link>
             <Nav.Link as={Link} to={`/AllDoctors/${logid}`}>
                        <h3>All Doctors</h3>     
                  </Nav.Link>
               <Nav.Link as={Link} to={`/AllShopProducts/${logid}`}>
                        <h3>View Products</h3>    
                  </Nav.Link>    
                  <Nav.Link as={Link} to={`/AllUsers/${logid}`}>
                        <h3>All Users</h3>    
                  </Nav.Link>  

           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
          <div className="admin-description-box">
              <h2 className="admin-desc-title">Welcome, Admin</h2>
               <h3> 
                   Manage users, doctors, shops, and appointments easily from your admin
                 dashboard. You can view all records, approve or remove users, monitor
                  activity, and ensure the platform runs smoothly. Use the navigation above 
                 to access each management section.
           
               </h3>
                
    </div>


      </div>

  )
}

export default AdminHome