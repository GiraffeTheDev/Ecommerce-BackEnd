const { registerAuth, loginAuth } = require("../service/authService");

const registerAuthController = async (req, res) => {
  try {
    const response = await registerAuth(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Error from server",
    });
  }
};
const loginAuthController = async (req, res) => {
  try {
    const response = await loginAuth(req.body);
    res.cookie("access_token", response.access_token, {
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", response.refresh_token, {
      maxAge: 60 * 60 * 10000,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const logoutController = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      message: "Logout success!",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  registerAuthController,
  loginAuthController,
  logoutController,
};
