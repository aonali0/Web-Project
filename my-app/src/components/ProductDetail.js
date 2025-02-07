import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext'; // Import context
import { useCart } from '../components/CartContext';
import { useUser } from './UserContext'; // Import user context
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { products, setProducts } = useContext(ProductContext); // Access context
  const { addToCart } = useCart();
  const { user } = useUser(); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productFromContext = products.find((p) => p._id === id);
        if (productFromContext) {
          setProduct(productFromContext);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductDetails();
  }, [id, products]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    setProducts((prev) => prev.map((p) => (p._id === product._id ? product : p)));
    alert('Product updated successfully!');
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p._id !== product._id));
    alert('Product deleted successfully!');
    navigate('/products');
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail">
      <Link to="/products" className="back-to-products">Back to Products</Link>

      {isEditing ? (
        <form className="product-form">
          <input type="text" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
          <textarea name="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
          <input type="number" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
          <input type="text" name="weight" value={product.weight} onChange={(e) => setProduct({ ...product, weight: e.target.value })} />
          <input type="text" name="unit" value={product.unit} onChange={(e) => setProduct({ ...product, unit: e.target.value })} />
          <input type="number" name="quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
          <input type="text" name="condition" value={product.condition} onChange={(e) => setProduct({ ...product, condition: e.target.value })} />
          <input type="date" name="availableDate" value={product.availableDate} onChange={(e) => setProduct({ ...product, availableDate: e.target.value })} />
          <input type="date" name="expirationDate" value={product.expirationDate} onChange={(e) => setProduct({ ...product, expirationDate: e.target.value })} />
          <input type="text" name="location" value={product.location} onChange={(e) => setProduct({ ...product, location: e.target.value })} />
          <label>
            Delivery Available:
            <input type="checkbox" name="delivery" checked={product.delivery} onChange={(e) => setProduct({ ...product, delivery: e.target.checked })} />
          </label>
          <button type="button" onClick={handleSave}>Save Changes</button>
        </form>
      ) : (
        <div>
          <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
          <h1>{product.name}</h1>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> Rs {product.price}</p>
          <p><strong>Weight:</strong> {product.weight} {product.unit}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Available Date:</strong> {product.availableDate}</p>
          <p><strong>Expiration Date:</strong> {product.expirationDate}</p>
          <p><strong>Location:</strong> {product.location}</p>
          <p><strong>Delivery:</strong> {product.delivery ? 'Available' : 'Not Available'}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>

          {user?.role === 'farmer' ? (
            <>
              <button onClick={handleEditToggle}>Edit Product</button>
              <button onClick={handleDelete}>Delete Product</button>
            </>
          ) : (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
