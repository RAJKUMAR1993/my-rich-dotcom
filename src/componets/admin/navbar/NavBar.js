import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../navbar/navbar.css";
import { useSelector } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";
console.log(selectEmail);

const NavBar = () => {
  const activeLink = " text-danger text-bold nav-link text-decoration-none";
  const normalLink = " nav-link text-decoration-none";
  const userEmail = useSelector(selectEmail);
  console.log(userEmail);
  return (
    <>
      <div class="sidebar">
        <div>
          <Link
            className="fs-bold h6 text-decoration-none active text-dark"
            to="home"
          >
            {userEmail}
          </Link>
        </div>
        <Link
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to="home"
        >
          Home
        </Link>
        <Link
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to="add-product"
        >
          Add Product
        </Link>
        <Link
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to="all-products"
        >
          View Products
        </Link>
        <Link
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          to="orders"
        >
          Orders
        </Link>
      </div>
    </>
  );
};

export default NavBar;
