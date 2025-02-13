import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = ({ products, setProducts }) => {
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:21673/Product/ProductsList");
      setProducts(response.data); // Update the list with the fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:21673/Product/Delete/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id)); // Update the list locally after deletion
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  useEffect(() => {
    fetchProducts(); // Fetch the products when the component loads
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Product List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.productID}>
                <td>{product.productID}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.images}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.stockQuantity}</td>
                <td>
  $
  {product.price && !isNaN(product.price)
    ? product.price.toFixed(2)
    : "N/A"}
</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
