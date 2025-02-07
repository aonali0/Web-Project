

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setArticles(savedBlogs);
  }, []);

  return (
    <div className="blog-container">
      <h2>Blog Posts</h2>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="blog-post">
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} className="blog-thumbnail" />
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/blog/${article.id}`}>Read More</Link>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default Blog;