import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './FarmerProfile.css';

const FarmersProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image_url: '',
        category_id: '',
        farmer_id: user ? user.id : '',
    });
    const [editProductId, setEditProductId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        if (!user) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/farmer/products/${user.id}`, {
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

    useEffect(() => {
        fetchProducts();
    }, [user]);

    const handleAddProduct = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:5000/api/products`, {
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
            farmer_id: user ? user.id : '',
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
        setEditProductId(null);
    };

    return (
        <div className="farmers-products">
            <h1 className="products-title">My Products</h1>
            {products.length === 0 ? (
                <p className="no-products">No products have been added yet.</p>
            ) : (
                <ul className="products-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-card">
                            <img src={product.image_url} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <button onClick={() => handleEditProduct(product)} className='edit-button'>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className='delete-button'>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {editProductId && (
                <div className="edit-product-form">
                    <h2>Edit Product</h2>
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
                    <button onClick={handleUpdateProduct} disabled={loading}>
                        {loading ? 'Processing...' : 'Update Product'}
                    </button>
                    <button onClick={resetForm}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default FarmersProducts;
