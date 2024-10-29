import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../dashboard/home.css";
import React, { useState } from 'react';
import { useAuth } from "../../../context/AuthContext.js";
import { Modal, Button } from '@mui/material';
import './create.css'; 

const Create = () => {
    const { user } = useAuth();
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
    });
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const response = await fetch(`https://finalagrilink.onrender.com/api/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ...newBlog, farmer_id: user.id }),
        });

        if (response.ok) {
            setOpenModal(true); // Open modal on success
            setNewBlog({ title: '', content: '' }); // Reset form
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Failed to create blog'}`);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <form onSubmit={handleSubmit} className="createBlogForm">
                    <div className="formGroup">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newBlog.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={newBlog.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Create Blog</button>
                </form>

                <Modal open={openModal} onClose={handleClose}>
                    <div className="modalContent">
                        <h2>Blog Added Successfully</h2>
                        <p>Your blog has been created and published.</p>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Create;
