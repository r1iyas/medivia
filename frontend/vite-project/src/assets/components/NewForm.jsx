import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './NewForm.css';

function NewForm() {

  const [email,setEmail]=useState("")
  const [ownersname,setOwnersname]=useState("")
  const [nameofshop,setNameofshop]=useState("")
  const [address,setAddress]=useState("")
  const [phonenumber,setPhonenumber]=useState("")
  const [password,setPassword]=useState("")

  const addShop= async(event)=>{
    event.preventDefault()
    const body={email,ownersname,nameofshop,address,phonenumber,password}
    try{
      const result=await axios.post("http://localhost:5000/addshop",body)
      console.log(result);
      alert('added successfully')
    }catch(error) {
      console.log(error);
      alert('try diffrent name')
    }
  }

  return (
    <div className="newform-root">
      {/* Left panel with background image */}
      <div className="newform-left" aria-hidden="true">
        <div className="left-content">
          <h2>Open Your Shop</h2>
          <p>Register your shop and start listing products for customers to browse and buy.</p>
        </div>
      </div>

      {/* Right panel: registration form */}
      <div className="newform-right">
        <div className="newform-card">
          <h1>Shop Registration</h1>

          <Form onSubmit={addShop}>

            <Form.Group className="mb-3" controlId="shop-email">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="shop-owner">
              <Form.Label>OWNER'S NAME</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of owner"
                value={ownersname}
                onChange={(e) => setOwnersname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="shop-name">
              <Form.Label>NAME OF SHOP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of shop"
                value={nameofshop}
                onChange={(e) => setNameofshop(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="shop-address">
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="shop-phone">
              <Form.Label>PHONE NUMBER</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="shop-password">
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="btn-submit" variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <div className="newform-note">
            By registering, you agree to our terms and privacy policy.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewForm