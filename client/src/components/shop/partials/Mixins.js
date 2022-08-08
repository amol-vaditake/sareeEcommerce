export const subTotal = (id, price, offer) => {
  let subTotalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.filter((item) => {
    if (item.id === id) {
      // subTotalCost = item.quantitiy * (price - price*offer/100);
      subTotalCost = item.quantitiy * (calculatePrice(price, offer));
    }
  });
  return subTotalCost;
};

export const quantity = (id) => {
  let product = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.filter((item) => {
    if (item.id === id) {
      product = item.quantitiy;
    }
  });
  return product;
};

export const totalCost = (discount) => {
  let totalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.map((item) => {
    totalCost += item.quantitiy * item.price;
  });
  // return discount ? totalCost - (totalCost * discount/100) : totalCost;
  return discount ? totalCost - calculateDiscount(totalCost, discount) : totalCost;
};

export const discountAmount = (discount) => {
  let totalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.map((item) => {
    totalCost += item.quantitiy * item.price;
  });
  // debugger;
  // return totalCost * discount/100;
  return calculateDiscount(totalCost, discount);
}

function calculatePrice(price, discount) {
  return +((price - (price * discount/100)).toFixed(2)); 
}

function calculateDiscount(price, discount) {
  return +((price * discount/100).toFixed(2));
}

export const shippingPrice = (totalPrice , mode) => {
	// if( mode === 'cod' ){
	// 	return 0
	// }
  if( totalPrice <= 499 ){
		return 100
	}
	return 0
};
