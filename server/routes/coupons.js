const express = require("express");
const router = express.Router();
const couponController = require("../controller/coupons");

router.post("/verify-coupon", couponController.verifyCoupon);

module.exports = router;
