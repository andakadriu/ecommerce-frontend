import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/assets/styles/style.css";
import cartIcon from "../../src/assets/styles/images/cart.svg";

const ProductSection = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

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
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 3));
    }
  }, [products]);

  return (
    <div
      className="untree_co-section product-section before-footer-section"
      style={{ marginTop: "50px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">7299 with excellent material.</h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <p>
              <Link to="/shop" className="btn">
                Explore
              </Link>
            </p>
          </div>

          {randomProducts.map((product, index) => {
            const productId = product._productID || product.productID || product._id || product.id;
            const imageUrl =
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : "/default-image.jpg";
            return (
              <div key={productId || index} className="col-12 col-md-4 col-lg-3 mb-5">
                <Link to={`/product/${productId}`} className="text-decoration-none">
                  <div className="product-item p-3 border rounded">
                    <img
                      src={imageUrl}
                      className="img-fluid product-thumbnail mb-3"
                      alt={product.title || product.name || "Product"}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <h3 className="product-title" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      {product.name}
                    </h3>
                    <h1 className="product-price">
                      {product.price && !isNaN(product.price)
                        ? `$${Number(product.price).toFixed(2)}`
                        : "N/A"}
                    </h1>
                  </div>
                </Link>
                <div className="product-actions text-center mt-2" data-aos="fade-up">
                  <button onClick={() => addToCart(product)} className="btn btn-cart btn-sm">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
