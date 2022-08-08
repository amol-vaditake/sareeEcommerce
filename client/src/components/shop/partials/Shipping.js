import React, { useEffect } from "react";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";
import "./terms.scss";
import Layout from "../layout";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Layout>
        <Navber />
        <div className="termsContainer">
          <h4 style={{ marginTop: "30px", textAlign: "center" }}>
            Shipping & Payment Policy
          </h4>
          <h4>SHIPPING</h4>

          <p>
            All orders are dispatched within 48 hours of placing the order. The
            only exception to this is if the next 48 hours falls on a Sunday or
            a public holiday.
          </p>
          <p>
            We will notify you along with the tracking details as soon as we
            have shipped the goods.
          </p>
          <h4>DELIVERY</h4>
          <h4>Domestic Delivery</h4>
          <p>
            Under normal circumstances all orders are delivered within 4-5
            business days of the order being shipped. However, remote locations
            may take 5-7 business days.
            <br />
            <br />
            Note: For any other delivery related issues, customers shall reach
            us at houseofmiani@gmail.com or WhatsApp +91-6369135316 along with
            the full delivery address, order id and the issue faced with
            delivery.
          </p>
          <h4>International Delivery</h4>
          <p>
            We ship our international orders DHL Ecommerce/ India Post for
            standard shipping. Please expect a delivery timeline of 2-3 weeks
            for the shipment to arrive to your place. In case you choose express
            shipping, we will ship the goods via DHL/ FedEx/ UPS depending upon
            the best courier company for your country.
            <br />
            <br />
            Some countries levy an import duty or taxes on goods which will be
            borne by the customer. Please check your local laws for more
            details.
            <br />
            <br />
            Feel free to reach out to us at houseofmiani@gmail.com if you face
            any issues with deliveries.
          </p>
          <h4>Payment Method:</h4>
          <li>
            Domestic Orders: Domestic customer can use our website service to
            place an order and make a payment through Debit Card, Credit Card,
            Net Banking or UPI payment.
          </li>
        
          <li>
          International Orders: Kindly reach out to us at houseofmiani@gmail.com or WhatsApp +91-6369135316 for international order. 
          </li>

          {/* <h4>RETURNS POLICY</h4>
        <h4>RETURNS</h4> */}
          {/* <p>
          Our policy lasts 7 days. If you are not happy with the purchase, you
          can easily return us the product within 7 days of receiving the
          product and get the full credit in your account. If 7 days have gone
          by since your purchase, unfortunately we can’t offer you a refund or
          exchange.
          <br /> To be eligible for a return, your item must be unused and in
          the same condition that you received it. It must also be in the
          original packaging.
          <br /> To complete your return, please send us a mail at
          houseofmiani@gmail.com  with the Subject as &quot;Refund&quot;.
          We require a receipt or proof of purchase.
        </p>
        <h4>REFUNDS</h4>
        <p>
          Our policy lasts 7 days. If you are not happy with the purchase, you
          can easily return us the product within 7 days of receiving the
          product and get the full credit in your account. If 7 days have gone
          by since your purchase, unfortunately we can’t offer you a refund or
          exchange.
          <br /> To be eligible for a return, your item must be unused and in
          the same condition that you received it. It must also be in the
          original packaging.
          <br /> To complete your return, please send us a mail at
          houseofmiani@gmail.com  with the Subject as &quot;Refund&quot;.
          We require a receipt or proof of purchase.
        </p>
        <h4>REFUNDS</h4>
        <p>
          Once your return is received and inspected, we will send you an email
          to notify you that we have received your returned item. We will also
          notify you of the approval or rejection of your refund. If you are
          approved, then your refund will be processed, and a credit will
          automatically be applied to your credit card or original method of
          payment, within 7 days.
        </p>
        <h4>LATE OR MISSING REFUNDS</h4>
        <p>
          If you haven’t received a refund yet, first check your bank account
          again. Then contact your credit card company, it may take some time
          before your refund is officially posted. Next contact your bank. There
          is often some processing time before a refund is posted. If you’ve
          done all of this and you still have not received your refund yet,
          please contact us at houseofmiani@gmail.com 
        </p>
        <h4>EXCHANGES</h4>
        <p>
          We only replace items if they are defective or damaged. If you need to
          exchange it for the same item, send us an email at
          houseofmiani@gmail.com 
        </p>
        <h4>SHIPPING FOR EXCHANGE/ RETURN</h4>
        <p>
          If you reside in India, please keep the item packed and ready for a
          reverse pick up.  If you are residing outside India, you will need to
          ship the product to us at houseofmiani@gmail.com
          <br />
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable. If you receive
          a refund, the cost of return shipping will be deducted from your
          refund.
          <br />
          Depending on where you live, the time it may take for your exchanged
          product to reach you, may vary.
        </p>
        <h4>Cancellation Policy</h4>
        <p>
          We ship our products as early as possible to be able to deliver you at
          the earliest. Normally the next working day.
          <br />
          You may cancel the order before it has been shipped. If we have
          shipped the order, we will not be able to cancel the order.
        </p> */}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Shipping;
