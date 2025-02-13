import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Shop = ({ addToCart }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all"; // Default to "all" category

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:21673/Product/ProductsList');
        setProducts(response.data);  // Assuming response.data contains the list of all products
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on the selected category
  useEffect(() => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <h2 className="text-center mb-4">
          {category.toUpperCase()} PRODUCTS
        </h2>
        <div className="row">
          {filteredProducts.map((product) => {
            // Log the product to check if the images exist
            console.log("Product:", product);

            // Check if product.images exists and is an array
            const imageUrl = Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]  // Take the first image
              : "/default-image.jpg";  // Fallback image if no images are found

            return (
              <div key={product.id || product.title} className="col-12 col-md-4 col-lg-3 mb-5"> 
                <div className="product-item">
                  <img
                    src={imageUrl}  // Use the image URL
                    className="img-fluid product-thumbnail"
                    alt={product.title || "Product"}  // Use "Product" if no title
                  />
                  <h3 className="product-title">{product.name}</h3>  
                  <strong className="product-price">
                    ${product.price && !isNaN(product.price) ? product.price.toFixed(2) : "N/A"}
                  </strong>

                  <div className="product-actions">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-cart"
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button className="btn btn-favorite">
                      <i className="fas fa-heart"></i> Favorite
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
