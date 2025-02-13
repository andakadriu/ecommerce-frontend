import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = ({ products, setProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productToEdit = products.find((p) => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        image: productToEdit.image,
        stock: productToEdit.stock.toString(),
        price: productToEdit.price.toString(),
      });
    }
  }, [productToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...productToEdit,
      name: formData.name,
      category: formData.category.toLowerCase(),
      image: formData.image,
      stock: parseInt(formData.stock, 10),
      price: parseFloat(formData.price),
    };

    setProducts(
      products.map((p) => (p.id === productToEdit.id ? updatedProduct : p))
    );
    navigate("/admin/products");
  };

  return (
    <Container>
      <h2 className="mb-4">Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                objectFit: "cover",
              }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="formStock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
