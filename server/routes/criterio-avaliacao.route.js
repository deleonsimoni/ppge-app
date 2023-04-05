const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAllowedRoles = require('../middleware/require-allowed-roles');
const criterioAvaliacaoCtrl = require('../controllers/criterio-avaliacao.controller')

const router = express.Router();
module.exports = router;


router.post('/', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(adicionarCriterio));

async function adicionarCriterio(req, res) {
  let response = await criterioAvaliacaoCtrl.adicionarCriterio(req, req.user._id);
  res.json(response);
}

router.put('/:id', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(atualizarCriterio));

async function atualizarCriterio(req, res) {
  let response = await criterioAvaliacaoCtrl.atualizarCriterio(req, req.user._id);
  res.json(response);
}

router.get('/', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(getAllCriterio));

async function getAllCriterio(req, res) {
  console.log("ENTROU ROUTE getAllCriterio")
  let response = await criterioAvaliacaoCtrl.getAllCriterio();
  res.json(response);
}

router.delete('/:idCriterio', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'gerenciador'])], asyncHandler(deleteById));

async function deleteById(req, res) {
  console.log("ENTROU ROUTE getAllCriterio")
  let response = await criterioAvaliacaoCtrl.deleteById(req.params.idCriterio);
  res.json(response);
}