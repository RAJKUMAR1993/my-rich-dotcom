import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//components //
import Layout from "./componets/layout/Layout";
import Products from "./componets/products/Products";
import SingleProduct from "./componets/products/SingleProduct";
import ProductDetails from "./componets/products/ProductDetails";
// pages//
import Home from "./pages/home/Home";
import Aboutus from "./pages/about/Aboutus";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import Wishlist from "./pages/wishlist/Wishlist";
// pre-loader
import { FallingLines } from "react-loader-spinner";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Forgotpassword from "./pages/User/Forgotpassword";
//admin routes
import AdminOnlyRoute from "./componets/adminOnlyRoute/AdminOnlyRoute";
import Admin from "././pages/admin/Admin";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/single-product" element={<SingleProduct />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/cart" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/check-out" element={<Checkout />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<Forgotpassword />} />
              <Route
                path="/admin/*"
                element={<AdminOnlyRoute>{<Admin />}</AdminOnlyRoute>}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
