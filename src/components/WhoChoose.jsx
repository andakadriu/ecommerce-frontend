import React from 'react';
import '../../src/assets/styles/style.css';
import img1 from "../../src/assets/styles/images/truck.svg";
import img2 from "../../src/assets/styles/images/bag.svg";
import img3 from "../../src/assets/styles/images/support.svg";
import img4 from "../../src/assets/styles/images/return.svg";
import whychooseus from "../../src/assets/styles/images/sofra.png";

const WhyChooseSection = () => {
  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <h2 className="section-title">Why Choose Us</h2>
            <p>
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>

            <div className="row my-5">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={img1} alt="Fast & Free Shipping" className="img-fluid" />
                  </div>
                  <h3>Fast &amp; Free Shipping</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={img2} alt="Easy to Shop" className="img-fluid" />
                  </div>
                  <h3>Easy to Shop</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={img3} alt="24/7 Support" className="img-fluid" />
                  </div>
                  <h3>24/7 Support</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={img4} alt="Hassle Free Returns" className="img-fluid" />
                  </div>
                  <h3>Hassle Free Returns</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-5">
            <div className="img-wrap">
              <img src={whychooseus} alt="Why Choose Us" className="img-fluid" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
