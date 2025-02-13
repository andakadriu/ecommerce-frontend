import React from "react";

const Orders = () => {
  return (
    <div className="container">
      <h3 className="mb-4">View Orders</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1234</td>
            <td>John Doe</td>
            <td>Nordic Chair</td>
            <td>2</td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
