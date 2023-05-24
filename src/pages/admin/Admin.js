import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../componets/admin/navbar/NavBar";
import Home from "../../pages/home/Home";
import ViewProduct from "../../componets/admin/viewproduct/ViewProduct";
import AddProduct from "../../componets/admin/addproduct/AddProduct";
import Orders from "../../componets/admin/orders/Orders";
import "../admin/admin.css";
const Admin = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="all-products" element={<ViewProduct />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default Admin;
