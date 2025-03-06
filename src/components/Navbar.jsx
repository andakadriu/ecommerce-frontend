import React, { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/styles/images/user.svg";
import cartIcon from "../assets/styles/images/cart.svg";

const Navbar = ({ cartItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
<nav className={`custom-navbar navbar navbar-expand-md navbar-dark fixed-top ${menuOpen ? "show" : ""}`}>
<div className="container">
        <div className="row align-items-center">
          <div className="col-8">
            <Link className="navbar-brand" to="/" onClick={closeMenu}>
              BELLA MAISON<span>.</span>
            </Link>
          </div>
          <div className="col-4 text-end">
          <button
  className="navbar-toggler"
  type="button"
  onClick={toggleMenu}
  aria-controls="navbarContent"
  aria-expanded={menuOpen}
  aria-label="Toggle navigation"
   
>
  <span className="navbar-toggler-icon" style={{ filter: "invert(44%) sepia(10%) saturate(914%) hue-rotate(172deg) brightness(92%) contrast(92%)" }}></span>
</button>

          </div>
        </div>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarContent">
          <ul className="custom-navbar-nav navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/shop" onClick={closeMenu}>
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=bedroom" onClick={closeMenu}>
                Bedroom
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=kitchen" onClick={closeMenu}>
                Kitchen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=lighting" onClick={closeMenu}>
                Lighting
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=decoration" onClick={closeMenu}>
                Decoration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=furniture" onClick={closeMenu}>
                Furniture
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop?category=bathroom" onClick={closeMenu}>
                Bathroom
              </Link>
            </li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav ms-5">
            <li className="nav-item">
              <Link className="nav-link" to="/admin" onClick={closeMenu}>
                <img src={userIcon} alt="User" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart" onClick={closeMenu}>
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
