import React from 'react';
import '../../src/assets/styles/style.css';
import img1 from "../../src/assets/styles/images/1.png";
import img2 from "../../src/assets/styles/images/2.png";
import img3 from "../../src/assets/styles/images/3.png";

const WeHelpSection = () => {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img src={img1} alt="Untree.co" className="img-fluid" />
              </div>
              <div className="grid grid-2">
                <img src={img2} alt="Untree.co" className="img-fluid" />
              </div>
              <div className="grid grid-3">
                <img src={img3} alt="Untree.co" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">We Help You Make Modern Interior Design</h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada.
            </p>

            <ul className="list-unstyled custom-list my-4">
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
            </ul>
            <p><a href="#" className="btn">Explore</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeHelpSection;
