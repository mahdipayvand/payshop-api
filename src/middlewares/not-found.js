const { response } = require("utilities");

module.exports = (_, res) => res.status(404).json(response.failure("Not found!"));
