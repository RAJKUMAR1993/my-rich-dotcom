import React from "react";
import { FallingLines } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="loader-spinner">
      <FallingLines
        color="#00FF7F"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;
