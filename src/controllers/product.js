const mongoose = require("mongoose");
const { Product } = require("models");
const { response } = require("utilities");

exports.create = async (req, res) => {
  const { title, price, discount, description } = req.body;

  if (!title) return res.status(400).json(response.failure("Title does not entered!"));
  if (!price) return res.status(400).json(response.failure("Price does not entered!"));

  const product = await Product.create({ title, price, discount, description, image: `/uploads/${req.file.filename}` });

  res.status(201).json(response.successful("", product));
};

exports.findSpecialOffers = async (_, res) => {
  const specialOffers = await Product.find().where("discount").exists();

  if (specialOffers.length === 0) return res.status(404).json(response.failure("There are no special offers!"));

  res.json(response.successful("", specialOffers));
};

exports.findAll = async (_, res) => {
  const products = await Product.find();

  if (products.length === 0) return res.status(404).json(response.failure("There are no products!"));

  res.json(response.successful("", products));
};

exports.find = async (req, res) => {
  const { productID } = req.params;

  if (!mongoose.isValidObjectId(productID)) return res.status(400).json(response.failure("Product ID is invalid!"));

  const product = await Product.findById(productID);

  if (!product) return res.status(404).json(response.failure("Product does not exists!"));

  res.json(response.successful("", product));
};

exports.delete = async (req, res) => {
  const { productID } = req.params;

  if (!mongoose.isValidObjectId(productID)) return res.status(400).json(response.failure("Product ID is invalid!"));

  const product = await Product.findByIdAndDelete(productID);

  if (!product) return res.status(404).json(response.failure("Product does not exists!"));

  res.json(response.successful(""));
};
