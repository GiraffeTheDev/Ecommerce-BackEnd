const {
  addToCartService,
  getAllCartByUserIdService,
  removeCartService,
  updateCartService,
} = require("../service/cartService");

const addToCartController = async (req, res) => {
  try {
    const response = await addToCartService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getAllCartByUserId = async (req, res) => {
  try {
    const response = await getAllCartByUserIdService(req.params.userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const removeCartController = async (req, res) => {
  try {
    const response = await removeCartService(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateCartController = async (req, res) => {
  try {
    const response = await updateCartService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  addToCartController,
  getAllCartByUserId,
  removeCartController,
  updateCartController,
};
