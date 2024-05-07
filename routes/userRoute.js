const express = require("express");
const {
  getUserByIdController,
  updateUserController,
} = require("../controller/userController");

const router = express.Router();
const userRouter = (app) => {
  router.get("/v1/user/:id", getUserByIdController);
  router.put("/v1/update-user", updateUserController);
  return app.use("/", router);
};

module.exports = userRouter;
