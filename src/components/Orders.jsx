import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="container">
      <h3 className="mb-4">View Orders</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Grand Total</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order.OrderID || index}>
              <td>{order.OrderID}</td>
              <td>{order.OrderStatus}</td>
              <td>{order.OrderDate}</td>
              <td>{order.TotalAmount}</td>
              <td>{order.GrandTotal}</td>
              <td>{order.ProductID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
