const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const requireAdmin = require('../middleware/require-admin');
const setLocation = require('../middleware/set-location');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));
async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

router.get('/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], setLocation, asyncHandler(getByIdOnlyProcesso));
async function getByIdOnlyProcesso(req, res) {
  let user = await userCtrl.getByIdOnlyProcesso(req.params.id, req);
  res.json(user);

}

router.get('/all/users', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(getAllUsers));

async function getAllUsers(req, res) {
  let listUser = await userCtrl.getAllUsers(req);
  res.json(listUser);
}

router.get('/adicionar-remover-admin/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(adicionarOuRemoverAdmin));

async function adicionarOuRemoverAdmin(req, res) {
  let result = await userCtrl.adicionarOuRemoverAdmin(req);
  res.status(result.status).send({ message: result.message });
}
