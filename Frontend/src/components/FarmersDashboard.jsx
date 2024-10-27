import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from './Sidebar';
import { useAuth } from '../../src/context/AuthContext'; 

const Farmer = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    image_url: '', 
    category_id: '',
    farmer_id: user ? user.id : '' 
  });
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
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

  const handleAddProduct = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    
    const response = await fetch('http://127.0.0.1:5000/api/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert("Product added successfully!");
      fetchProducts();
      resetForm();
    } else {
      console.error("Error adding product:", await response.json());
    }

    setLoading(false);
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
      category_id: product.category_id,
      farmer_id: user ? user.id : ''
    });
    setEditProductId(product.id);
  };

  const handleUpdateProduct = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:5000/api/products/${editProductId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert("Product updated successfully!");
      fetchProducts();
      resetForm();
      setEditProductId(null);
    } else {
      console.error("Error updating product:", await response.json());
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Product deleted successfully!");
      fetchProducts();
    } else {
      console.error("Error deleting product:", await response.json());
    }
  };

  const resetForm = () => {
    setNewProduct({ name: '', price: '', description: '', image_url: '', category_id: '', farmer_id: user ? user.id : '' });
  };

  return (
    <>
    
    <div className="container">
      <Sidebar />
      <main className="main-content">
       

        {/* Product Management Section */}
        <section className="product-management">
          <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
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
            value={newProduct.image_url}
            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category ID"
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Farmer ID"
            value={newProduct.farmer_id} 
            readOnly
          />
          <button 
            onClick={editProductId ? handleUpdateProduct : handleAddProduct} 
            className='add-product-button' 
            disabled={loading}
          >
            {loading ? 'Processing...' : (editProductId ? 'Update Product' : 'Add Product')}
          </button>
        </section>

        {/* Product List Section */}
        <section className="product-list">
          <h2>Product List</h2>
          <ul>
            {products.map(product => (
              <li key={product.id} className="product-item">
                <div className="product-details">
                  <img src={product.image_url} alt={product.name} width="50" />
                  <div className="product-info">
                    <strong>{product.name}</strong> - ${product.price} - {product.description}
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-button" 
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
    </>
  );
};

export default Farmer;
