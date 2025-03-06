import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";  
import "../../src/assets/styles/style.css";

const Shop = ({ addToCart }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [minPrice, setMinPrice] = useState(29);
  const [maxPrice, setMaxPrice] = useState(58);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

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
    let newFiltered = [...products];
    if (category !== "all") {
      newFiltered = newFiltered.filter(
        (product) => product.category && product.category.toLowerCase() === category.toLowerCase()
      );
    }
    newFiltered = newFiltered.filter((product) => {
      const price = Number(product.price);
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(newFiltered);
    setCurrentPage(1);
  }, [category, products, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="shop-container container" data-aos="fade-up">
      <aside className="shop-sidebar" data-aos="fade-right">
        <h3 className="mb-4">Filter by</h3>
        <div className="price-filter mb-4">
          <label className="d-block mb-2">Price</label>
          <input type="range" min="29" max="58" className="w-100" />
          <div className="d-flex justify-content-between mt-1">
            <span>$29</span>
            <span>$58</span>
          </div>
        </div>
      </aside>

      <div className="shop-main">
        <div className="shop-main-header mb-4" data-aos="fade-left">
          <h2 className="m-0">
            {category === "all"
              ? "All Products"
              : category.charAt(0).toUpperCase() + category.slice(1) + " Products"}
          </h2>
          <div className="sort-by">
            <label className="me-2">Sort by:</label>
            <select className="form-select" style={{ width: "180px" }}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <p className="mb-3">{filteredProducts.length} products</p>

        <div className="row">
          {currentProducts.map((product, index) => {
            const productId = product._productID || product.productID;
            const imageUrl =
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : "/default-image.jpg";
            return (
              <div
                key={productId}
                className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Link to={`/product/${productId}`} className="text-decoration-none">
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
                    <h3 className="product-title" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      {product.name}
                    </h3>
                    <strong className="product-price d-block mb-3">
                      {product.price && !isNaN(product.price)
                        ? `$${Number(product.price).toFixed(2)}`
                        : "N/A"}
                    </strong>
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

        {filteredProducts.length === 0 && <p className="text-center">No products found in this category.</p>}

        {totalPages > 1 && (
          <nav data-aos="fade-up">
            <ul className="pagination justify-content-center custom-pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => paginate(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => currentPage < totalPages && paginate(currentPage + 1)}>
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
