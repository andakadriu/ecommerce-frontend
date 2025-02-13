import React from "react";
import { useLocation } from "react-router-dom";

const Shop = ({ addToCart, products }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <h2 className="text-center mb-4">
          {category.toUpperCase()} PRODUCTS
        </h2>

        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
              <div className="product-item">
                <img
                  src={product.image}
                  className="img-fluid product-thumbnail"
                  alt={product.title}
                />
                <h3 className="product-title">{product.title}</h3>
                <strong className="product-price">
                  ${product.price.toFixed(2)}
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
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
