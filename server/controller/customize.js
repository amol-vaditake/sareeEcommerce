const fs = require("fs");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");
const path = require("path");
const cloudinary=require('../config/cloudinary');

class Customize {
  async getImages(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log("upload failed" + err);
    }
  }

  async uploadSlideImage(req, res) {
    if (!req.file.filename) {
      return res.json({ error: "All field required" });
    }
    try {
			const path = req.file.path
			const uniqueFilename = `${new Date().toISOString()}${req.file.filename.substring(0, req.file.filename.length - 4)}`
			await cloudinary.uploader.upload(
				path,
				{ public_id: `new/${uniqueFilename}`, tags: `new` },
				async function(err, image) {
					if (err) return res.send(err)
					const fs = require('fs')							
					let newCustomzie = new customizeModel({
						slideImage: image.secure_url,
					});
					let save = await newCustomzie.save();
					if (save) {
						return res.json({ success: "Image upload successfully" });
					}
				}
			)
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All field required" });
    } else {
      try {
        let deletedSlideImage = await customizeModel.findById(id);
        let deleteImage = await customizeModel.findByIdAndDelete(id);
        if (deleteImage) {
          return res.json({ success: "Image deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Users = await userModel.find({}).count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
