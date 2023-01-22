const configs = require("configs");

exports.isDevelopment = () => configs["environment"] === "development";
