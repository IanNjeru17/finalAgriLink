// src/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/products'); 
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/200?text=Image+Not+Available'; 
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Error state
    }

    return (
        <div className="products-container">
            <h1>Fruits and Vegetables Available</h1>
        
            <div className="product-cards">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_url} alt={product.name} onError={handleImageError} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
