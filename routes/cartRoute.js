const express = require("express");
const {
  getAllCartByUserId,
  addToCartController,
  updateCartController,
  removeCartController,
} = require("../controller/cartController");

const router = express.Router();
const cartRoute = (app) => {
  router.get("/v1/get-cart/:userId", getAllCartByUserId);
  router.post("/v1/add-cart", addToCartController);
  router.delete("/v1/remove-cart/:id", removeCartController);
  router.patch("/v1/update-cart", updateCartController);
  return app.use("/", router);
};

module.exports = cartRoute;
