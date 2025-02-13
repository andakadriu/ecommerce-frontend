import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="container">
        <ul className="navbar-nav">
          <li>
            <Link to="/admin/products" className="nav-link">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/add-product" className="nav-link">Add Product</Link>
          </li>
          <li>
            <Link to="/admin/orders" className="nav-link">View Orders</Link>
          </li>
          <li>
            <Link to="/" className="nav-link">Go to Home</Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
