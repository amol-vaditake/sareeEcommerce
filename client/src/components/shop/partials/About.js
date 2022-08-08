import React, { useEffect } from "react";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";
import "./about.scss";
import Layout from "../layout";
// export const HomeContext = createContext();

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Layout>
        <Navber />
        <div className="aboutContainer">
          <h3 style={{ marginTop: "50px" }}>About House Of Miani </h3>
          <p>
            We,House of Miani, more Passionate to bring unique texture & always
            love to play with colours. We have a wide variety of handpicked
            collections from all over India.
          </p>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default About;
