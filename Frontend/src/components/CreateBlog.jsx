import React, { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';

const CreateBlog = () => {
  const { user } = useAuth();
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
  });

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

    const response = await fetch(`http://localhost:5000/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newBlog, farmer_id: user.id }), // Include farmer_id
    });

    if (response.ok) {
      alert('Blog added successfully');
      setNewBlog({ title: '', content: '' }); // Reset form
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || 'Failed to create blog'}`);
    }
  };

  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={newBlog.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};

export default CreateBlog;