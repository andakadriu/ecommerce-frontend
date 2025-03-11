import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import Navbar from "./components/Navbar";
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
import HeroSection from "./components/HeroSection";
import ProductSection from "./components/ProductSection";
import WhyChooseSection from "./components/WhoChoose";
import PopularProduct from "./components/PopularProducts";
import WeHelpSection from "./components/WeHelpSection";
import TestimonialSlider from "./components/TestimonialSlider";
import BlogSection from "./components/BlogSection";
import ProductDetail from "./components/ProductsDetail"; 

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product) => {
    const quantityToAdd = product.quantity ? product.quantity : 1;
    setCartItems((prevCart) => [
      ...prevCart,
      { ...product, cartItemId: Date.now(), quantity: quantityToAdd }
    ]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const hideHeaderFooter = window.location.pathname.startsWith("/admin");

  return (
    <Router>
      <ScrollToTop />
      { <Navbar cartItems={cartItems} />}
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
              <ProductSection addToCart={addToCart} />
              <WhyChooseSection />
              <PopularProduct />
              <WeHelpSection />
              <TestimonialSlider />
              {/* <BlogSection /> */}
            </>
          }
        />
        <Route path="/shop" element={<Shop addToCart={addToCart} products={products} />} />
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
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} products={products} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin/*" element={<AdminDashboard products={products} setProducts={setProducts} />}>
          <Route
            path="add-product"
            element={<AddProduct addNewProduct={(newProduct) => setProducts([...products, newProduct])} />}
          />
          <Route path="products" element={<ProductList products={products} setProducts={setProducts} />} />
          <Route path="products/edit/:id" element={<EditProduct products={products} setProducts={setProducts} />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      { <Footer />}
    </Router>
  );
};

export default App;
