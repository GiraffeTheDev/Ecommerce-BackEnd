const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max price"],
    default: 0,
  },
  stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
  // brand: { type: String, required: true },
  // category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  // images: { type: [String], required: true },
  // colors: { type: [String] },
  // sizes: { type: [String] },
  // highlights: { type: [String] },
  discountPrice: { type: Number },
  deleted: { type: Boolean },
});
const Product = mongoose.model("Product", productSchema);
productSchema.index({ title: "text" });
module.exports = Product;
