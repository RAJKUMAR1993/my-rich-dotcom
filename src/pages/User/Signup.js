import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ColorRing } from "react-loader-spinner";
import Loader from "../../Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bcrypt from "bcryptjs";

// validation schema
const schema = yup.object({
  name: yup
    .string()
    .min(3, "name is a required field, to small")
    .max(20, "20 chars to long")
    .required(),
  email: yup.string().email().max(150, "150 Long!").required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (userData) => {
  //   const hashedPassword = bcrypt.hashSync(
  //     password,
  //     "$2a$10$CwTycUXWue0Thq9StjUM0u"
  //   );
  //   console.log(userData);
  //   if (userData.password !== userData.confirmPassword) {
  //     toast.error("Password do not match");
  //   }
  //   localStorage.setItem("name", JSON.stringify(name));
  //   localStorage.setItem("email", JSON.stringify(email));
  //   localStorage.setItem("password", JSON.stringify(password));
  // };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password do not match");
    }
    // google account register process
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3 text-center">Register Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form
                        action=""
                        className="row g-4"
                        onSubmit={registerUser}
                      >
                        <div className="col-12">
                          <label>
                            FullName<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              {...register("name")}
                              type="text"
                              className="form-control"
                              placeholder="Enter full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <small id="nameHelp" className="text-danger">
                            {errors["name"]?.message}
                          </small>
                        </div>
                        <div className="col-12">
                          <label>
                            Email<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              {...register("email")}
                              type="text"
                              className="form-control"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <small id="nameHelp" className="text-danger">
                            {errors["email"]?.message}
                          </small>
                        </div>
                        <div className="col-12">
                          <label>
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              {...register("password")}
                              type="password"
                              className="form-control"
                              placeholder="Enter Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <small id="nameHelp" className="text-danger">
                            {errors["password"]?.message}
                          </small>
                        </div>
                        <div className="col-12">
                          <label>
                            Confirm Password
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              {...register("confirmPassword")}
                              type="password"
                              className="form-control"
                              placeholder=" Confirm Password"
                              value={cPassword}
                              onChange={(e) => setCPassword(e.target.value)}
                            />
                          </div>
                          <small id="nameHelp" className="text-danger">
                            {errors["confirmPassword"]?.message}
                          </small>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check"></div>
                        </div>

                        <div className="col-sm-6">
                          <Link
                            to="/login"
                            className="float-end text-primary text-decoration-none"
                          >
                            you have a account ? please Login
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
                              >
                                <FcGoogle />
                                <AiOutlineArrowRight className="text-info" />
                                Login with Google
                              </button>
                            </div>
                          </div>
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

export default Signup;
