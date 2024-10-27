import React, { useState, useEffect } from 'react';
import './Blog.css';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../src/context/AuthContext'; 
import Sidebar from './Sidebar';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const { user } = useAuth();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isBlogListOpen, setBlogListOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [loginError, setLoginError] = useState('');

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('jwt'); 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch blog posts from the backend
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setLoginError('You must be logged in to create a blog post.'); 
      return;
    }

    if (formData.title && formData.content) {
      const newPost = { ...formData };

      // Send new blog post to the backend
      try {
        const response = await fetch('http://localhost:5000/api/blogs', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error('Failed to create blog post');
        }

        const createdPost = await response.json(); 
        setBlogPosts([...blogPosts, createdPost]);
        setFormData({ title: '', content: '', author: '' });
        setLoginError(''); 
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleBlogList = () => {
    setBlogListOpen(!isBlogListOpen);
  };

  return (
    <div className="blog-page-container">
      <div className={`sidebar_blog ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
        </button>
        {isSidebarOpen && (
          <div>
            <h2>Navigation</h2>
            <div className="navigation-buttons">
            <button className="nav-button"><Link to='/' className='link'>🏠 Home</Link></button>
             
            </div>
          </div>
        )}
      </div>

      <div className="create-blog-container">
        <h2>{isLoggedIn ? "Farmer Profile" : "View as Guest"}</h2>
        {isLoggedIn ? (
          <section className="farmer-profile">
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Farmer ID:</strong> {user.id}</p>
          </section>
        ) : (
          <p>Please log in to view your profile details.</p>
        )}

        <h2>Create a Blog Post</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleFormSubmit} className="blog-form">
          <input 
            type="text" 
            name="title" 
            placeholder="Blog Title" 
            value={formData.title} 
            onChange={handleInputChange} 
            className="input-field"
            required 
          />
          <textarea 
            name="content" 
            placeholder="Write your blog content here..." 
            value={formData.content} 
            onChange={handleInputChange} 
            className="textarea-field"
            rows="6"
            required 
          />
          <input 
            type="text" 
            name="author" 
            placeholder="Author Name" 
            value={formData.author} 
            onChange={handleInputChange} 
            className="input-field"
            required 
          />
          <button type="submit" className="submit-button">Submit Blog</button>
        </form>
      </div>

      <div className={`blog-list-container ${isBlogListOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={toggleBlogList}>
          {isBlogListOpen ? 'Hide Blogs' : 'Show Blogs'}
        </button>
        {loading ? (
          <p>Loading blog posts...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <h2>Blog Posts</h2>
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <div key={post.id} className="blog-post">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p><strong>Author: </strong>{post.farmer.first_name} {post.farmer.last_name}</p>
                  <Link 
                    to={`/blog/${post.id}`} 
                    state={{ post }}
                    className="nav-button"
                  >
                    View More
                  </Link>
                </div>
              ))
            ) : (
              <p>No blog posts yet. Be the first to create one!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
