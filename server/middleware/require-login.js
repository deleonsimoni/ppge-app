const httpError = require('http-errors');

const requireLogin = function (req, res, next) {
  if (req.user) return next();
  const err = new httpError(401);
  return next(err);
};

module.exports = requireLogin;
