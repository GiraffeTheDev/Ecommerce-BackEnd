const jwt = require("jsonwebtoken");
const { createToken } = require("./jwt");
require("dotenv").config();
// Middleware để xác thực AccessToken
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const handleRefreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const payload = {
      email: user.email,
      role: user.role,
    };
    const access_token = createToken(payload);
    res.cookie("access_token", access_token, {
      maxAge: 60 * 60 * 1000,
    });
    res.json({ access_token: access_token });
  });
};
module.exports = {
  handleRefreshToken,
  authenticateToken,
};
