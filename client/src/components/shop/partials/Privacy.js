import React, { useEffect } from "react";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";
import "./terms.scss";
import Layout from "../layout";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Layout>
      <Navber />
      <div className="termsContainer">
        <h3  style={{marginTop:"30px"}}>The Privacy Policy </h3>
        <p>
          www.houseofmiani.com recognizes the importance of maintaining
          your privacy. We value your privacy and appreciate your trust in us.
          This Policy describes how we treat user information we collect on
          www.houseofmiani.com and other offline sources. This Privacy
          Policy applies to current and former visitors to our website and to
          our online customers. By visiting and/or using our website, you agree
          to this Privacy Policy.
        </p>
      
        <h4>Personal identification information</h4>
        <p>
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, register on the site place an order fill out a form subscribe to
          the newsletter and in connection with other activities, services,
          features or resources we make available on our Site. Users may be
          asked for, as appropriate, name, email address, mailing address, phone
          number, credit card information,
          <br />
          Users may, however, visit our Site anonymously.
          <br /> We will collect personal identification information from Users
          only if they voluntarily submit such information to us. Users can
          always refuse to supply personally identification information, except
          that it may prevent them from engaging in certain Site related
          activities.
        </p>
        <h4>Non-personal identification information</h4>
        <p>
          We may collect non-personal identification information about Users
          whenever they interact with our Site. Non-personal identification
          information may include the browser name, the type of computer and
          technical information about Users means of connection to our Site,
          such as the operating system and the Internet service provider’s
          utilized and other similar information.
        </p>

        <h4>Web browser cookies</h4>
        <p>
          Our Site may use “cookies” to enhance User experience. User’s web
          browser places cookies on their hard drive for record-keeping purposes
          and sometimes to track information about them. User may choose to set
          their web browser to refuse cookies, or to alert you when cookies are
          being sent. If they do so, note that some parts of the Site may not
          function properly.
        </p>
        <h4>How we use collected information</h4>
        <p>
        houseofmiani Private Limited collects and uses Users personal
          information for the following purposes:
        </p>
        <h4>To improve customer service</h4>
        <p>
          Your information helps us to more effectively respond to your customer
          service requests and support needs.
        </p>
        <h4>To improve our Site</h4>
        <p>
          We continually strive to improve our website offerings based on the
          information and feedback we receive from you.
        </p>
        <h4>To process transactions</h4>
        <p>
          We may use the information Users provide about themselves when placing
          an order only to provide service to that order. We do not share this
          information with outside parties except to the extent necessary to
          provide the service.
        </p>
        <p>i.e. – SMS services, Email services etc..</p>
        <h4>
          To administer a content, promotion, survey or other Site feature
        </h4>
        <h4>
          To send Users information they agreed to receive about topics we think
          will be of interest to them.
        </h4>
        <h4>To send periodic emails</h4>
        <p>
          The email address Users provide for order processing, will only be
          used to send them information and updates pertaining to their order.
          It may also be used to respond to their inquiries, and/or other
          requests or questions. We send promotional emails on special events
          with discount offers, If at any time the User would like to
          unsubscribe from receiving future emails, we include detailed
          unsubscribe instructions at the bottom of each email or User may
          contact us via our Site.
        </p>
        <h4>How we protect your information</h4>
        <p>
          We adopt appropriate data collection, storage and processing practices
          and security measures to protect against unauthorized access,
          alteration, disclosure or destruction of your personal information,
          username, password, transaction information and data stored on our
          Site.
        </p>
        <h4>Sharing your personal information</h4>
        <p>
          We do not sell, trade, or rent Users personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates and advertisers for the purposes outlined above. We may use
          third party service providers to help us operate our business and the
          Site or administer activities on our behalf, such as sending out
          newsletters or surveys. We may share your information with these third
          parties for those limited purposes provided that you have given us
          your permission.
        </p>
        <h4>Changes to this privacy policy</h4>
        <p>
          houseofmiani has the discretion to update this
          privacy policy at any time. When we do, revise the updated date at the
          bottom of this page, We encourage Users to frequently check this page
          for any changes to stay informed about how we are helping to protect
          the personal information we collect. You acknowledge and agree that it
          is your responsibility to review this privacy policy periodically and
          become aware of modifications.
        </p>
        <h4>Your acceptance of these terms</h4>
        <p>
          By using this Site, you signify your acceptance of this policy and
          terms of service. Your continued use of the Site following the posting
          of changes to this policy will be deemed your acceptance of those
          changes.
        </p>
      
      </div>
      </Layout>
          </React.Fragment>
  );
};

export default Privacy;
