const {
  getUserByIdService,
  updateUserService,
} = require("../service/userService");

const getUserByIdController = async (req, res) => {
  try {
    const response = await getUserByIdService(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
const updateUserController = async (req, res) => {
  try {
    const response = await updateUserService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};
module.exports = {
  getUserByIdController,
  updateUserController,
};
