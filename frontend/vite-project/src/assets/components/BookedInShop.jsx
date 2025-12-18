import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './BookedInShop.css';


function BookedInShop() {
  const [bookings,setBookings]=useState([]);
  const {id} =useParams();
  
  useEffect(()=>{
    const fetchBookings = async()=>{
      try{
        const res =await axios.get(`http://localhost:5000/getBookingsByShop/${id}`);
        console.log("Bookings:",res.data);
        setBookings(res.data)
      }catch(err){
        console.error("error fetching bookings:",err)
      }
    };
    fetchBookings();
  },[id]);

  if(bookings.length===0){
     return <p className="text-center mt-4">No bookings found for this shop.</p>;
  }


return (
      <div className='main-bookedinshop'>
           <div className="bookings-container">
      {bookings.map((b) => (
        <Card key={b._id} className="booking-card">
          <Card.Img
            variant="top"
            src={`http://localhost:5000/uploads/${b.productId.image}`}
            alt={b.productId.product}
            className="booking-image"
          />
          <Card.Body>
            <Card.Title className="booking-title">{b.productId.product}</Card.Title>
            <Card.Text className="booking-text">
              <strong>Booked By:</strong> {b.userId?.username || "Unknown User"} <br />
              <strong>Quantity:</strong> {b.quantity} <br />
              <strong>Price:</strong> ₹{b.productId.price} <br />
              <strong>Total:</strong> ₹{b.productId.price * b.quantity}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
      </div>
   
  );
}


export default BookedInShop