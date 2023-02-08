const mongoose = require("mongoose");
const { Slide } = require("models");
const { response } = require("utilities");

exports.create = async (req, res) => {
  const slide = await Slide.create({ image: `/uploads/${req.file.filename}` });

  res.status(201).json(response.successful("", slide));
};

exports.findAll = async (_, res) => {
  const slides = await Slide.find().sort({ createdAt: "desc" });

  if (slides.length === 0) return res.status(404).json(response.failure("There are no slides!"));

  res.json(response.successful("", slides));
};

exports.delete = async (req, res) => {
  const { slideID } = req.params;

  if (!mongoose.isValidObjectId(slideID)) return res.status(400).json(response.failure("Slide ID is invalid!"));

  const slide = await Slide.findByIdAndDelete(slideID);

  if (!slide) return res.status(404).json(response.failure("Slide does not exists!"));

  res.json(response.successful(""));
};
