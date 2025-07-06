import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Filter, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { products, filters } from '../data/products';
import './Products.css';

const Products = ({ addToCart }) => {
  const location = useLocation();
  // Get search term and category from URL query string
  const getSearchFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };

  const getCategoryFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('category') || '';
  };

  const [searchTerm, setSearchTerm] = useState(getSearchFromQuery());
  const [selectedCategories, setSelectedCategories] = useState(getCategoryFromQuery() ? [getCategoryFromQuery()] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Update searchTerm and selectedCategories if URL changes
  useEffect(() => {
    setSearchTerm(getSearchFromQuery());
    const categoryFromQuery = getCategoryFromQuery();
    if (categoryFromQuery) {
      setSelectedCategories([categoryFromQuery]);
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  // Filter products based on all selected criteria
  useEffect(() => {
    let filtered = [...products];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(product =>
        product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      );
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(product =>
        product.rating >= selectedRating
      );
    }

    // Availability filter
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(product => {
        if (selectedAvailability.includes('In Stock')) {
          return product.inStock;
        }
        if (selectedAvailability.includes('Out of Stock')) {
          return !product.inStock;
        }
        return true;
      });
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(product =>
        selectedFeatures.some(feature =>
          product.features.some(productFeature =>
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured: new products first, then by rating
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories, selectedBrands, selectedPriceRange, selectedRating, selectedAvailability, selectedFeatures, sortBy]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleAvailability = (availability) => {
    setSelectedAvailability(prev =>
      prev.includes(availability)
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSelectedAvailability([]);
    setSelectedFeatures([]);
    setSortBy('featured');
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategories.length,
    selectedBrands.length,
    selectedPriceRange,
    selectedRating,
    selectedAvailability.length,
    selectedFeatures.length
  ].filter(Boolean).length;

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title">
            <h1>Our Products</h1>
            <p>Discover our comprehensive collection of cutting-edge electronics</p>
          </div>
          <div className="page-actions">
            <button 
              className="btn btn-outline filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="filter-count">{activeFiltersCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              {activeFiltersCount > 0 && (
                <button className="clear-filters" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>

            {/* Search */}
            <div className="filter-section">
              <h4>Search</h4>
              <div className="search-input-wrapper">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="filter-options">
                {filters.categories.map(category => (
                  <label key={category} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="filter-section">
              <h4>Brands</h4>
              <div className="filter-options">
                {filters.brands.map(brand => (
                  <label key={brand} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="filter-options">
                {filters.priceRanges.map((range, index) => (
                  <label key={index} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === range}
                      onChange={() => setSelectedPriceRange(range)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="filter-options">
                {filters.ratings.map(rating => (
                  <label key={rating} className="filter-option">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                    />
                    <span>
                      {rating}+ <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="filter-section">
              <h4>Availability</h4>
              <div className="filter-options">
                {filters.availability.map(availability => (
                  <label key={availability} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes(availability)}
                      onChange={() => toggleAvailability(availability)}
                    />
                    <span>{availability}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="filter-section">
              <h4>Features</h4>
              <div className="filter-options">
                {filters.features.map(feature => (
                  <label key={feature} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <p>
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                {activeFiltersCount > 0 && (
                  <div className="active-filters">
                    {selectedCategories.map(category => (
                      <span key={category} className="active-filter">
                        {category}
                        <button onClick={() => toggleCategory(category)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {selectedBrands.map(brand => (
                      <span key={brand} className="active-filter">
                        {brand}
                        <button onClick={() => toggleBrand(brand)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {/* Add more active filter displays as needed */}
                  </div>
                )}
              </div>
              <div className="sort-controls">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-badges">
                      {product.isNew && <span className="badge badge-primary">New</span>}
                      {product.isOnSale && <span className="badge badge-secondary">{product.discount}% OFF</span>}
                      {!product.inStock && <span className="badge badge-outline">Out of Stock</span>}
                    </div>
                    <div className="product-image">
                      <span className="product-emoji">{product.image}</span>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-brand">{product.brand}</p>
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                              color="#fbbf24"
                            />
                          ))}
                        </div>
                        <span className="rating-text">({product.reviews})</span>
                      </div>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="product-actions">
                        <Link to={`/product/${product.id}`} className="btn btn-outline">
                          View Details
                        </Link>
                        <button 
                          className="btn btn-primary"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                <button className="btn btn-primary" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products; 