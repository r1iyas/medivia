import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegModal, setShowRegModal] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShowRegModal(false);
  const handleShow = () => setShowRegModal(true);

  const addLoginData = async (event) => {
    event.preventDefault();
    const body = { email, password };
    
    try {
      const result = await axios.post("http://localhost:5000/addlogindata", body);
      alert("Login successfully");

      const user = result.data.user;

      if (user.role === "shop") {
        localStorage.setItem('loginshopId', user._id);
        navigate('/Shophome');
      } else if (user.role === "user") {
        localStorage.setItem('loginuserid', user._id);
        // assuming your route is /UserHome/:id
        navigate(`/UserHome/${user._id}`);
      } else if (user.role === "doctor") {
        localStorage.setItem('logindoctorid', user._id);
        navigate('/DoctorHome');
      } else if (user.role === "Admin") {
        localStorage.setItem('loginadminid', user._id);
        navigate('/AdminHome');
      }
    } catch (error) {
      console.log(error);
      alert("Login failed, try again");
    }
  };

  return (
    <div className="login-container">
      <h1 className="loginpage">LOGIN PAGE</h1>

      <Form className="login-form" onSubmit={addLoginData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>EMAIL</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <div className="d-flex flex-column align-items-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>

          {/* 👉 Button to open registration modal */}
          <div className="mt-3">
            <span className="me-2">Don't have an account?</span>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={handleShow}
            >
              Register
            </Button>
          </div>
        </div>
      </Form>

      {/* Registration Options Modal */}
      <Modal show={showRegModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register as</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="reg-options">
            <Button
              variant="success"
              className="mb-2 w-100"
              onClick={() => {
                handleClose();
                navigate('/UserReg');
              }}
              aria-label="Register as User"
            >
              Register as User
            </Button>

            <Button
              variant="warning"
              className="mb-2 w-100"
              onClick={() => {
                handleClose();
                navigate('/NewForm');
              }}
              aria-label="Register as Shop"
            >
              Register as Shop
            </Button>

            <Button
              variant="info"
              className="w-100"
              onClick={() => {
                handleClose();
                navigate('/DrReg');
              }}
              aria-label="Register as Doctor"
            >
              Register as Doctor
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginPage;
