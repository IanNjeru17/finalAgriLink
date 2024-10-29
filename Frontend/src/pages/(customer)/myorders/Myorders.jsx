import React, { useState, useEffect } from 'react';
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/customersidebar/Sidebar.jsx";
import "../dashboard/home.css";
import "./Myorders.css";
import { useAuth } from "../../../context/AuthContext.js";

const Myorders = () => {
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
      const response = await fetch('https://finalagrilink.onrender.com/api/user/orders', {
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
        <div className="listContainer">
          <section className="orders-history">
            <h2>My Orders</h2>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>${order.total_amount}</td>
                    <td>
                      <button 
                        className="order-delete-btn" 
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Myorders;
