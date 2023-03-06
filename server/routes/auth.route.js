const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const User = require('../models/user.model');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}


router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

router.post('/resetPassword', asyncHandler(resetPassword));
async function resetPassword(req, res) {

  console.log("req.body: ", req.body)

  
  let user = await User.findOne({ mailCodePassword: req.body.mailCodePassword });

  if (!user) {
    return res.status(400).send({ message: "Código inválido" });
  }

  let response = await userCtrl.resetPassword(req, user);

  return res.status(response.status).send({ message: response.message });
}

router.post('/forgotPassword', asyncHandler(forgotPassword));
async function forgotPassword(req, res) {

  let user = await User.findOne({ email: req.body.email, document: req.body.document });

  if (!user) {
    return res.status(400).send({ message: "Usuário inválido" });
  }

  let response = await userCtrl.generateNewPassword(user);

  return res.status(response.status).send({ message: response.message });
}