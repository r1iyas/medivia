  import axios from 'axios';
  import React, { useEffect, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom';
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import './AllShopProducts.css';
  

  function AllShopProducts() {
      const [products,setProducts]=useState([]);
      const {id}=useParams();
      const userId=localStorage.getItem("loginuserid");

      const navigate =useNavigate();
      useEffect(()=>{
          const fetchAllproducts =async()=>{
              console.log("fetching products for shop",id);
              
              try{
                  const res=await axios.get("http://localhost:5000/getAllProducts")
                  console.log(res);
                  
                  setProducts(res.data);
              }catch (err){
                  console.error("error fetching all products:",err);
                  
              }
          };
          fetchAllproducts();
      },[id]);

      const handleBooking =async (productId,shopId)=>{
        try{
          const quantity =1;
          const res =await axios.post("http://localhost:5000/addBooking",{
            userId,
            productId,
            shopId,
            quantity
          })
          alert(res.data.message || "booking successfull")
        }catch(err){
          console.error("error booking product,err");
          alert("failed to book. please try again")
        }
      }


    return (
      
      <div className='main-allshop'>
          <div>
  <Button
    className="back-dribbble"
    variant="secondary"
    onClick={() => navigate(`/UserHome/${userId}`)}
  >
    Back to Home
  </Button>
</div>

         

          <div className="products-container">
    <div className="products-grid">
      {products.length === 0 ? (
        <div className="centered-empty">No products found.</div>
      ) : (
        products.map((p) => (
          <Card key={p._id} className="product-card">
            <Card.Img
              className="product-img"
              variant="top"
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.product}
            />

            <Card.Body className="product-body">
              <h3 className="product-title">{p.product}</h3>

              <p className="product-description">
                {p.description}
              </p>

              <div className="product-meta">
                <span><strong>Price:</strong> ₹{p.price}</span>
                <span><strong>Qty:</strong> {p.quantity}</span>
              </div>

              <Button
                className="book-btn"
                onClick={() => handleBooking(p._id, p.shopId)}
              >
                Book Now
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  </div>

      </div>

      
  



          
      
    )
  }

  export default AllShopProducts