const express = require("express");
const { createOrderController } = require("../controller/orderController");

const router = express.Router();
const orderRoute = (app) => {
  router.post("/v1/create-order", createOrderController);
  return app.use("/", router);
};

module.exports = orderRoute;
