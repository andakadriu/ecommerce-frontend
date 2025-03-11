import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaPhone, FaLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/style.css";

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const getSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getShippingCost = () => (getSubtotal() >= 50 ? 0 : 2);
  const getTotalPrice = () => getSubtotal() + getShippingCost();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }

    const orderPayload = {
      OrderID: 0,
      OrderStatus: "Confirmed",
      TotalAmount: getSubtotal(),
      GrandTotal: getTotalPrice(),
      TotalItems: totalItems,
      FullName: formData.name,
      Email: formData.email,
      ShippingAddress: formData.address,
      City: formData.city,
      PhoneNumber: formData.phone,
      Products: cartItems.map((item) => ({
        ProductID: item.productID || 0,
        QuantityOrdered: item.quantity,
        Price: item.price,
        Name: item.name || "",
        Description: item.description || "",
      })),
    };

    try {
      const response = await axios.post("https://localhost:7299/Order/CheckoutOrder", orderPayload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Thank you! Your order has been placed successfully.");
        navigate("/confirmation");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-image">
        <h2>Secure & Fast Checkout</h2>
      </div>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Billing Details</h3>
          <div className="form-group">
            <FaUser className="icon" />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <FaMapMarkerAlt className="icon" />
            <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <FaCity className="icon" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <FaPhone className="icon" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          </div>
          <button type="submit" className="checkout-btn">Place Order</button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: <strong>${getSubtotal().toFixed(2)}</strong></p>
          <p>Shipping: <strong>${getShippingCost().toFixed(2)}</strong></p>
          <p className="total">Total: <strong>${getTotalPrice().toFixed(2)}</strong></p>
          {/* <div className="secure-payment">
            <FaLock className="lock-icon" />
            <span>Secure Payment</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;