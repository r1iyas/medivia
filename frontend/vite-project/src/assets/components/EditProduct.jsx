import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  useParams } from 'react-router-dom'
// import { Form,  useParams } from 'react-router-dom'

function EditProduct() {

  const [product,setProduct] =useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [image,setImage]=useState("")

  const params = useParams();
  const id =params.id;
 

  const getProductData =async()=>{
    try{
      const response =await axios.get(`http://localhost:5000/getProduct/${id}`)
      const data =response.data;
      setProduct(data.product)
      setDescription(data.description)
      setPrice(data.price)
      setQuantity(data.quantity)
      setImage(data.image)
    }catch(error){
      console.log("error fetching product:",error);
      
    }
  }

  useEffect(()=>{
    getProductData();
  },[id]);

  const updateProduct =async(event)=>{
    event.preventDefault();
    try{
      await axios.put(`http://localhost:5000/updateProduct/${id}`,{
        product, 
        description, 
        price, 
        quantity, 
        image
      })
      alert("product updated successfully");
    
    }catch(error){
      console.log("error updating product:",error);
      alert("error updating product")
    }
  }

   return (
   
   <div className="container mt-4"> <h1>Edit Product</h1> <Form onSubmit={updateProduct}> 
   <Form.Group className="mb-3"> <Form.Label>Product Name</Form.Label> 
   <Form.Control type="text" placeholder="Enter product name" value={product} onChange={(e) => setProduct(e.target.value)} /> </Form.Group> 

   <Form.Group className="mb-3"> <Form.Label>Description</Form.Label> 
   <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} /> </Form.Group> 

   <Form.Group className="mb-3"> <Form.Label>Price</Form.Label>
    <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} /> 

      </Form.Group> <Form.Group className="mb-3"> <Form.Label>Quantity</Form.Label> 
      <Form.Control type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> </Form.Group> 

      <Form.Group className="mb-3"> <Form.Label>Image (filename or URL)</Form.Label> 
      <Form.Control type="text" placeholder="Enter image filename" value={image} onChange={(e) => setImage(e.target.value)} /> 

        </Form.Group> <Button variant="primary" type="submit"> Update Product </Button> </Form> 
        
    </div> 
  ) 

};
  


export default EditProduct