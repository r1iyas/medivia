import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './AllUsers.css';
import { Container } from 'react-bootstrap';

function AllUsers() {
    const [users,SetUsers]=useState([])

    useEffect(()=>{
        const fetchUsers =async ()=>{
            try{
                const res =await axios.get("http://localhost:5000/viewallusers");
                SetUsers(res.data.result || [])
            }catch (err){
                console.error("error fetching Users:",err);
                
            }
        }
        fetchUsers();
    }, [])
          return (
    <div className="users-maindiv">
      <Container className="users-container mt-4">
        <h2 className="users-title">All Users</h2>

        <div className="users-grid">
          {users.length > 0 ? (
            users.map((user) => (
              <Card key={user._id} className="user-card">
                <div className="user-card-media">
                  {/* Replace src with actual user image if available */}
                  <img
                    className="user-img"
                    src={user.avatar || "/images/placeholder-user.jpg"}
                    alt={user.name}
                  />
                </div>

                <Card.Body>
                  <Card.Title className="user-name">{user.name}</Card.Title>
                  <Card.Subtitle className="user-subtitle">
                    {user.role || "User"}
                  </Card.Subtitle>

                  <Card.Text className="user-info">
                    <strong>Email:</strong> {user.email || "N/A"} <br />
                    <strong>address:</strong> {user.address || "N/A"} <br/>
                    <strong>Phone:</strong> {user.phonenumber || "N/A"}
                    
                  </Card.Text>

                  <Button className="user-btn">View Details</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="users-empty">No users found.</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllUsers