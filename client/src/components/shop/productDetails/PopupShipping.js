import React, { Component } from "react";
import Modal from "react-modal";
import "./popup.scss";

export default class PopupShipping extends Component {
  constructor() {
    super();
    this.state = {
      isOpenModal: false,
    };
  }
  openPopup = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  closePopup = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div onClick={() => this.openPopup()}>
          <h4 style={{ color: "blue", cursor: "pointer" }}>
            Shipping & Payment Policy
          </h4>
        </div>
        {this.state.isOpenModal && (
          <Modal
            className="modalClass"
            isOpen={true}
            onRequestClose={() => this.closePopup()}
          >
            <div className="popupContainer">
              <h5 onClick={() => this.closePopup()}>x</h5>
              <ul>
                <h3>What are the shipping charges?</h3>
                <li>
                  Our Standard Shipping charges are Rs.50/- on your whole order
                  irrespective of the size of your order and we provide free
                  shipping on orders above Rs.750/-
                </li>
                <h3>What are the Payment methods available?</h3>
                <li>
                  You can pay via Credit Card, Debit Card, Net banking, Mobile
                  Wallets, UPI or Cash on Delivery.
                </li>
                <h3>Are there any separate charges for COD?</h3>
                <li>Yes, Standard charges of Rs.50/- would apply.</li>
                <h3>How long will it take for my order to be delivered?</h3>
                <li>
                  Kindly allow us a period of 2-3 days to process and dispatch
                  your order. Once your order is dispatched you’ll receive it by
                  4-5 working days. To ensure that your order is delivered
                  on-time, please make sure of the following while entering your
                  details:
                </li>
                <li>
                  • Provide complete address details with House Number, Floor,
                  Street Name and Locality along with a Landmark.
                  <br />
                  • Enter correct City, State and Zip/Postal Code details.
                  Orders may get misrouted if these details are incorrect.
                  <br />• Kindly make sure that Phone number (preferably mobile)
                  is correct and reachable. We may need to call you for delivery
                  related queries.
                </li>
                <h3>Where can I track my order?</h3>
                <li>
                  You can track the status of your order before dispatch through
                  our website. Once dispatched, you’ll receive the tracking
                  details via SMS.
                </li>
                <h3>What if the product I have received is damaged?</h3>
                <li>
                  All our products go through an intensive layer of checks and
                  we make sure that all the packages are perfectly packed and
                  wrapped with security tapes when they are dispatched from our
                  order-processing unit. However, it goes through a lot of
                  processes at the courier company’s end before reaching you.
                  There might be chances that the product might get damaged in
                  transit.{" "}
                </li>
                <li>
                  Therefore, we have a policy where we resend the product if a
                  product is broken / damaged when you receive it. To avail it
                  you MUST send us a full unpacking video starting from opening
                  the SEALED courier bag without any cuts with a complete 360
                  view of the package. This leaves NO scope for error.{" "}
                </li>
                <h3>What if my order status says, I was unavailable but nobody came for delivery. What should I do?</h3>www.houseofmiani.com
                <li>The phone number of the courier company is mentioned on your tracking page. You can call them and ask them to arrange for delivery. Alternatively, you can contact us at +91  via WhatsApp or email us at support@houseofmiani.com We will coordinate with the courier company.</li>
              </ul>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
