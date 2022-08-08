const couponModel = require("../models/coupons");
const orderModel = require("../models/orders");

class Coupon {

    async verifyCoupon(req, res) {
        let { couponCode, uId } = req.body;

        if (!couponCode) {
            return res.json({ message: "Please enter the coupon Code." });
        } else {
            try {
                let Coupon = await couponModel
                .findOne({code: couponCode});
                if(Coupon){
                    let Order = await orderModel
                    .findOne({ user: uId, couponId: Coupon._id });
                    console.log(Order);
                    if(Order){
                        return res.json({message: "Coupon Code is already used."});
                    }
                    else{
                        return res.json({ Coupon });
                    }
                }
                else
                {
                    return res.json({message: "Invalid coupon code."});
                }
            }
             catch (err) {
            console.log(err);
          }
        }
    }
}

const couponsController = new Coupon();
module.exports = couponsController;