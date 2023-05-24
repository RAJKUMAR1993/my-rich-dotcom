import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "rishi@gmail.com") {
    return children;
  }
  return null;
  //  (
  //   <>
  //     <section style={{ display: "none" }}>
  //       <div className="container">
  //         <h5>Permission Denied</h5>
  //         <h5>This page can only be view buy an Admin user</h5>
  //         <button className="btn btn-sm btn-primary"> Back</button>
  //       </div>
  //     </section>
  //   </>
  // );
};
export const AdminOnlyLinks = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "rishi@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
