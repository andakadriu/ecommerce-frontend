import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../src/assets/styles/style.css";

const Shop = ({ addToCart }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7299/Product/ProductsList"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [category, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="untree_co-section product-section before-footer-section"
      style={{ marginTop: "50px" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">
          {category === "all"
            ? "ALL PRODUCTS"
            : category.toUpperCase() + " PRODUCTS"}
        </h2>
        <div className="row">
          {currentProducts.map((product) => {
            const imageUrl =
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : "/default-image.jpg";
            return (
              <div
                key={product.id || product.title}
                className="col-12 col-md-4 col-lg-3 mb-5"
              >
                <div className="product-item p-3 border rounded">
                  <img
                    src={imageUrl}
                    className="img-fluid product-thumbnail mb-3"
                    alt={product.title || "Product"}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h3
                    className="product-title"
                    style={{ fontSize: "1.2rem", fontWeight: "600" }}
                  >
                    {product.name}
                  </h3>
                  <strong className="product-price d-block mb-3">
                    {product.price && !isNaN(product.price)
                      ? `$${product.price.toFixed(2)}`
                      : "N/A"}
                  </strong>
                  <div className="product-actions">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-cart btn-sm"
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
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

        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center custom-pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Shop;
