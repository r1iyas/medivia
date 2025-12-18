import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './ViewProducts.css';

function ShopProducts() {
  const [products, setProducts] = useState([]);
const params=useParams()
  const shopId= params.id

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(shopId);
        
        const res = await axios.get(`http://localhost:5000/getProductsByShop/${shopId}`);
        console.log("API Response:", res); // <-- Debugging
        setProducts(res.data); // ✅ It's already an array
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [shopId]);

  const handleDelete = async (id)=>{
    try{
      await axios.delete(`http://localhost:5000/deleteProduct/${id}`)
      alert("product deleted successfully");
      setProducts(products.filter((p)=>p._id !==id));
    } catch(err){
      console.error("error deleting product")
    }
  }

  if (!products || products.length === 0) {
    return <p>No products found...</p>;
  }

  return (
    <div className="page-container">
      <div className="left-image" ></div>
        <div className="viewproducts-container">
  <h2>Products of this Shop</h2>

  <div className="products-grid">
    {products.map((p) => (
      <div key={p._id} className="product-card">
        <div className="product-image">
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            alt={p.product}
          />
        </div>

        <div className="product-info">
          <h3>{p.product}</h3>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>
          <p>Quantity: {p.quantity}</p>
        </div>

        <div className="product-actions">
          <Link to={`/EditProduct/${p._id}`}>
            <button>EDIT</button>
          </Link>
          <button className="delete" onClick={() => handleDelete(p._id)}>
            DELETE
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

     
    </div>
    
    
  );
}

export default ShopProducts;
