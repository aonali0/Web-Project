import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import './FarmerDashboard.css'; // Optional: Add styling

const FarmerDashboard = () => {
  const { user } = useUser(); // Access user info
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [products, setProducts] = useState([]); // For storing the products
  const [editingProduct, setEditingProduct] = useState(null); // Track which product is being edited

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      alert('You are not authorized to access this page!');
      window.location.href = '/'; // Redirect to homepage (or login page)
      return;
    }

    // Initialize editable details
    setEditedDetails({
      fullName: user.fullName,
      email: user.email,
      farmName: user.farmName,
      farmAddress: user.farmAddress,
      city: user.city,
      phone: user.phone,
    });

    // Fetch products saved by the farmer (mock data or API call)
    // For now, we'll just use mock data
    setProducts([
      {
        id: 1,
        name: 'Tomatoes',
        description: 'Fresh, ripe tomatoes bursting with flavor, perfect for salads, sauces, or snacks. Packed with vitamins and antioxidants, these tomatoes are a healthy addition to any meal.',
        price: 25.0,
        
      },
      {
        id: 2,
        name: 'Wheat',
        description: 'High-quality wheat, perfect for making fresh bread, pasta, and baked goods. Rich in fiber and essential nutrients, it’s a versatile and healthy staple for your kitchen.',
        price: 50.0,
     
      },
      // Add more products as needed
    ]);
  }, [user]);

  // Handle input changes for the farmer details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  // Handle save action (update only on frontend)
  const handleSave = () => {
    setIsEditing(false);
    // The updated details are saved locally, no backend update.
  };

  // Handle edit product
  const handleProductEdit = (product) => {
    setEditingProduct(product);
  };

  // Handle save product edit
  const handleProductSave = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null); // Reset editing mode
  };

  // Handle delete product
  const handleProductDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle input change for product edit
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  return (
    <div className="farmer-dashboard">
      <h1>Welcome, {user?.fullName || 'Farmer'}</h1>

      {/* Farmer Details Section */}
      <div className="dashboard-section">
        <h2>Farmer Details</h2>
        {isEditing ? (
          <div className="edit-form">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={editedDetails.fullName}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedDetails.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Farm Name:
              <input
                type="text"
                name="farmName"
                value={editedDetails.farmName}
                onChange={handleChange}
              />
            </label>
            <label>
              Farm Address:
              <input
                type="text"
                name="farmAddress"
                value={editedDetails.farmAddress}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={editedDetails.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={editedDetails.phone}
                onChange={handleChange}
              />
            </label>
            <button className="button save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="button cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {editedDetails.fullName}</p>
            <p><strong>Email:</strong> {editedDetails.email}</p>
            <p><strong>Farm Name:</strong> {editedDetails.farmName}</p>
            <p><strong>Farm Address:</strong> {editedDetails.farmAddress}</p>
            <p><strong>City:</strong> {editedDetails.city}</p>
            <p><strong>Phone:</strong> {editedDetails.phone}</p>
            <button
              className="button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          </div>
        )}
      </div>

      {/* Farmer's Saved Products Section */}
      <div className="dashboard-section">
        <h2>Saved Products</h2>
        <div className="products-list">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                {editingProduct?.id === product.id ? (
                  <div className="edit-product-form">
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={editingProduct.name}
                        onChange={handleProductChange}
                      />
                    </label>
                    <label>
                      Description:
                      <input
                        type="text"
                        name="description"
                        value={editingProduct.description}
                        onChange={handleProductChange}
                      />
                    </label>
                    <label>
                      Price:
                      <input
                        type="number"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleProductChange}
                      />
                    </label>
                    <button className="button save-button" onClick={handleProductSave}>
                      Save Product
                    </button>
                    <button
                      className="button cancel-button"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                   
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <button
                      className="button edit-button"
                      onClick={() => handleProductEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="button delete-button"
                      onClick={() => handleProductDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
