import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Modal, Box, Typography, Button } from '@mui/material';

const Products = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://finalagrilink.onrender.com/api/products');
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

    const handleAddToCart = () => {
        if (!user) {
            setAlertMessage('You need to be logged in to add items to your cart.');
            setOpenModal(true); 
        } else {
            console.log('Product added to cart');
            // Add your logic to add the product to the cart here
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/200?text=Image+Not+Available';
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAlertMessage(''); // Clear the alert message
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="products-container"> 
            <h1>Fruits and Vegetables Available</h1>
            {alertMessage && <div className="alert-message">{alertMessage}</div>}
            <div className="product-cards">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_url} alt={product.name} onError={handleImageError} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                ))}
                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px',alignItems:"center" }}>
                    <button style={{ padding: '10px 20px' }}>
                    <Link to='/' className='link'>Home</Link>
                    </button>
                </div>
            </div>

            {/* Login Prompt Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Please log in to add items to the cart
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            handleCloseModal();
                            navigate('/login');
                        }}
                        fullWidth
                    >
                        Go to Login
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Products;
