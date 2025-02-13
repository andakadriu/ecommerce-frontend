// AdminDashboard.js
import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard({ products, setProducts }) {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/admin";


  const totalProducts = products.length;
  const totalStock = products.reduce((acc, prod) => acc + prod.stock, 0);
  const dummyOrders = 10; 

  const chartData = {
    labels: ["Total Products", "Total Stock", "Orders"],
    datasets: [
      {
        data: [totalProducts, totalStock, dummyOrders],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
        hoverBackgroundColor: ["#0056b3", "#1e7e34", "#d39e00"],
      },
    ],
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-light vh-100 p-0">
          <Nav defaultActiveKey="/admin" className="flex-column p-3">
            <Nav.Link as={Link} to="/admin" eventKey="dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/add-product" eventKey="add-product">
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/products" eventKey="products">
              Product List
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/orders" eventKey="orders">
              Orders
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {isDashboardHome ? (
            <>
              <h1 className="mb-4">Admin Dashboard</h1>
              <Row>
                <Col md={4}>
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Products</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>
                        {totalProducts}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Stock</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>
                        {totalStock}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Orders (Dummy)</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>
                        {dummyOrders}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                  <h3 className="text-center mb-3">Dashboard Chart</h3>
                  <Doughnut data={chartData} />
                </Col>
              </Row>
            </>
          ) : (
            <Outlet context={{ products, setProducts }} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
