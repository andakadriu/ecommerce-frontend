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
  const [sortOption, setSortOption] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");

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

    if (searchQuery) {
      newFiltered = newFiltered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "price-low-high") {
      newFiltered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "price-high-low") {
      newFiltered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(newFiltered);
    setCurrentPage(1);
  }, [category, products, minPrice, maxPrice, sortOption, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="shop-container container-fluid" data-aos="fade-up">
      <div className="row">
        <aside className="shop-sidebar col-lg-3 col-md-4 col-12" data-aos="fade-right">
          <h3 className="mb-4">Filter by</h3>
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mb-3"
          />
          <div className="price-filter mb-4">
            <label className="d-block mb-2">Price</label>
            <input
              type="range"
              min="29"
              max="58"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-100"
            />
            <input
              type="range"
              min="29"
              max="58"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-100"
            />
            <div className="d-flex justify-content-between mt-1">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </aside>

        <div className="shop-main col-lg-9 col-md-8 col-12">
          <div className="shop-main-header mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center" data-aos="fade-left">
            <h2 className="m-0">
              {category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1) + " Products"}
            </h2>
            <div className="sort-by mt-3 mt-md-0">
              <label className="me-2">Sort by:</label>
              <select
                className="form-select"
                style={{ width: "180px" }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <p className="mb-3">{filteredProducts.length} products</p>

          <div className={`row d-flex flex-wrap ${filteredProducts.length === 1 ? "justify-content-center" : ""}`}>
  {currentProducts.map((product, index) => {
    const productId = product._productID || product.productID;
    const imageUrl =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "/default-image.jpg";

    return (
      <div
        key={productId}
        className="col-md mb-4"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <Link to={`/product/${productId}`} className="text-decoration-none">
          <div
            className="product-item p-3 border rounded"
            style={{
              minWidth: "250px",
              maxWidth: "300px",
              margin: "0 auto", 
            }}
          >
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
            <div className="product-actions text-center mt-2" data-aos="fade-up">
              <button onClick={() => addToCart(product)} className="btn btn-cart btn-sm">
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  })}
</div>

        </div>
      </div>
    </div>
  );
};

export default Shop;
