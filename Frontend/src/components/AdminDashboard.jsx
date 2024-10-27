// src/Admin.js
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './Sidebar';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '' });
  const [editUser, setEditUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      fetchUsers();
      setNewUser({ firstName: '', lastName: '', email: '', phone: '', role: '' });
    }
  };

  const handleEditUser = async (user) => {
    setEditUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = async () => {
    const response = await fetch(`/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      fetchUsers();
      setEditUser(null);
      setNewUser({ firstName: '', lastName: '', email: '', phone: '', role: '' });
    }
  };

  const handleDeleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (response.ok) {
      fetchProducts();
      setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
    }
  };

  const handleEditProduct = async (product) => {
    setEditProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = async () => {
    const response = await fetch(`/api/products/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (response.ok) {
      fetchProducts();
      setEditProduct(null);
      setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
    }
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <h1>Admin Dashboard</h1>

        {/* User Management Section */}
        <section className="user-management">
          <h2>{editUser ? 'Edit User' : 'Add User'}</h2>
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="user">User</option>
          </select>
          {editUser ? (
            <button onClick={handleUpdateUser}>Update User</button>
          ) : (
            <button onClick={handleAddUser}>Add User</button>
          )}
        </section>

        {/* User List Section */}
        <section className="user-list">
          <h2>User List</h2>
          <div className="user-cards">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Role: {user.role}</p>
                <div className="user-actions">
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Management Section */}
        <section className="product-management">
          <h2>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          {editProduct ? (
            <button onClick={handleUpdateProduct}>Update Product</button>
          ) : (
            <button onClick={handleAddProduct}>Add Product</button>
          )}
        </section>

        {/* Product List Section */}
        <section className="product-list">
          <h2>Product List</h2>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price} - {product.description}
                <img src={product.imageUrl} alt={product.name} width="50" />
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Admin;
