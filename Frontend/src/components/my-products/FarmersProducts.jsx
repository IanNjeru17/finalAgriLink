import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './FarmerProfile.css'; 

const FarmersProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

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

    return (
        <div className="farmers-products">
            <h1 className="products-title">My Products</h1>
            {products.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <ul className="products-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-card">
                            <img src={product.image_url} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FarmersProducts;
