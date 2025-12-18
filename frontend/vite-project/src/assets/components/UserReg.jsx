import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UserReg.css';
function UserReg() {

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [phonenumber,setPhonenumber]=useState("")
    const [password,setPassword]=useState("")
    const [image,setImage]=useState("")

    const addUser =async(event)=>{
      event.preventDefault()
      const body ={email,name,address,phonenumber,password,image}
      try{ 
        const result =await axios.post("http://localhost:5000/adduser",body)
        console.log(result);
        alert('user registered')
      }catch(error){
        console.log(error);
        alert('try differently')
      }
    }


 return (
    <div className="user-reg-container">

      {/* Left Background Image */}
      <div className="user-reg-left"></div>

      {/* Right Form Section */}
      <div className="user-reg-right">
        <h1>User Registration</h1>

        <Form className="user-reg-form">

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
              onChange={(event)=>setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" 
              onChange={(event)=>setName(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" 
              onChange={(event)=>setAddress(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" 
              onChange={(event)=>setPhonenumber(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
              onChange={(event)=>setPassword(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file"
              onChange={(event)=>setImage(event.target.files[0])} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={addUser}>
            Submit
          </Button>

        </Form>
      </div>
    </div>
  )
}

export default UserReg