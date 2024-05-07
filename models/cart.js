const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  quanlity: Number,
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //size: String,
  //color: String,
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
