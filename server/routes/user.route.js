const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));

router.get('/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(getById));

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function getById(req, res) {
  let user = await userCtrl.getById(req.params.id);
  res.json(user);

}
