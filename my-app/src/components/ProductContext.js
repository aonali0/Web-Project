import React, { createContext, useState, useEffect } from 'react';

// Create a context for products
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [locationSuggestions, setLocationSuggestions] = useState([]); // State to hold location suggestions

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Optional, but good practice
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch products: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setProducts(data); // Set the fetched products to state
      setFilteredProducts(data); // Initialize filtered products
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to filter products based on search query and location
  const filterProducts = (query, location) => {
    let filtered = products;

    // Filter by product name if there's a search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by location if there's a location query
    if (location) {
      filtered = filtered.filter((product) =>
        product.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredProducts(filtered); // Set the filtered products
  };

  // Function to fetch location suggestions (for simplicity, using static locations for now)
  const fetchLocationSuggestions = (locationQuery) => {
    const allLocations = products.map((product) => product.location);
    const filteredLocations = allLocations.filter((location) =>
      location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setLocationSuggestions(filteredLocations);
  };

  // Function to update product details locally (frontend only)
  const updateProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Function to delete product locally (frontend only)
  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  // Return the context provider with the products, loading state, and error
  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setProducts,
        loading,
        error,
        updateProduct,
        deleteProduct,
        filterProducts, // Provide the filter function
        fetchLocationSuggestions, // Provide the location suggestion fetch function
        locationSuggestions, // Provide the location suggestions
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
