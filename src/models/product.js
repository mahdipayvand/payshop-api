const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
