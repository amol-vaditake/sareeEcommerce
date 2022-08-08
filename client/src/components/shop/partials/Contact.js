import React, { useEffect } from "react";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";
import "./about.scss";
import Layout from "../layout";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Layout>

      <Navber />
      <div className="aboutContainer">
        <h3 style={{ textAlign: "center",marginTop:"50px" }}>Contact Us</h3>
<h4>House  of Miani <br/>
182 NP street <br/>
Sivakasi- 626130<br/>
Tamilnadu, India <br/><br/>
 
houseofmiani@gmail.com <br/>
+91 6369135316</h4>
      
      </div>
      </Layout>
    </React.Fragment>
  );
};

export default Contact;
