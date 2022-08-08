import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";
import AliceCarousel from "react-alice-carousel";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import "react-alice-carousel/lib/alice-carousel.css";
import "./slider.scss";

const apiURL = process.env.REACT_APP_API_URL;
const styles = {
  fadeIn: {
    animation: "x 1s",
    marginTop:'5rem',
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
};

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    const timer = setTimeout(() => {
      nextSlide(data.sliderImages.length, slide, setSlide);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data.sliderImages.length, dispatch, slide]);

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2">
        {data.sliderImages.length > 0 ? (
          <StyleRoot>
            <img
              className="w-full"
              src={data.sliderImages[slide].slideImage}
              alt="sliderImage"
              style={styles.fadeIn}
            />
          </StyleRoot>
        ) : (
          ""
        )}
        {/* <svg
          onClick={(e) => prevSlide(data.sliderImages.length, slide, setSlide)}
          className="sliderClassLeft"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <svg
          onClick={(e) => nextSlide(data.sliderImages.length, slide, setSlide)}
          className="sliderClassRight"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg> */}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
