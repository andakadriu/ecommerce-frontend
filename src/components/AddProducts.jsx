import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryID: "",
    stockQuantity: "",
    price: "",
    discountValue: "",  // New field for discount
    newPrice: "", // Auto-calculated field
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://localhost:7299/Category/CategoriesList", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Calculate New Price when Price or Discount changes
  useEffect(() => {
    if (formData.price && formData.discountValue) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discountValue);
      if (!isNaN(price) && !isNaN(discount)) {
        const newPrice = (price - (price * discount / 100)) || 0;
        setFormData((prev) => ({ ...prev, newPrice: Number(newPrice.toFixed(2)) }));
        
      }
    }
  }, [formData.price, formData.discountValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("CategoryID", formData.categoryID);
    data.append("StockQuantity", formData.stockQuantity);
    data.append("Price", formData.price);
    data.append("DiscountValue", formData.discountValue || 0);

    for (let i = 0; i < formData.images.length; i++) {
        data.append("Images", formData.images[i]);
    }

    try {
        const response = await axios.post("https://localhost:7299/Product/Create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Response:", response);

        if (response.status === 200 && response.data === true) {
            alert("Product added successfully!");
            setFormData({
                name: "",
                description: "",
                categoryID: "",
                stockQuantity: "",
                price: "",
                discountValue: "",
                newPrice: "",
                images: [],
            });
            setImagePreviews([]);
            navigate("/admin/products");
        } else {
            console.error("Unexpected response:", response.data);
            alert(`Unexpected response: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error);
        alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
};



  return (
    <Container>
      <h2 className="mb-4">Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter product name" value={formData.name} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" placeholder="Enter product description" value={formData.description} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" name="categoryID" value={formData.categoryID} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formImages" className="mb-3">
          <Form.Label>Product Images</Form.Label>
          <Form.Control type="file" name="images" onChange={handleFileChange} accept="image/*" multiple required />
          <div className="mt-2">
            {imagePreviews.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px", marginTop: "10px" }} />
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="formStock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="stockQuantity" placeholder="Enter stock quantity" value={formData.stockQuantity} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" step="0.01" name="price" placeholder="Enter price" value={formData.price} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formDiscount" className="mb-3">
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control type="number" step="0.01" name="discountValue" placeholder="Enter discount value" value={formData.discountValue} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formNewPrice" className="mb-3">
          <Form.Label>New Price (After Discount)</Form.Label>
          <Form.Control type="text" value={(formData.newPrice || 0).toFixed(2)} readOnly />
        </Form.Group>

        <Button variant="primary" type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
