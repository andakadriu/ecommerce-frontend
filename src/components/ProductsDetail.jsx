import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../src/assets/styles/style.css";
import cartIcon from "../../src/assets/styles/images/cart.svg";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [showStockWarning, setShowStockWarning] = useState(false);
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7299/Product/GetById/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7299/Product/ProductsList");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const shuffled = [...products].filter((p) => p.id !== parseInt(id)).sort(() => 0.5 - Math.random());
      setSuggestedProducts(shuffled.slice(0, 4));
    }
  }, [products, id]);

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
    if (quantity <= stock) {
      addToCart({ ...product, quantity });
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
    <div className="product-detail container mt-5" style={{ paddingTop: "100px" }}>
      {showStockWarning && <div className="stock-warning-popup">Not enough stock available!</div>}

      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "/default-image.jpg"}
            alt={product.name}
            className="img-fluid product-img"
          />
        </div>
        <div className="col-md-6">
          <h2 className="product-title mb-3">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <strong className="product-price d-block mb-3">${Number(product.price).toFixed(2)}</strong>
          <p className="product-stock">Available Stock: {getNumericStock()}</p>
          <div className="quantity-selector d-flex align-items-center mt-3">
            <button className="plusminus btn btn-outline-dark quantity-decrease" onClick={handleDecrease}>-</button>
            <input type="text" value={quantity} readOnly className="form-control mx-2 quantity-input" />
            <button className="plusminus btn btn-outline-dark quantity-increase" onClick={handleIncrease}>+</button>
          </div>

          <button className="prbt btn btn-cart mt-3" onClick={handleAddToCart} style={{ fontSize: "20px", padding: "3px", backgroundColor:"#385174" }}>
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>

      <div className="suggested-products mt-5">
        <h3 className="mb-4">Suggested Products</h3>
        <div className="row">
          {suggestedProducts.map((suggestedProduct) => (
            <div key={suggestedProduct.id} className="col-12 col-md-3 mb-4">
              <Link to={`/product/${suggestedProduct.id}`} className="text-decoration-none">
                <div className="product-item p-3 border rounded">
                  <img
                    src={Array.isArray(suggestedProduct.images) && suggestedProduct.images.length > 0 ? suggestedProduct.images[0] : "/default-image.jpg"}
                    className="img-fluid product-thumbnail mb-3"
                    alt={suggestedProduct.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <h3 className="product-title" style={{ fontSize: "1.2rem", fontWeight: "600" }}>{suggestedProduct.name}</h3>
                  <strong className="product-price d-block mb-3">${Number(suggestedProduct.price).toFixed(2)}</strong>
                </div>
              </Link>
              <div className="product-actions text-center mt-2" data-aos="fade-up">
                  <button onClick={() => addToCart(product)} className="btn btn-cart btn-sm">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
