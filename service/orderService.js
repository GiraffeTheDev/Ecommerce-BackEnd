const { Order } = require("../models/order");
const Product = require("../models/products");
const User = require("../models/users");
const { invoiceTemplate } = require("../utils/common");

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = Order.create({
        items: data.items,
        totalAmount: data.totalAmount,
        totalItems: data.totalItems,
        user: data.user,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        status: data.status,
        selectedAddress: data.selectedAddress,
      });
      for (let item of order.items) {
        let product = await Product.findOne({ _id: item.productId.id });
        product.$inc("stock", -1 * item.quantity);
        // for optimum performance we should make inventory outside of product.
        await product.save();
      }
      const user = await User.findById(order.user);
      // we can use await for this also
      sendMail({
        to: user.email,
        html: invoiceTemplate(order),
      });
      resolve({
        message: "Order success!",
      });
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = {
  createOrder,
};
