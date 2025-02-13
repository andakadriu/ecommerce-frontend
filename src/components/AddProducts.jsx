import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = ({ addNewProduct }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryID: "", // Use categoryID here for the dropdown
    images: [],
    stock: "",
    price: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:21673/Category/CategoriesList", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data); // Set categories in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        fileUrls.push(reader.result);
        if (fileUrls.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            images: fileUrls,
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      description: formData.description,
      categoryID: formData.categoryID, // Use categoryID
      images: formData.images,
      stock: parseInt(formData.stock, 10),
      price: parseFloat(formData.price),
    };

    axios
      .post("http://localhost:21673/Product/Create", newProduct)
      .then((response) => {
        const addedProduct = response.data;
        addNewProduct(addedProduct); // Add the newly added product to the list
        setFormData({
          name: "",
          description: "",
          categoryID: "",
          images: [],
          stock: "",
          price: "",
        });
        navigate("/admin/products"); // Redirect to the product list page
      })
      .catch((error) => {
        console.error("Error adding product:", error.response?.data || error);
      });
  };

  return (
    <Container>
      <h2 className="mb-4">Add Product</h2>
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

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <select
            name="categoryID" // Use categoryID for the dropdown
            value={formData.categoryID}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Group>

        <Form.Group controlId="formImages" className="mb-3">
          <Form.Label>Product Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            required
          />
          <div>
            {formData.images && formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  marginTop: "10px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
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
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
