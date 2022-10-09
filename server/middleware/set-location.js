const setLocation = function (req, res, next) {
  console.log("req.headers.language: ", req.headers.language)
  if (req.query.language == null) {
    req.query.language = req.headers.language
  }
  return next();
};

module.exports = setLocation;