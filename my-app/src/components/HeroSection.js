import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext'; // Import ProductContext
import './HeroSection.css';

const HeroSection = () => {
  const { products, filteredProducts, filterProducts, fetchLocationSuggestions, locationSuggestions } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [filteredProductSuggestions, setFilteredProductSuggestions] = useState([]);
  const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
  const navigate = useNavigate();

  // Filter product suggestions based on search query
  const filterProductSuggestions = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    const firstLetterMatches = filtered.filter((product) =>
      product.name.toLowerCase().startsWith(query[0].toLowerCase())
    );
    setFilteredProductSuggestions([
      ...firstLetterMatches,
      ...filtered.filter((product) => !product.name.toLowerCase().startsWith(query[0].toLowerCase())),
    ]);
  };

  // Filter location suggestions based on location input
  const filterLocationSuggestions = (locationQuery) => {
    const filteredLocations = locationSuggestions.filter((location) =>
      location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    const firstLetterMatches = filteredLocations.filter((location) =>
      location.toLowerCase().startsWith(locationQuery[0].toLowerCase())
    );
    setFilteredLocationSuggestions([
      ...firstLetterMatches,
      ...filteredLocations.filter((location) => !location.toLowerCase().startsWith(locationQuery[0].toLowerCase())),
    ]);
  };

  useEffect(() => {
    if (searchQuery) {
      filterProductSuggestions(searchQuery);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    if (location) {
      filterLocationSuggestions(location);
    }
    fetchLocationSuggestions(location); // Fetch suggestions as user types
  }, [location, fetchLocationSuggestions]);

  const handleSearch = () => {
    filterProducts(searchQuery, location); // Filter products based on search and location
    navigate(`/products?query=${searchQuery}&location=${location}`);
  };

  // Handle clicking on a suggestion to populate the search input
  const handleProductClick = (productName) => {
    setSearchQuery(productName);
    setFilteredProductSuggestions([]); // Hide suggestions after selection
  };

  const handleLocationClick = (locationName) => {
    setLocation(locationName);
    setFilteredLocationSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Connecting You to Local Farmers and Fresh Produce</h1>
        <p>Discover and Purchase Fresh, Sustainable Food</p>

        <div className="search-fields">
          <div className="search-input">
            <input
              type="text"
              placeholder="I'm looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="suggestions">
                {filteredProductSuggestions.length > 0 ? (
                  filteredProductSuggestions.map((product, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item" 
                      onClick={() => handleProductClick(product.name)} // Handle click
                    >
                      {product.name}
                    </div>
                  ))
                ) : (
                  <div className="no-suggestions">No products found</div>
                )}
              </div>
            )}
          </div>

          <span className="near-text">near</span>

          <div className="location-input">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {location && (
              <div className="suggestions">
                {filteredLocationSuggestions.length > 0 ? (
                  filteredLocationSuggestions.map((loc, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item" 
                      onClick={() => handleLocationClick(loc)} // Handle click
                    >
                      {loc}
                    </div>
                  ))
                ) : (
                  <div className="no-suggestions">No locations found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
