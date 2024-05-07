const { createOrder } = require("../service/orderService");

const createOrderController = async (req, res) => {
  try {
    const response = await createOrder(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error from Server",
    });
  }
};
module.exports = {
  createOrderController,
};
