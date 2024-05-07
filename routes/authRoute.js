const express = require("express");
const {
  registerAuthController,
  loginAuthController,
  logoutController,
} = require("../controller/authController");
const router = express.Router();
const authRoute = (app) => {
  router.post("/v1/register-auth", registerAuthController);
  router.post("/v1/login-auth", loginAuthController);
  router.post("/v1/logout-auth", logoutController);
  return app.use("/", router);
};

module.exports = authRoute;
