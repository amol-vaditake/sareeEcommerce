const orderModel = require("../models/orders");
const productModel = require("../models/products");
const { sendOrderEmail,sendOrderEmailToAdmin,sendOrderStatusChangeEmail } = require("./email");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email isGuest")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    // let { allProduct, user, name, email, amount, transactionId='', address, phone , mode, couponId } = req.body;
    let { allProduct, user, name, email, amount, transactionId='', address, phone , mode, couponId, note } = req.body;
		if(mode !== 'cod'){
			if(!transactionId){
				return res.json({ message: "All filled must be required" });
			}
		}
    if (
      !allProduct ||
      !amount ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let { addressLine1, addressLine2, city, state, pincode } = address;
				if(!mode){
					mode='online'
				}
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address: `${addressLine1}, ${addressLine2 ? addressLine2 + ', ' : ''}${city}, ${state} (${pincode})`,
          phone,
					mode,
          couponId,
          note,
        });
        let allitems = [];
				await allProduct.map(async a=>{
					let p = await productModel.findById(a.id)
					if(p){
						allitems.push({name: p.pName, quantity: a.quantitiy, price: a.price});
            await productModel.findByIdAndUpdate(a.id,{
							pQuantity:p.pQuantity-a.quantitiy,
							pSold:p.pSold + (a.quantitiy || 1)
						})
					}
          return p;
				})
        let save = await newOrder.save();

        if (save._id) {
					// sendOrderEmailToAdmin(save._id, name, save.address, phone, transactionId || 'cod', allitems);
					sendOrderEmailToAdmin(save._id, name, save.address, phone, transactionId || 'cod', allitems, mode);
          sendOrderEmail(save._id, name, email, save.address, phone, transactionId || 'cod', allitems, mode);
          // sendOrderEmail(save._id, name, email, save.address, phone, transactionId || 'cod', allitems);
          return res.json({ success: "Order created successfully" });
        } 
      } catch (error) {
        console.log(error);
        return res.json({ error: error });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status,trackingURL, awbNumber } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      }, async function(err, docs) {
        try {
          let OrderDetails = await orderModel
            .findById(oId)
            .populate("allProduct.id", "pName pImages pPrice")
            .populate("user", "name email");
             sendOrderStatusChangeEmail(oId, OrderDetails.user.name, OrderDetails.user.email, OrderDetails.address, OrderDetails.phone, OrderDetails.transactionId || 'cod', OrderDetails.allProduct,trackingURL, awbNumber);
        } catch (err) {
          console.log(err);
        }
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Order updated successfully" });
      });
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
