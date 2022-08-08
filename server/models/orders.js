const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    allProduct: [
      {
        id: { type: ObjectId, ref: "products" },
        quantitiy: Number,
				sizeData:Object,
        note: {type: String},
      },
    ],

    // Note
    note: {
      type: String
    },
    // Note end

    user: {
      type: ObjectId,
      ref: "users",
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
		mode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    couponId: {
      type:String,
    }
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
