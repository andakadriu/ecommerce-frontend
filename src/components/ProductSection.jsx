import React from 'react';
import '../../src/assets/styles/style.css';
import img1 from "../../src/assets/styles/images/product-1.png";
import img2 from "../../src/assets/styles/images/product-2.png";
import img3 from "../../src/assets/styles/images/product-3.png";

const ProductSection = () => {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row">

          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <p><a href="shop.html" className="btn">Explore</a></p>
          </div> 

          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <a className="product-item" href="cart.html">
              <img src={img1} className="img-fluid product-thumbnail" alt="Nordic Chair" />
              <h3 className="product-title">Nordic Chair</h3>
              <strong className="product-price">$50.00</strong>

              <span className="icon-cross">
                <img src="images/cross.svg" className="img-fluid" alt="Cross Icon" />
              </span>
            </a>
          </div> 

          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <a className="product-item" href="cart.html">
              <img src={img2} className="img-fluid product-thumbnail" alt="Kruzo Aero Chair" />
              <h3 className="product-title">Kruzo Aero Chair</h3>
              <strong className="product-price">$78.00</strong>

              <span className="icon-cross">
                <img src="images/cross.svg" className="img-fluid" alt="Cross Icon" />
              </span>
            </a>
          </div>

          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <a className="product-item" href="cart.html">
              <img src={img3} className="img-fluid product-thumbnail" alt="Ergonomic Chair" />
              <h3 className="product-title">Ergonomic Chair</h3>
              <strong className="product-price">$43.00</strong>

              <span className="icon-cross">
                <img src="images/cross.svg" className="img-fluid" alt="Cross Icon" />
              </span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductSection;
