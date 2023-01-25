require("dotenv-flow").config();

exports.environment = process.env.NODE_ENV || "development";
exports.port = parseInt(process.env.PORT) || 5000;
exports.databaseURI = process.env.DATABASE_URI;
