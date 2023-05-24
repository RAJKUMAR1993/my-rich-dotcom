import React from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import "../slider/slider.css";
const Slider = () => {
  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };
  const slideImages = [
    {
      url: "https://i.ibb.co/g9Jd6nP/1.png",
      // caption: "Slide 1",
    },
    {
      url: "https://i.ibb.co/mG5QJDk/11.png",
      // caption: "Slide 2",
    },
    {
      url: "https://i.ibb.co/M6XDJHJ/13.png",
      // caption: "Slide 3",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6 col-sm-12 slider">
            <div className="slide-container">
              <Slide>
                {slideImages.map((slideImage, index) => (
                  <div key={index}>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${slideImage.url})`,
                      }}
                    >
                      <span style={spanStyle}>{slideImage.caption}</span>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
