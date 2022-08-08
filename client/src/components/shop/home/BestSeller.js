import React from "react";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./BestSeller.scss";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// function buttonCLicked() {
//   // const history = useHistory();
//   // history.push({
//   //   pathname: "/products/60ed5aabbd5fe23f44a94021",
//   // });
// }

function BestSeller() {
  return (
    <React.Fragment>
      <div className="bestClass">
        <h3>Testimonals</h3>
        <center>
          {" "}
          <h4></h4>
        </center>
        <Carousel className="test" responsive={responsive}>
          <h5>
            We ‘The people’ have constantly delpeted all things nature inorder
            to make it more luxurious and call it better . Better , Really ?
            It’s time for a mindset change on what luxurious and better is .
            Being conscious with tiny things will make the biggest impact . Lets
            start today and make small drops of actions into a mighty healthy
            Enviornment. <b>-Message from the founder</b>
          </h5>
          <h5>
            --“We have forgotten how to be good guests, how to walk lightly on
            the earth as its other creatures do.”<b>—Barbara Ward</b>
          </h5>
          <h5>
            --“You cannot get through a single day without having an impact on
            the world around you. What you do makes a difference and you have to
            decide what kind of a difference you want to make.”<b>—Jane Goodall</b>”
          </h5>
          <h5>
            --“The Earth is a fine place and worth fighting for.”<b>—Ernest
            Hemingway</b>”
          </h5>
          <h5>
            --“The environment is where we all meet; where we all have a mutual
            interest; it is the one thing all of us share.”<b>—Lady Bird Johnson</b>
          </h5>
          <h5>
            --“ Look at what they’ve done the earth cried to the moon they’ve
            turned me into one entire bruise”<b> —Rupi Kaur</b>
          </h5>
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default BestSeller;
