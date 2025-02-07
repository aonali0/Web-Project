import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBlog.css';

const AdminBlog = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setArticles(savedBlogs);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const updatedArticles = articles.filter((article) => article.id !== id);
      setArticles(updatedArticles);
      // Save updated list to localStorage
      localStorage.setItem('blogs', JSON.stringify(updatedArticles));
    }
  };

  return (
    <div className="admin-blog-container">
      <h2>Manage Blog Posts</h2>
      <button onClick={() => navigate('/post-blog')}>Add New Blog</button>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="blog-post">
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} className="blog-thumbnail" />
            <p>{article.content}</p>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default AdminBlog;
