const express = require("express");
const {
  authenticateToken,
  handleRefreshToken,
} = require("../middleware/verifyToken");

const router = express.Router();
const jwtRoute = (app) => {
  router.get("/v1/protected-route", authenticateToken, (req, res) => {
    res.status(200).json({
      message: "Protected data",
    });
  });
  router.post("/v1/refresh-token", handleRefreshToken);
  return app.use("/", router);
};

module.exports = jwtRoute;
