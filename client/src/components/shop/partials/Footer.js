import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./footer.scss";
const Footer = (props) => {
  return (
    <Fragment>
      {/* <footer
        style={{ background: "#303031", color: "#87898A" }}
        className="z-10 py-6 px-4 md:px-12 text-center"
      >
        Develop & Design oddu © Copyright {moment().format("YYYY")}
      </footer> */}
      <div className="footerClass">
        {" "}
        <footer className="footerContainer">
          <div>
            <img src={require("../../shop/logo.png")} alt="logo" />

            <img
              style={{ marginTop: "30px", width: "auto", height: "80px" }}
              src={require("../../shop/razorpay.png")}
              alt="img"
            />
          </div>
          <div className="information">
            <h3>Policies</h3>
            <ul>
              <Link to="/terms-and-condition">
                {" "}
                <li>Terms & Conditions</li>
              </Link>
              <Link to="/privacy-policy">
                {" "}
                <li>Privacy Policy</li>
              </Link>
              <Link to="return-policy">
                {" "}
                <li>Return Policy</li>
              </Link>
              <Link to="shipping-payment-policy">
                {" "}
                <li>Shipping & Payment Policy </li>
              </Link>
            </ul>
          </div>
          <div className="information">
            <h3>Quick Links</h3>
            <ul>
              <Link to="/">
                {" "}
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                {" "}
                <li>About Us</li>
              </Link>
              <Link to="/contact-us">
                {" "}
                <li>Contact Us</li>
              </Link>
              <Link to="">
                {" "}
                <li style={{ color: "#000" }}>csdc</li>
              </Link>
            </ul>
          </div>
          <div className="information">
            <h3>Contact</h3>
            <ul>
              <li>Contact: +91-63691 35316</li>
              <li>Email: houseofmiani@gmail.com</li>
              <li>Timing: (10am - 7pm)</li>
              <li>
                <a href="https://www.instagram.com/houseofmiani/">
                  {" "}
                  <i
                    style={{
                      color: "#fff",
                      paddingRight: "10px",
                      fontSize: "20px",
                    }}
                    class="fa fa-instagram"
                  ></i>
                  - houseofmiani
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p style={{ textAlign: "center", color: "#fff" }}>
          {" "}
          © Copyright {moment().format("YYYY")},House Of Miani.
        </p>
        <a href="https://api.whatsapp.com/send?phone=916369135316&text=Hello,%20House%20Of%20Miani!">
          <img
            style={{
              height: "50px",
              borderRadius: "50%",
              position: "fixed",
              bottom: "18px",
              left: "20px",
            }}
            src={require("../../shop/whatsapp.png")}
            alt="whatsapp"
          />
        </a>
      </div>
    </Fragment>
  );
};

export default Footer;
