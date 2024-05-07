const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
});
const Brand = mongoose.model("Brand", cartSchema);
module.exports = Brand;