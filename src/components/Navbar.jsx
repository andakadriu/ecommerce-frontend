import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/styles/images/user.svg";
import cartIcon from "../assets/styles/images/cart.svg";

const Navbar = ({ cartItems }) => {
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="custom-navbar navbar navbar-expand-md navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BELLA MAISON<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="custom-navbar-nav navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">All</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=bedroom">Bedroom</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=kitchen">Kitchen</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=lighting">Lighting</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=decoration">Decoration</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=furniture">Furniture</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=bathroom">Bathroom</Link>
            </li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav ms-5">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <img src={userIcon} alt="User" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <img src={cartIcon} alt="Cart" />
                {totalCartItems > 0 && (
                  <span className="cart-badge">{totalCartItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
