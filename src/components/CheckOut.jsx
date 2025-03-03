import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getShippingCost = () =>
    getSubtotal() >= 50 ? 0 : 2;

  const getTotalPrice = () =>
    getSubtotal() + getShippingCost();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.phone
    ) {
      alert('Please fill in all fields.');
      return;
    }

    
    const orderPayload = {
      OrderID: 0, 
      OrderStatus: "Confirmed", 
      TotalAmount: getSubtotal(),
      GrandTotal: getTotalPrice(),
      FullName: formData.name,
      Email: formData.email,
      ShippingAddress: formData.address,
      City: formData.city,
      PhoneNumber: formData.phone,
      Orders: [],  
      Products: cartItems.map((item) => ({
        ProductID: item.productID || 0,
        QuantityOrdered: item.quantity,
        Price: item.price,
        Name: item.name || "",
        Description: item.description || "",
        Images: item.images || []  
      }))
    };

    console.log('Order Payload:', orderPayload);

    try {
      const response = await axios.post(
        "https://localhost:7299/Order/CheckoutOrder",
        orderPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        setOrderPlaced(true);
        alert('Thank you! Your order has been placed successfully.');
        navigate('/confirmation');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert('An error occurred while placing your order.');
    }
  };

  const totalAmount = getSubtotal();

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
              <br />
              <button
                type="submit"
                className="btn btn-black btn-lg btn-block"
                style={{ backgroundColor: "#385174", color: "#fff" }}
              >
                Place Order
              </button>
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
                    <strong className="text-black">${getTotalPrice().toFixed(2)}</strong>
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
