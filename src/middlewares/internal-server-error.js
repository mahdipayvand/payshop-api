const { response } = require("utilities");
const { environment } = require("utilities");

module.exports = (error, _, res, next) => {
  if (!error) return next();

  if (environment.isDevelopment()) {
    console.log(error.stack);
  }

  res.status(500).json(response.failure(environment.isDevelopment() ? error.message : "Internal Server Error!"));
};
