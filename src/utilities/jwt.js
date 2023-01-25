const configs = require("configs");
const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const token = jwt.sign(payload, configs["jwtSecret"]);

  return token;
};

exports.verifyToken = (token) => {
  try {
    const data = jwt.verify(token, configs["jwtSecret"]);

    return [null, data];
  } catch (error) {
    return [error, null];
  }
};
