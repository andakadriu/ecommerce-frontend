import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiLogOut } from "react-icons/fi"; // Import logout icon

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard({ products, setProducts }) {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/admin";
  const navigate = useNavigate(); // Navigation hook for redirection

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, prod) => acc + prod.stock, 0);
  const dummyOrders = 10;

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Logout function
  const handleSignOut = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Container fluid className="sidebar-container">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          {/* Sidebar Toggle Button for Mobile */}
          <Button
            variant="outline-light"
            className="d-lg-none me-2"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </Button>

          {/* <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand> */}

          {/* Logout Button (Door-Like Icon) */}
          <Button
            variant="outline-light"
            className="ms-auto"
            onClick={handleSignOut}
          >
            <FiLogOut size={20} className="me-1" /> Sign Out
          </Button>
        </Container>
      </Navbar>

      <Row className="mt-5">
        {/* Sidebar (Visible on large screens) */}
        <Col lg={2} className="sidebar-container d-none d-lg-block bg-light p-0 vh-100">
        <Nav defaultActiveKey="/admin" className="flex-column p-3">
            <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-product">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/admin/products">Product List</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
          </Nav>
        </Col>

        {/* Sidebar Offcanvas for Mobile View */}
        <Offcanvas show={sidebarOpen} onHide={() => setSidebarOpen(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin" onClick={() => setSidebarOpen(false)}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/add-product" onClick={() => setSidebarOpen(false)}>Add Product</Nav.Link>
              <Nav.Link as={Link} to="/admin/products" onClick={() => setSidebarOpen(false)}>Product List</Nav.Link>
              <Nav.Link as={Link} to="/admin/orders" onClick={() => setSidebarOpen(false)}>Orders</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <Col lg={10} className="sidebar-container p-4">
          {isDashboardHome ? (
            <>
              <h1 className="mb-4">Admin Dashboard</h1>
              <Row>
                <Col md={4} sm={6} xs={12}>
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Products</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>{totalProducts}</p>
                    </div>
                  </div>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Stock</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>{totalStock}</p>
                    </div>
                  </div>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Orders (Dummy)</h5>
                      <p className="card-text" style={{ fontSize: "2rem" }}>{dummyOrders}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={8} sm={10} xs={12} className="mx-auto">
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
