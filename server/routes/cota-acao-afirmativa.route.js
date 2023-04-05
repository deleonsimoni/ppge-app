const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAllowedRoles = require('../middleware/require-allowed-roles');
const cotaAcaoAfirmativaCtrl = require('../controllers/cota-acao-afirmativa.controller')

const router = express.Router();
module.exports = router;

// POST
router.post('/', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(adicionarCota));

async function adicionarCota(req, res) {
  let response = await cotaAcaoAfirmativaCtrl.adicionarCota(req, req.user._id);
  res.json(response);
}

// PUT
router.put('/:id', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(atualizarCota));

async function atualizarCota(req, res) {
  let response = await cotaAcaoAfirmativaCtrl.atualizarCota(req, req.user._id);
  res.json(response);
}

// GET
router.get('/', [passport.authenticate('jwt', {
  session: false
})], asyncHandler(getAllCotas));

async function getAllCotas(req, res) {
  let response = await cotaAcaoAfirmativaCtrl.getAllCotas();
  res.json(response);
}

// DELETE
router.delete('/:idCota', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(deleteById));

async function deleteById(req, res) {
  let response = await cotaAcaoAfirmativaCtrl.deleteById(req.params.idCota);
  res.json(response);
}