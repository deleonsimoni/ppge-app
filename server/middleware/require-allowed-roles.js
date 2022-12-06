const httpError = require('http-errors');

const requireAllowedRoles = function (req, res, next, allowedRoles) {
  var allowed = false
  if(req.user) {
    allowedRoles.forEach(role => {
      if(req.user.roles.indexOf(role) > -1)
        allowed = true;
    });
  }
  if (allowed) return next();
  const err = new httpError(401);
  return next(err);
};

module.exports = requireAllowedRoles;
