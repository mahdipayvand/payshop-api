const { User } = require("models");
const mongoose = require("mongoose");
const { response } = require("utilities");

exports.create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) return res.status(400).json(response.failure("First name does not entered!"));
  if (!lastName) return res.status(400).json(response.failure("Last name does not entered!"));
  if (!email) return res.status(400).json(response.failure("Email does not entered!"));
  if (!password) return res.status(400).json(response.failure("Password does not entered!"));

  const user = await User.findOne({ email });

  if (user) return res.status(409).json(response.failure("Email already exists!"));

  await User.create({ firstName, lastName, email, password });

  res.status(201).json(response.successful());
};

exports.findAll = async (_, res) => {
  const users = await User.find().select("-password");

  if (users.length === 0) return res.status(404).json(response.failure("There are no users!"));

  res.json(response.successful("", users));
};

exports.find = async (req, res) => {
  const { userID } = req.params;

  if (!mongoose.isValidObjectId(userID)) return res.status(400).json(response.failure("User ID is invalid!"));

  const user = await User.findById(userID).select("-password -isAdmin");

  if (!user) return res.status(404).json(response.failure("User does not exists!"));

  res.json(response.successful("", user));
};

exports.delete = async (req, res) => {
  const { userID } = req.params;

  if (!mongoose.isValidObjectId(userID)) return res.status(400).json(response.failure("User ID is invalid!"));

  const user = await User.findByIdAndDelete(userID);

  if (!user) return res.status(404).json(response.failure("User does not exists!"));

  res.json(response.successful(""));
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.userID).select("-password -isAdmin");

  if (!user) return res.status(404).json(response.failure("User does not exists!"));

  res.json(response.successful("", user));
};
