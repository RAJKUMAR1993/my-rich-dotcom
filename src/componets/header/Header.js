import React, { useEffect, useState } from "react";
import "../header/header.css";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SET_USER_ACTIVE, removeActiveUser } from "../../redux/slice/authSlice";
import AdminOnlyRoute from "../adminOnlyRoute/AdminOnlyRoute";

const Header = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  // const [active, setActive] = useState("default");
  const activeLink = " text-info text-bold nav-link text-decoration-none";
  const normalLink = " nav-link text-decoration-none";
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // const uid = user.uid;
        if (user.displayName == null) {
          const dsName = user.email.slice(0, -10);
          const uName = dsName.charAt(0).toUpperCase() + dsName.slice(1);
          setUserName(uName);
        } else {
          setUserName(user.displayName);
        }

        dispatch(
          SET_USER_ACTIVE({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(removeActiveUser());
      }
    });
  }, []);

  // logOut user
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign-out successful.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="container-fluid">
        {/* <div className="row bg-info py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <Link className="text-dark text-decoration-none" to="">
                FAQs
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-dark text-decoration-none" hr to="">
                Help
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-dark text-decoration-none" hr to="">
                Support
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-dark pl-2" href="">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div> */}
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="" className="text-decoration-none">
              <p className="m-0 display-6 fontSize">
                <span className="text-primary fst-italic text-info">My🛍️</span>
                Shopper
              </p>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
            <a href="" className="btn ">
              <AiOutlineHeart className="text-primary fa-2x" />
              <span className="badge text-primary">0</span>
            </a>
            <a href="" className="btn ">
              <AiOutlineShoppingCart className=" fa-2x" />
              <span className="badge text-primary ">0</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <AdminOnlyRoute>
                      <NavLink
                        to="/admin/home"
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                        aria-current="page"
                      >
                        Admin
                      </NavLink>
                    </AdminOnlyRoute>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      Product
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <li class="nav-item dropdown">
                      <Link
                        to=""
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Pages
                      </Link>
                      <ul class="dropdown-menu">
                        <li>
                          <Link to="/cart" class="dropdown-item">
                            Shopping Cart
                          </Link>
                        </li>
                        <li>
                          <Link to="/check-out" class="dropdown-item">
                            Checkout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/blog"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      Blog
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/about-us"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="navbar-nav ml-auto py-0">
                {userName ? (
                  <>
                    <h6 className="text-center text-success fs-bold mr-4 p-2">
                      {userName}
                    </h6>
                    <Link
                      onClick={logOut}
                      className={
                        (({ isActive }) =>
                          isActive
                            ? activeLink
                            : `${normalLink} nav-item nav-link margintop`,
                        "nav-item nav-link  margintop")
                      }
                    >
                      logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={
                        (({ isActive }) =>
                          isActive
                            ? activeLink
                            : `${normalLink} nav-item nav-link`,
                        "nav-item nav-link")
                      }
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className={
                        (({ isActive }) =>
                          isActive
                            ? activeLink
                            : `${normalLink} nav-item nav-link`,
                        "nav-item nav-link")
                      }
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
