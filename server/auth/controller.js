const signToken = require('./auth').signToken;

exports.signin = (req, res, next) => {
  const token = signToken(req.user._id);
  res.json({ token });
};
