const mongoose = require("mongoose");
const { Product } = require("models");
const { response } = require("utilities");

exports.create = async (req, res) => {
  const { title, price, description } = req.body;

  if (!title) return res.status(400).json(response.failure("Title does not entered!"));
  if (!price) return res.status(400).json(response.failure("Price does not entered!"));

  await Product.create({ title, price, description });

  res.status(201).json(response.successful());
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
