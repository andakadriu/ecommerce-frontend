import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductSection from "./components/ProductSection";
import WhyChooseSection from "./components/WhoChoose";
import PopularProduct from "./components/PopularProducts";
import WeHelpSection from "./components/WeHelpSection";
import TestimonialSlider from "./components/TestimonialSlider";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";
import ConfirmationPage from "./components/Confirmationpage";
import AdminDashboard from "./components/AdminDashboard";
import AddProduct from "./components/AddProducts";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import Orders from "./components/Orders";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const hideHeaderFooter = window.location.pathname.startsWith("/admin");

  return (
    <Router>
      {  <Navbar cartItems={cartItems} />}

      {showPopup && (
        <div className="cart-popup">
          Product added to cart!
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductSection />
              <WhyChooseSection />
              <PopularProduct />
              <WeHelpSection />
              <TestimonialSlider />
              <BlogSection />
            </>
          }
        />
        <Route
          path="/shop"
          element={<Shop addToCart={addToCart} products={products} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />

        <Route
          path="/admin/*"
          element={<AdminDashboard products={products} setProducts={setProducts} />}
        >
          <Route
            path="add-product"
            element={<AddProduct addNewProduct={(newProduct) => setProducts((prev) => [...prev, newProduct])} />}
          />
          <Route path="products" element={<ProductList products={products} setProducts={setProducts} />} />
          <Route path="edit-product/:id" element={<EditProduct products={products} setProducts={setProducts} />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </Router>
  );
};

export default App;
