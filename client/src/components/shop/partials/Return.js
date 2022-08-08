import React, { useEffect } from "react";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";
import "./terms.scss";
import Layout from "../layout";

const Return = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Layout>
        <Navber />
        <div className="termsContainer">
          <h3  style={{marginTop:"30px"}}> Return Policy: </h3>

          <p>
            We, House of Miani follows a discipline quality check before
            shipping the product. We take return of the product if it is in
            damaged condition.
          </p>

          <h3>Conditions:</h3>

          <li>
            We request you to take unboxing video to process the return request.{" "}
          </li>

          <li>
            We accepts return incase client receives a wrong product or the
            product in damaged condition only.{" "}
          </li>
          <li>
            Kindly inform us within 24hrs of product receives to process the
            return request for damaged/ wrong product.{" "}
          </li>

          <li>
            The damaged product will be replaced with new product. The cost of
            returning the damaged product borne by our side.
          </li>

          <li>
            Product should be in unworn condition/ Fold shouldn’t be missed/ not
            stiched blouse material.
          </li>

          <li>
            Once the return request is accepted, we will provide you the details
            where to ship the product. Once the product received in our side, we
            will verify and initiate the replacement.
          </li>

          <li>We don't accept the return in below situation.</li>

          <li>
            Slight colour variation of the product as we take pictures under
            natural light, the colour may slightly vary.
          </li>

          <li>
            Slight thread pull/ Normal removal stain may happen during
            manufacturing time.
          </li>

          <li>
            Dying sarees may have some dye marks on them (very rare). These are
            all not be considered as damage.
          </li>

          <li>
            If any issue or clarification you can reach us to our WhatsApp:
            6369135316 or E-mail: houseofmiani@gmail.com
          </li>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Return;
