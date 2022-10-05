const setLocation = function (req, res, next) {
  if (req.query.language == null) {
    req.query.language = req.headers.language
  }
  return next();
};

module.exports = setLocation;