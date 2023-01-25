require("express-async-errors");
require("app-module-path").addPath(__dirname);

const morgan = require("morgan");
const express = require("express");
const configs = require("configs");
const userControllers = require("controllers/user");
const { environment, database } = require("utilities");
const productControllers = require("controllers/product");
const { internalServerError, notFound } = require("middlewares");

const app = express();

app.use(express.json());

if (environment.isDevelopment()) {
  app.use(morgan("dev"));
}

app.post("/user", userControllers.create);
app.get("/user", userControllers.findAll);
app.get("/user/:userID", userControllers.find);
app.delete("/user/:userID", userControllers.delete);

app.post("/product", productControllers.create);
app.get("/product", productControllers.findAll);
app.get("/product/:productID", productControllers.find);
app.delete("/product/:productID", productControllers.delete);

app.use(internalServerError);
app.use(notFound);

Promise.resolve()
  .then(() => database.connect())
  .then(() => app.listen(configs["port"], () => console.log("Server ready at http://localhost:%s", configs["port"])));
