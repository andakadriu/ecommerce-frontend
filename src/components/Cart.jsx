import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems = [], updateQuantity, removeFromCart }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    return getSubtotal() >= 50 ? 0 : 2; 
  };

  const getTotalPrice = () => {
    let total = getSubtotal() + getShippingCost();
    if (discountApplied) {
      total = total * 0.9; 
    }
    return total.toFixed(2);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <form className="col-md-12">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">Your cart is empty</td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-thumbnail">
                          <img src={item.image} alt={item.title} className="img-fluid" />
                        </td>
                        <td className="product-name">
                          <h2 className="h5 text-black">{item.title}</h2>
                        </td>
                        <td>€{item.price.toFixed(2)}</td>
                        <td>
                          <div
                            className="input-group mb-3 d-flex align-items-center quantity-container"
                            style={{ maxWidth: "120px" }}
                          >
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-black decrease"
                                type="button"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control text-center quantity-amount"
                              value={item.quantity}
                              readOnly
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-black increase"
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>€{(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-black btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="row mt-4">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">Coupon</label>
                <p>Enter your coupon code if you have one.</p>
                <div className="row">
                  <div className="col-md-8 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control py-3"
                      id="coupon"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-black" onClick={handleApplyCoupon}
                      style={{ backgroundColor: "#385174", color: "#fff" }}>Apply Coupon</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">€{getSubtotal().toFixed(2)}</strong>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Shipping</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">
                      {getShippingCost() === 0 ? "Free" : `€${getShippingCost().toFixed(2)}`}
                    </strong>
                  </div>
                </div>
                {discountApplied && (
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Discount</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">-€{(getSubtotal() * 0.1).toFixed(2)}</strong>
                    </div>
                  </div>
                )}
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">€{getTotalPrice()}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <button
  className="btn btn-black btn-lg py-3 btn-block"
  onClick={() => navigate("/checkout")}
  style={{ backgroundColor: "#385174", color: "#fff" }} 
>
  Proceed To Checkout
</button>

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

export default Cart;
