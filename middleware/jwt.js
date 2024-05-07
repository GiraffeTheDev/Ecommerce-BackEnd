const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (payload) => {
  let token = "";
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const createRefreshToken = (payload) => {
  let token = "";
  try {
    token = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: "2d" });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = (token) => {
  let data = null;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};
const checkToken = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    const token = cookies.jwt;
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        errCode: 1,
        errMessage: "No Authentication ? You must be login!",
      });
    }
  } else {
    return res.status(401).json({
      errCode: 1,
      errMessage: "No Authentication ? You must be login!",
    });
  }
};
const checkPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({
        errCode: -1,
        errMessage: "You don't permission to access this resource",
      });
    }
    if (role === "admin") {
      next();
    } else {
      return res.status(403).json({
        errCode: -1,
        errMessage: "You don't permission to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      errCode: 1,
      errMessage: "No Authentication ? You must be login!",
    });
  }
};
module.exports = {
  createToken,
  checkToken,
  verifyToken,
  checkPermission,
  createRefreshToken,
};
