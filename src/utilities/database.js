const configs = require("configs");
const mongoose = require("mongoose");
const { environment } = require("utilities");

exports.connect = async () => {
  try {
    mongoose.set("strictQuery", true);

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    });

    await mongoose.connect(configs["databaseURI"]);
  } catch (error) {
    console.log(environment.isDevelopment() ? error.stack : "Database connection failed!");
    process.exit(1);
  }
};
