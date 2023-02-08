const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model("Slide", SlideSchema);
