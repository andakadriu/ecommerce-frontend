import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../src/assets/styles/style.css";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(""); 
  const [showStockWarning, setShowStockWarning] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7299/Product/GetById/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  // Convert product.stockQuantity to a number (if needed)
  const getNumericStock = () => {
    if (!product || product.stockQuantity == null) return 0;
    return typeof product.stockQuantity === "number"
      ? product.stockQuantity
      : parseInt(product.stockQuantity, 10);
  };

  const handleIncrease = () => {
    const stock = getNumericStock();
    if (quantity < stock) {
      setQuantity(quantity + 1);
      setShowStockWarning(false);
    } else {
      setShowStockWarning(true);
      setTimeout(() => setShowStockWarning(false), 2000);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const stock = getNumericStock();
    console.log("handleAddToCart clicked");
    console.log("Product:", product);
    console.log("Selected quantity:", quantity);
    console.log("Available stock:", stock);

    if (quantity <= stock) {
      // Call the parent's addToCart with the selected quantity
      addToCart({ ...product, quantity });
      console.log("Product added to cart successfully.");
    } else {
      setShowStockWarning(true);
      setTimeout(() => setShowStockWarning(false), 2000);
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  if (!product) {
    return <div className="container mt-5">Loading product details...</div>;
  }

  return (
    <div className="product-detail container mt-5">
      {showStockWarning && (
        <div className="stock-warning-popup">
          Not enough stock available!
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : "/default-image.jpg"
            }
            alt={product.name}
            className="img-fluid product-img"
          />
        </div>
        <div className="col-md-6">
          <h2 className="product-title mb-3">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <strong className="product-price d-block mb-3">
            {product.price && !isNaN(product.price)
              ? `$${Number(product.price).toFixed(2)}`
              : "N/A"}
          </strong>
          <p className="product-stock">Available Stock: {getNumericStock()}</p>
          <div className="quantity-selector d-flex align-items-center mt-3">
  <button
    className="plusminus btn btn-outline-dark quantity-decrease"
    onClick={handleDecrease}
  >
    -
  </button>
  <input
    type="text"
    value={quantity}
    readOnly
    className="form-control mx-2 quantity-input"
  />
  <button
    className="plusminus btn btn-outline-dark quantity-increase"
    onClick={handleIncrease}
  >
    +
  </button>
</div>


<button 
  className="prbt btn btn-cart mt-3" 
  onClick={handleAddToCart} 
  style={{ fontSize: "20px", padding: "3px" }}
>
  <i className="fas fa-shopping-cart"></i> Add to Cart
</button>


        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
