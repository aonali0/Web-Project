import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetail = () => {
  const { id } = useParams(); // Extract the blog ID from the route
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Retrieve blogs from localStorage
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    // Find the specific blog by ID
    const foundBlog = savedBlogs.find((article) => article.id === parseInt(id));
    setBlog(foundBlog);
  }, [id]);

  if (!blog) {
    return <p>Blog post not found</p>;
  }

  return (
    <div className="blog-detail-container">
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
