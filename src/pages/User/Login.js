import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GoogleAuthProvider } from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  //google auth requires

  const userLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "login user");
        toast.success("Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  //loginWithGoogle
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user, "Login successful");
        toast.success("Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3 text-center">Login Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form action="" className="row g-4" onSubmit={userLogin}>
                        <div className="col-12">
                          <label>
                            Username<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Username"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="inlineFormCheck"
                            />
                            <label
                              className="form-check-label"
                              for="inlineFormCheck"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <Link
                            to="/forgot-password"
                            className="float-end text-primary"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="col-12 d-grid gap-1">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="row py-2">
                          <div className=" col-12">
                            <div className="d-grid gap-2">
                              <button
                                className="btn btn-secondary text-white"
                                type="button"
                                onClick={loginWithGoogle}
                              >
                                <FcGoogle />
                                <AiOutlineArrowRight className="text-info" />
                                Login with Google
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          {/* <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            login
                          </button> */}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <div className="form-right h-100 bg-info text-white text-center pt-5">
                      <i className="bi bi-bootstrap"></i>
                      <h2 className="fs-1">Welcome </h2>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-end text-secondary mt-3">
                Bootstrap 5 Login Page Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
