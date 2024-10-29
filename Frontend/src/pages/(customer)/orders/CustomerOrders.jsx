import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/customersidebar/Sidebar.jsx";
import "../dashboard/home.css";


import { useAuth } from "../../../context/AuthContext.js";
import React, { useState, useEffect } from 'react';
import "./CustomerOrders.css"

const CustomerOrders = () => {
  const { user, hasRole } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [customerProfile, setCustomerProfile] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCustomerProfile(); 
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://finalagrilink.onrender.com/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://finalagrilink.onrender.com/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchCustomerProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://finalagrilink.onrender.com/auth/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomerProfile(data); 
      } else {
        console.error("Failed to fetch customer profile.");
      }
    } catch (error) {
      console.error("Error fetching customer profile:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);

    const invalidItems = orderItems.filter(item => !products.some(product => product.id === item.product_id));
    if (invalidItems.length > 0) {
      alert("One or more product IDs are invalid.");
      setLoading(false);
      return;
    }

    const orderData = {
      status: 'pending',
      total_amount: orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      order_items: orderItems,
    };

    const response = await fetch('https://finalagrilink.onrender.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      fetchOrders();
      setOrderItems([]); 
    } else {
      console.error("Error placing order:", await response.json());
    }
    setLoading(false);
  };

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://finalagrilink.onrender.com/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Order deleted successfully!");
      fetchOrders(); 
    } else {
      console.error("Error deleting order:", await response.json());
    }
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="contentWrapper">
          <div className="leftSection">
            {hasRole('customer') && <h1>Welcome, Customer!</h1>}
            {customerProfile && (
              <section className="customer-profile">
                <h2>Your Profile</h2>
                <p><strong>Name:</strong> {customerProfile.first_name} {customerProfile.last_name}</p>
                <p><strong>Email:</strong> {customerProfile.email}</p>
                <p><strong>Phone:</strong> {customerProfile.phone}</p>
                <p><strong>Role:</strong> {customerProfile.role}</p>
              </section>
            )}
            
            <section className="product-list">
              <h2>Available Products</h2>
              <ul>
                {products.map(product => (
                  <li key={product.id} className="productCard">
                    <p>{product.name} - ${product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => setOrderItems([...orderItems, { product_id: product.id, price: product.price, quantity: 1 }])}>
                      Add to Order
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          
          <div className="rightSection">
            <section className="order-section">
              <h2>Your Order</h2>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index} className="orderItemCard">
                    Product ID: {item.product_id} - Price: ${item.price} - Quantity: 
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newOrderItems = [...orderItems];
                        newOrderItems[index].quantity = Number(e.target.value);
                        setOrderItems(newOrderItems);
                      }}
                    />
                  </li>
                ))}
              </ul>
              <button className="placeOrderButton" onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CustomerOrders;
