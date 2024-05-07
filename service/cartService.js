const Cart = require("../models/cart");

const addToCartService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Cart.create({
        quanlity: data.quanlity,
        userId: data.userId,
        productId: data.productId,
      });

      if (response) {
        resolve({
          message: "Add to Cart success!",
          data: response,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const getAllCartByUserIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Cart.find({
        userId: id,
      }).populate("productId");

      if (response) {
        resolve({
          message: "Get All Cart by UserId",
          data: response,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const removeCartService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Cart.findByIdAndDelete({
        _id: id,
      });
      if (!response) {
        resolve({
          message: "Cart not found!",
        });
      }
      resolve({
        message: "Remove cart success!",
      });
    } catch (error) {
      console.log(error);
    }
  });
};
const updateCartService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Cart.updateOne(
        { _id: data._id },
        {
          productId: data.productId,
          quanlity: data.quanlity,
        }
      );
      if (response) {
        resolve({
          message: "Update Cart success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = {
  getAllCartByUserIdService,
  addToCartService,
  removeCartService,
  updateCartService,
};
