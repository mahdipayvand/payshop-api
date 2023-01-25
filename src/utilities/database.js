const configs = require("configs");
const mongoose = require("mongoose");
const { environment } = require("utilities");

exports.connect = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(configs["databaseURI"]);
  } catch (error) {
    console.log(environment.isDevelopment() ? error.stack : "Database connection failed!");
    process.exit(1);
  }
};
