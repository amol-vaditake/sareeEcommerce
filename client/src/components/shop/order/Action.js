import { createOrder, verifyCouponCode } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  amount,
  transactionId,
  address,
  user,
  phone,
  dispatch,
  history,
	mode,
  couponId,
  note,
) => {
  // debugger;
  // let { addressLine1, addressLine2, city, state, pincode } = address;
	let userId = JSON.parse(localStorage.getItem("jwt")).user._id;
  let orderData = {
    allProduct: JSON.parse(localStorage.getItem("cart")),
    name: user.name || 'guest',
    email: user.email || 'guest',
    amount,
    transactionId,
    address,
    phone,
		mode,
    couponId,
    note,
  };
	if(userId !== 'guest'){
		orderData.user=userId
	}
  try {
		console.log(orderData)
    dispatch({ type: "loading", payload: true });
    let resposeData = await createOrder(orderData);
		console.log('Response for pay', resposeData)
    if (resposeData.success) {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({ type: "cartProduct", payload: null });
      dispatch({ type: "cartTotalCost", payload: null });
      dispatch({ type: "orderSuccess", payload: true });
      dispatch({ type: "loading", payload: false });
      return history.push("/");
    } else if (resposeData.error) {
      console.log(resposeData);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const pay = async (
//   data,
//   dispatch,
//   state,
//   setState,
//   getPaymentProcess,
//   totalCost,
//   history
// ) => {
//   console.log(state);
//   if (!state.address) {
//     setState({ ...state, error: "Please provide your address" });
//   } else if (!state.phone) {
//     setState({ ...state, error: "Please provide your phone number" });
//   } else {
//     let nonce;
//     let getNonce = state.instance
//       .requestPaymentMethod()
//       .then((data) => {
//         dispatch({ type: "loading", payload: true });
//         nonce = data.nonce;
//         let paymentData = {
//           amountTotal: totalCost(),
//           paymentMethod: nonce,
//         };
//         getPaymentProcess(paymentData)
//           .then(async (res) => {
//             if (res) {
//               let orderData = {
//                 allProduct: JSON.parse(localStorage.getItem("cart")),
//                 user: JSON.parse(localStorage.getItem("jwt")).user._id,
//                 amount: res.transaction.amount,
//                 transactionId: res.transaction.id,
//                 address: state.address,
//                 phone: state.phone,
//               };
//               try {
//                 let resposeData = await createOrder(orderData);
//                 if (resposeData.success) {
//                   localStorage.setItem("cart", JSON.stringify([]));
//                   dispatch({ type: "cartProduct", payload: null });
//                   dispatch({ type: "cartTotalCost", payload: null });
//                   dispatch({ type: "orderSuccess", payload: true });
//                   setState({ clientToken: "", instance: {} });
//                   dispatch({ type: "loading", payload: false });
//                   return history.push("/");
//                 } else if (resposeData.error) {
//                   console.log(resposeData.error);
//                 }
//               } catch (error) {
//                 console.log(error);
//               }
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//         setState({ ...state, error: error.message });
//       });
//   }
// };
