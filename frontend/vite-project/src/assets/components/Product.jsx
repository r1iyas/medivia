import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import './Product.css';

function Product() {

    const [image,setImage]=useState(null)
    const [product,setProduct]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
const param=useParams()
const shopId= param.id


    const adddetails=async (event)=>{

      event.preventDefault()

        const formData =new FormData();
        formData.append("product",product);
        formData.append("description",description)
        formData.append("price",price);
        formData.append("quantity",quantity);
        formData.append("image",image)
        formData.append("shopId",shopId)


      try{
        const result=await axios.post("http://localhost:5000/adddetails",formData,{
            headers:{
          "Content-Type":"multipart/form-data",
        },
        })
        
        console.log(result);
        alert("added product details")
        
      }catch(error){
        console.log(error);
        alert("try diffrently")
      }
    }

  return (

  <div className="product-container">
      <h1>PRODUCT DETAILS</h1>

      <Form className="product-form">
        <Form.Group className="form-group" controlId="formProduct">
          <Form.Label>PRODUCT</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setProduct(e.target.value)} />
        </Form.Group>

        <Form.Group className="form-group" controlId="formDescription">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="form-group" controlId="formPrice">
          <Form.Label>PRICE</Form.Label>
          <Form.Control type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="form-group" controlId="formQuantity">
          <Form.Label>QUANTITY</Form.Label>
          <Form.Control type="text" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>

        <Form.Group className="form-group" controlId="formImage">
          <Form.Label>IMAGE</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={adddetails}>
          Submit
        </Button>
      </Form>
    </div>

  )
}

export default Product