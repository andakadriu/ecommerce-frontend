// EditProduct.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = ({ products, setProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productToEdit = products.find((p) => p.productID === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    images: [],
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (!productToEdit) {
      axios.get(`https://localhost:7299/Product/Get/${id}`)
        .then((response) => {
          setFormData({
            name: response.data.name,
            category: response.data.categoryID.toString(),
            images: response.data.images || [],
            stock: response.data.stockQuantity.toString(),
            price: response.data.price.toString(),
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    } else {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.categoryID.toString(),
        images: productToEdit.images || [],
        stock: productToEdit.stockQuantity.toString(),
        price: productToEdit.price.toString(),
      });
    }
  }, [productToEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, images: [reader.result] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productID: parseInt(id),
      name: formData.name,
      description: productToEdit?.description || "", 
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stock, 10),
      categoryID: parseInt(formData.category, 10),
      products: [],
      isDeleted: false,
      category: formData.category,
      images: formData.images,
    };

    try {
      const response = await axios.post(`https://localhost:7299/Product/Update`, updatedProduct, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Update Response:", response.data);
      setProducts((prev) =>
        prev.map((p) => (p.productID === parseInt(id) ? { ...p, ...updatedProduct } : p))
      );
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
          {formData.images.length > 0 && <img src={formData.images[0]} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px", objectFit: "cover" }} />}
        </Form.Group>

        <Form.Group controlId="formStock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Update Product</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
