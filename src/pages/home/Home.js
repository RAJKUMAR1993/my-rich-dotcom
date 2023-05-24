import React from "react";
import FeatureProduct from "../../componets/feature/FeatureProduct";
import Categories from "../../componets/categories/Categories";
import Slider from "../../componets/slider/Slider";
import AdminOnlyRoute from "../../componets/adminOnlyRoute/AdminOnlyRoute";
const Home = () => {
  return (
    <>
      {/* <Slider />
      <FeatureProduct />
      <Categories /> */}
      <h4 className="text-primary text-center py-2">Home</h4>
      <AdminOnlyRoute />
    </>
  );
};

export default Home;
