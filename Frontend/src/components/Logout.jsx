import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const [logoutMessage, setLogoutMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Optional: Make a logout request to the backend
        fetch('https://finalagrilink.onrender.com/api/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
            }
        })
        .then(response => {
            if (response.ok) {
                // Clear tokens from local storage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                // Update message and redirect to login page
                setLogoutMessage('Logged out successfully');
                setTimeout(() => {
                    navigate('/login'); // Redirect after a short delay
                }, 2000); // Adjust delay as needed
            } else {
                console.error('Logout failed');
                setLogoutMessage('Logout failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            setLogoutMessage('An error occurred. Please try again.');
        });
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {logoutMessage && (
                <div style={{ marginTop: '10px', color: 'green' }}>
                    {logoutMessage}
                </div>
            )}
        </div>
    );
};

export default LogoutButton;
