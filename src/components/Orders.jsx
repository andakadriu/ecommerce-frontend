import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7299/Order/OrdersList");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container">
      <h3 className="mb-4">View Orders</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order.orderID || index} onClick={() => handleRowClick(order)} style={{ cursor: "pointer" }}>
              <td>{order.orderID}</td>
              <td>{order.orderStatus}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.totalAmount}</td>
              <td>{order.grandTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for order details */}
      {selectedOrder && (
        <>
          <div className="modal show fade" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Details - ID: {selectedOrder.orderID}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
                  <p><strong>Total Amount:</strong> {selectedOrder.totalAmount}</p>
                  <p><strong>Total Items:</strong> {selectedOrder.totalItems}</p>
                  <p><strong>Grand Total:</strong> {selectedOrder.grandTotal}</p>
                  <p><strong>Full Name:</strong> {selectedOrder.fullName}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
                  <p><strong>City:</strong> {selectedOrder.city}</p>
                  <p><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
                  <p><strong>Quantity Ordered:</strong> {selectedOrder.quantityOrdered}</p>

                  <hr />
                  <h6>Products:</h6>
                  {selectedOrder.products && selectedOrder.products.length > 0 ? (
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Name</th>
                          {/* <th>Description</th> */}
                          <th>Price</th>
                          <th>Stock Quantity</th>
                          <th>Category ID</th>
                          <th>Quantity Ordered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.products.map((product) => (
                          <tr key={product.productID}>
                            <td>{product.productID}</td>
                            <td>{product.name}</td>
                            {/* <td>{product.description}</td> */}
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.categoryID}</td>
                            <td>{product.quantityOrdered}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Products</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Orders;
