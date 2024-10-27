import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext'; 
import Sidebar from './Sidebar'; 

const CustomerDashboard = () => {
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
      const response = await fetch('http://127.0.0.1:5000/api/products', {
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
      const response = await fetch('http://127.0.0.1:5000/api/orders', {
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
      const response = await fetch('http://localhost:5000/auth/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomerProfile(data); // Set the customer profile data
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

    const response = await fetch('http://127.0.0.1:5000/api/orders', {
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
    const response = await fetch(`http://127.0.0.1:5000/api/orders/${orderId}`, {
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
    <div className="container">
      <Sidebar />
      <main className="main-content">

      {hasRole('customer') && <h1>Welcome, Customer!</h1>}
        
        {/* Customer Profile Section */}
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
              <li key={product.id}>
                {product.name} - ${product.price} - {product.description}
                <button onClick={() => setOrderItems([...orderItems, { product_id: product.id, price: product.price, quantity: 1 }])}>
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="order-section">
          <h2>Place your Order</h2>
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
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
          <button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </section>

        <section className="orders-history">
          <h2>My Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                Order ID: {order.id} - Status: {order.status} - Total: ${order.total_amount}
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default CustomerDashboard;
