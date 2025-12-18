import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './DrReg.css';

function DrReg() {
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [clinic,setClinic]=useState("")
    const [address,setAddress]=useState("")
    const [number,setNumber]=useState("")
    const [password,setPassword]=useState("")

   const addDr =async(event)=>{
    event.preventDefault()
   const body={email,name,clinic,address,number,password}
    try{
       const result =await axios.post("http://localhost:5000/addDoctor",body)
       console.log(result);
       alert('added successfully')
    }catch(error) {
        console.log(error);
        
        alert("try again")
    }
   }
   return (
    <div className="dr-reg-root">
      {/* Left: background image + optional text/logo */}
      <div className="dr-reg-left" aria-hidden="true">
        <div className="left-content">
          <h2>Trusted Care</h2>
          <p>Register your clinic and start accepting appointments online.</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="dr-reg-right">
        <div className="dr-reg-card">
          <h1>Doctor Registration</h1>

          <Form onSubmit={addDr}>

            <Form.Group className="mb-3" controlId="dr-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dr-name">
              <Form.Label>Name of Doctor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dr-clinic">
              <Form.Label>Name of Clinic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Clinic name"
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dr-address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Clinic address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dr-number">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Mobile number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dr-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="btn-submit" variant="primary" type="submit">
              SUBMIT
            </Button>

          </Form>

          <div className="dr-reg-note">
            By registering you agree to our terms and privacy policy.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrReg