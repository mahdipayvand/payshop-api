const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model("Product", ProductSchema);
