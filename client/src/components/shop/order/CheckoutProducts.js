import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserById } from "../dashboardUser/FetchApi";
import { LayoutContext } from "../layout";
import { cartListProduct } from "../partials/FetchApi";
import { verifyCouponCode } from "./FetchApi";
import { quantity, subTotal, totalCost, shippingPrice, discountAmount } from "../partials/Mixins";
import { fetchData, pay } from "./Action";
import { getBrainTreeToken } from "./FetchApi";
import deliveryPincodes from '../../../pincode'

import { offerPrice, roundDecimals } from "../home/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);
  const [state, setState] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
		mode:'',
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });
  const [user, setUser] = useState({});
	const [pincodeMsg, setPinMsg] = useState(null);
	const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDetails, setCouponDetails] = useState({});
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSucccess] = useState("");
  const [ntotalCost, setTotalCost] = useState(totalCost(couponDetails && couponDetails.discount));
  const [codCharges, setCODCharges] = useState(0);
  const [ntotalDiscount, setTotalDiscount] = useState(discountAmount(couponDetails && couponDetails.discount));

  // Note
  const [note, setNote] = useState("");
  // Note End

  useEffect(() => {
    getUserById(JSON.parse(localStorage.getItem("jwt")).user._id).then(responseData => setUser({ ...(responseData?.User ?? {}) }));
    fetchData(cartListProduct, dispatch);
  }, []);

  JSON.parse(localStorage.getItem("cart"))

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

	useEffect(() => {
    setTotalCost(totalCost(couponDetails && couponDetails.discount));
    setDeliveryCharges(shippingPrice(ntotalCost,state.mode));
    setCODCharges(state.mode === "cod" ? 100 : 0);
    setTotalDiscount(discountAmount(couponDetails && couponDetails.discount));
  }, [state.mode]);

  useEffect(() => {
    setTotalCost(totalCost(couponDetails && couponDetails.discount));
    setTotalDiscount(discountAmount(couponDetails && couponDetails.discount));
  }, [couponDetails]);

  async function verifyCoupon(){
    if(couponCode && couponCode.length > 0)
    {
      verifyCouponCode(JSON.parse(localStorage.getItem("jwt")).user._id, couponCode)
      .then(res => {
        if(res.message) { setCouponError(res.message); setCouponSucccess(""); setCouponDetails({}); }
        else{
          setCouponDetails(res.Coupon);
          setCouponSucccess("Yay! Coupon applied successfully.")
          setCouponError("");
        }
      });
    }
    else
    {
      setCouponError("Please enter coupon code.");
      setCouponSucccess("");
      setCouponDetails({});
    }
  }

  async function displayRazorpay() {

    if (!state.addressLine1 || !state.city || !state.pincode) {
      setState({ ...state, error: "Please provide your address" });
      return;
    } else if (!state.phone) {
      setState({ ...state, error: "Please provide your phone number" });
      return;
    }
		if(!state.mode){
			setState({ ...state, error: "Please select mode of the payment" });
      return;
		}



    // var totalCostPaid = ntotalCost + deliveryCharges + codCharges;
    var totalCostPaid = roundDecimals(ntotalCost + deliveryCharges + codCharges);

		if(state.mode === 'cod'){
			pay(totalCostPaid,null,
			      {
              addressLine1: state.addressLine1,
              addressLine2: state.addressLine2,
              city: state.city,
              state: state.state,
              pincode: state.pincode,
            },
            user,
            state.phone,
            dispatch,
            history,
						state.mode,
            couponDetails._id,
            note,
      )
			return 
		}


    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const amountData = {
      amount: totalCostPaid
    };

    const result = await axios.post(`${apiURL}/payment/orders`, amountData);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "House Of Miani",
      description: "Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(`${apiURL}/payment/success`, data);

        // alert(result.data.msg);
        if (result.data.msg === "success") {
          pay(
            (parseInt(amount) / 100),
            result.data.paymentId,
            {
              addressLine1: state.addressLine1,
              addressLine2: state.addressLine2,
              city: state.city,
              state: state.state,
              pincode: state.pincode,
            },
            user,
            state.phone,
            dispatch,
            history,
						state.mode,
            couponDetails._id,
            note,
          )
        }

      },
      prefill: {
        name: "",
        email: user.email,
        contact: `+91${state.phone}`,
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    paymentObject.open();
  }

  if (data.loading || state.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Please wait untill finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />

            {/* Note */}
            {/* <div className="my-6 flex flex-col space-y-1">
              <label htmlFor="name">Add a Note</label>
                <input
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                  value={note}
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
            </div> */}
            {/* Note End*/}

            <div className="md:flex md:flex-grow md:space-x-4 border-t-2 md:border-t-0 mx-2 py-4">
              <div>
                <div className="font-semibold text-gray-600 text-sm md:text-left text-right">
                  Subtotal : ₹{ntotalCost}
                </div>
                {/* {state.mode != 'cod' && */}
                { deliveryCharges > 0 &&
                (<div className="font-semibold text-gray-600 text-sm md:text-left text-right">
                  Delivery Charges : ₹{deliveryCharges}
                 </div>)
                 }
                 <div className={couponDetails && couponDetails.discount > 0 ? "font-semibold text-gray-600 text-sm md:text-left text-right" : "hidden"}>
                   Discount : ₹{ntotalDiscount}
                 </div>
                 <div className={codCharges > 0 ? "font-semibold text-gray-600 text-sm md:text-left text-right" : "hidden"}>
                   COD Charges : ₹{codCharges}
                 </div>
              </div>
              <div className="md:flex-grow">
                <div className="font-semibold text-gray-600 text-sm text-right">
                  {/* Debug */}
                  {/* Debug delivery charge: ₹{ deliveryCharges } | */}
                  {/* Debug cod: ₹{codCharges} | */}
                  {/* Debug End */}

                  Total Price: ₹{roundDecimals(ntotalCost + deliveryCharges + codCharges)}
                  </div>
              </div>
            </div>
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
              <Fragment>
                {/* <div className="w-full flex">
              <div className="md:w-1/2 md:p-2">
              <div className="flex flex-col py-2">
              <label htmlFor="couponCode" className="pb-2">
                      Have a Coupon Code?
                    </label> 
                     <input
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value)
                      }
                      type="text"
                      id="couponCode"
                      className="border px-4 py-2"
                    />
                <span className="text-xs text-red-500">
                        {couponError}
                </span>
                <span className="text-xs text-green-500">
                      {couponSuccess}
                </span>
                  </div>
                  </div>
                  <div className="md:w-1/2 md:p-2 md:order-last" style={{paddingTop: "6.8%"}}> 
                  <div
                    onClick={verifyCoupon}
                    className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#000" }}
                  >
                    {'Apply'}
                  </div> 
                   </div>
                  </div> */}
                <div
                  onBlur={(e) => setState({ ...state, error: false })}
                  className="p-4 md:p-8"
                >
                  {state.error ? (
                    <div className="bg-red-200 py-2 px-4 rounded">
                      {state.error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col py-2">
                    <label style={{marginTop:"30px"}} htmlFor="address" className="pb-2">
                      Delivery Address
                    </label>
                    <input
                      value={state.addressLine1}
                      onChange={(e) =>
                        setState({
                          ...state,
                          addressLine1: e.target.value,
                          error: false,
                        })
                      }
                      type="text"
                      id="addressLine1"
                      className="border px-4 py-2"
                      placeholder="Address Line 1 *"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <input
                      value={state.addressLine2}
                      onChange={(e) =>
                        setState({
                          ...state,
                          addressLine2: e.target.value,
                          error: false,
                        })
                      }
                      type="text"
                      id="addressLine2"
                      className="border px-4 py-2"
                      placeholder="Address Line 2"
                    />
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/2">
                      <input
                        value={state.city}
                        onChange={(e) =>
                          setState({
                            ...state,
                            city: e.target.value,
                            error: false,
                          })
                        }
                        type="text"
                        id="city"
                        className="border px-4 py-2"
                        style={{ width: '98%' }}
                        placeholder="City *"
                      />
                    </div>
                    <div className="w-1/2" style={{ textAlign: 'right' }}>
                      <select
                        value={state.state}
                        onChange={(e) =>
                          setState({
                            ...state,
                            state: e.target.value,
                            error: false,
                          })
                        }
                        type="text"
                        id="state"
                        className="border px-4 py-2"
                        style={{ width: '98%' }}
                        placeholder="State *"
                      >
                        <option value="">Select State *</option>
                        {
                          ['Andhra Pradesh',
                            'Arunachal Pradesh',
                            'Asom (Assam)',
                            'Bihar',
                            'Karnataka',
                            'Kerala',
                            'Chhattisgarh',
                            'Uttar Pradesh',
                            'Goa',
                            'Gujarat',
                            'Haryana',
                            'Himachal Pradesh',
                            'Jammu and Kashmir',
                            'Jharkhand',
                            'West Bengal',
                            'Madhya Pradesh',
                            'Maharashtra',
                            'Manipur',
                            'Meghalaya',
                            'Mizoram',
                            'Nagaland',
                            'Orissa',
                            'Punjab',
                            'Rajasthan',
                            'Sikkim',
                            'Tamil Nadu',
                            'Telangana',
                            'Tripura',
                            'Uttarakhand',
                            'Andaman and Nicobar',
                            'Pondicherry',
                            'Dadra and Nagar Haveli',
                            'Daman and Diu',
                            'Delhi',
                            'Chandigarh',
                            'Lakshadweep',
                          ].map((item, i) => (<option value={item} key={i}>{item}</option>))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/2">
                      <input
                        value={state.pincode}
                        onChange={(e) =>
                          setState({
                            ...state,
                            pincode: e.target.value,
                            error: false,
                          })
                        }
                        type="number"
                        id="pincode"
                        className="border px-4 py-2"
                        style={{ width: '98%' }}
                        placeholder="Pincode *"
                      />
                    </div>
                    <div className="w-1/2" style={{ textAlign: 'right' }}>
                      <input
                        value={"India"}
                        type="text"
                        id="state"
                        className="border px-4 py-2"
                        style={{ width: '98%' }}
                        placeholder="Country *"
                        disabled
                      />
                    </div>
                  </div>
									<div className="flex flex-row py-2">
                    <div className="w-1/2">
                      <select
                        value={state.mode}
                        onChange={(e) =>{
													let pin = state.pincode;													
													if(!pin){
														setPinMsg('Please enter pincode first.');
														return;
													}
													if(pin.length !== 6){
														setPinMsg('Invalid Pincode');
														return;
													}
													if(e.target.value === 'cod'){
														if(deliveryPincodes.includes(parseInt(pin))){
															setPinMsg(null)
															setState({
																...state,
																mode: e.target.value,
																error: false,
															})
														}else{
															setPinMsg(`sorry, cash on delivery is not available in pincode ${state.pincode}`)
														}
													}else{
														setPinMsg(null)
														setState({
															...state,
															mode: e.target.value,
															error: false,
														})
													}
													
												}}
                        type="text"
                        id="mode"
                        className="border px-4 py-2"
                        style={{ width: '98%' }}
                      >
												<option value="">Mode of payment *</option>
												{/* <option value="cod">Cash on delivery</option> */}
												<option value="online">Razorpay (Online Payment)</option>						
											</select>
                    </div>
                  </div>
									{pincodeMsg && 
									<div className="bg-red-200 py-2 px-4 rounded">
                      {pincodeMsg}
                  </div>
									}
									{state.mode === 'cod' && 
									<div className="bg-green-200 py-2 px-4 rounded">
                      Cash on delivery is available in pincode {state.pincode}
                  </div>
									}
                  <label htmlFor="phone" className="pb-2">
                    {'Mobile Number'}
                  </label>
                  <div className="flex flex-row py-2">
                    <div style={{ width: '11%' }}>
                      <input
                        value={"+91"}
                        type="text"
                        id="code"
                        className="border px-4 py-2"
                        style={{ width: '100%' }}
                        placeholder="Country Code *"
                        disabled
                      />
                    </div>
                    <div style={{ width: '89%' }}>
                      <input
                        value={state.phone}
                        onChange={(e) =>
                          setState({
                            ...state,
                            phone: e.target.value,
                            error: false,
                          })
                        }
                        type="number"
                        id="phone"
                        className="border px-4 py-2"
                        style={{ width: '100%' }}
                        placeholder="Your 10 digit mobile number"
                      />
                    </div>
                  </div>
                  {/* <DropIn
                    options={{
                      authorization: state.clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => (state.instance = instance)}
                  />
                  <div
                    onClick={(e) =>
                      pay(
                        data,
                        dispatch,
                        state,
                        setState,
                        getPaymentProcess,
                        totalCost,
                        history
                      )
                    }
                    className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#303031" }}
                  >
                    Pay now
                  </div> */}
                  {/* <button className="App-link" onClick={displayRazorpay}>
                      Pay ₹500
                  </button> */}
                  <div
                    onClick={displayRazorpay}
                    className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#000" }}
                  >
                    {state.mode === 'cod'?'Place Order and Pay Cash on Delivery' :'Pay now'}
                  </div>
                </div>
              </Fragment>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                    src={product.pImages[0]}
                    alt="wishListproduct"
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.pName}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Price : <div className="flex">                   
                  {/* <span>₹{product.pPrice - (product.pPrice * product.pOffer/100)}</span> */}
                  <span>₹{offerPrice(product.pPrice, product.pOffer)}</span>
                  </div>
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantitiy : {quantity(product._id)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    Subtotal : ₹{subTotal(product._id, product.pPrice, product.pOffer)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
  