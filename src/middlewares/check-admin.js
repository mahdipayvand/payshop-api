const { User } = require("models");
const { response } = require("utilities");

module.exports = async (req, res, next) => {
  const { userID } = req;

  const user = await User.findById(userID);

  if (!user.isAdmin) return res.status(403).json(response.failure("Permission Denied!"));

  next();
};
