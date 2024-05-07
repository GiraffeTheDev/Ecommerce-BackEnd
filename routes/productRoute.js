const express = require("express");
const {
  getAllProductController,
  addNewProductController,
  getAProductController,
  searchProductController,
  updateProductController,
} = require("../controller/productController");
const router = express.Router();
const productRoute = (app) => {
  router.get("/v1/products", getAllProductController);
  router.get("/v1/product/:id", getAProductController);
  router.post("/v1/add-product", addNewProductController);
  router.get("/v1/search", searchProductController);
  router.delete("/v1/delete-product/:id", searchProductController);
  router.put("/v1/update-product", updateProductController);
  return app.use("/", router);
};

module.exports = productRoute;
