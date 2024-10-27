import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (

    <div className="blog-detail-container">
      <h2 className="blog-title">{post.title}</h2>
      <p className="blog-date">{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="blog-content">
        <p>{post.content}</p>
      </div>
      <p className="blog-author"><strong>Author: </strong>{post.farmer.first_name} {post.farmer.last_name}</p>
    </div>
  );
};

export default BlogDetail;
