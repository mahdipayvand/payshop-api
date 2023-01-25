const { User } = require("models");
const { response, jwt } = require("utilities");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json(response.failure("Email does not entered!"));
  if (!password) return res.status(400).json(response.failure("Password does not entered!"));

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json(response.failure("User does not exists!"));

  const comparedPassword = await user.comparePassword(password);

  if (!comparedPassword) return res.status(401).json(response.failure("Password is invalid!"));

  const token = jwt.generateToken(user.id);

  res.status(201).json(response.successful("", { token }));
};
