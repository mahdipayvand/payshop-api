require("app-module-path").addPath(__dirname);

const morgan = require("morgan");
const express = require("express");
const configs = require("configs");
const { notFound } = require("middlewares");
const { environment, database } = require("utilities");

const app = express();

if (environment.isDevelopment()) {
  app.use(morgan("dev"));
}

app.use(notFound);

Promise.resolve()
  .then(() => database.connect())
  .then(() => app.listen(configs["port"], () => console.log("Server ready at http://localhost:%s", configs["port"])));
