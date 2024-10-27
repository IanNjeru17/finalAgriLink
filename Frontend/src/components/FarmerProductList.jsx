import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../src/context/AuthContext'; 

const FarmerProductList = () => {
  const { user } = useAuth();
  const [farmerProducts, setFarmerProducts] = useState([]);

  useEffect(() => {
    fetchFarmerProducts();
  }, []);

  const fetchFarmerProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:5000/farmer/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFarmerProducts(data);
      } else {
        console.error("Failed to fetch farmer products.");
      }
    } catch (error) {
      console.error("Error fetching farmer products:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <h1>{user ? `${user.first_name}'s Products` : 'My Products'}</h1>
        
        {/* Product List Section */}
        <section className="product-list">
          <h2>Your Products</h2>
          <ul>
            {farmerProducts.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price} - {product.description}
                <img src={product.image_url} alt={product.name} width="50" />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default FarmerProductList;
