import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, onCheckout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', phone: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.phone) {
      alert('Please fill in all fields.');
      return;
    }

    const orderDetails = {
      ...formData,
      cartItems,
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    setOrderPlaced(true);
    
    navigate('/confirmation');

    alert('Thank you! Your order has been placed successfully.');
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <h2 className="text-black h4 text-uppercase">Checkout</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="form-group">
                <label className="text-black" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="address">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-black btn-lg btn-block"
               style={{ backgroundColor: "#385174", color: "#fff" }}>Place Order</button>
            </form>
          </div>
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Order Summary</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">${totalAmount.toFixed(2)}</strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">${totalAmount.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
