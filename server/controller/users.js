const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const {mail} = require('../config/nodeMailer')


class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          // .select("name email phoneNumber userImage updatedAt createdAt");
          .select("name email phoneNumber userImage updatedAt createdAt isGuest");
        if (User) {
          console.log('user', User);
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

	async getUserByMailAndSendOtp(req, res) {
    let { email } = req.body;
    if (!email) {
      return res.json({ error: "email id is required" });
    } else {
      try {
        let User = await userModel.findOne({email})
        if (User) {
				let otp = Math.floor(100000 + Math.random() * 900000)
				let passChange = await userModel.findByIdAndUpdate(User._id, {otp});
					await mail({
						to:User.email,
						subject:'Reset Password OTP',
						html:`<div><b>Dear ${User.name || 'User'}</b><br/><br/>
							<b>Hello from House Of Miani<b><br/><br/>
							<div>To reset your password for House Of Miani, please use this otp ${otp}
              <br/><br/>We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can reset it or change it.
							<br/><br/>						
							</div>
							</div>`					
					})
          return res.json({ User,massage:'Otp send on your mail id' });
        }else{
					res.json({ error: "User not found" });
				}
      } catch (err) {
				console.log(err)
				res.json({ error: "Invalid Mail address" });
      }
    }
  }

	async forgotPass(req, res) {
    let { _id,password,otp } = req.body;
    if (!password) {
      return res.json({ error: "password is required" });
    } else {
      try {
				let user = await userModel.findById(_id)
				console.log(otp,user.otp)
				if(user.otp == otp){
					console.log('matched otp')
					let newPassword = bcrypt.hashSync(password, 10);
					let passChange = userModel.findByIdAndUpdate(_id, {
						password: newPassword,
						verified:true
					});
					passChange.exec((err, result) => {
						if (err) console.log(err);
						return res.json({ massage: "done" });
					});
				}else{
					return res.json({ error: "invalidOtp" });
				}
        
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new userModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }

	  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
}

const ordersController = new User();
module.exports = ordersController;
