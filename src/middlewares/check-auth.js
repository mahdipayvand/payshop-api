const { response, jwt, environment } = require("utilities");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).json(response.failure("Authorization token does not entered!"));

  const token = authorization.slice(7);
  const [error, userID] = jwt.verifyToken(token);

  if (error) {
    if (environment.isDevelopment()) console.log(error.stack);

    return res.status(401).json(response.failure("Authorization token is invalid!"));
  }

  req.userID = userID;

  next();
};
