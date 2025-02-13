import React from 'react';
import '../../src/assets/styles/style.css';
import img1 from "../../src/assets/styles/images/product-1.png";
import img2 from "../../src/assets/styles/images/product-2.png";
import img3 from "../../src/assets/styles/images/product-3.png";


const PopularProduct = () => {
  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">

          <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="product-item-sm d-flex">
              <div className="thumbnail">
                <img src={img1} alt="Nordic Chair" className="img-fluid" />
              </div>
              <div className="pt-3">
                <h3>Nordic Chair</h3>
                <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                <p><a href="#">Read More</a></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="product-item-sm d-flex">
              <div className="thumbnail">
                <img src={img2} alt="Kruzo Aero Chair" className="img-fluid" />
              </div>
              <div className="pt-3">
                <h3>Kruzo Aero Chair</h3>
                <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                <p><a href="#">Read More</a></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div className="product-item-sm d-flex">
              <div className="thumbnail">
                <img src={img3} alt="Ergonomic Chair" className="img-fluid" />
              </div>
              <div className="pt-3">
                <h3>Ergonomic Chair</h3>
                <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                <p><a href="#">Read More</a></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
