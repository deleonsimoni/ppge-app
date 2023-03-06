const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAllowedRoles = require('../middleware/require-allowed-roles');
const rankCtrl = require('../controllers/rank.controller')

const router = express.Router();
module.exports = router;

router.post('/:idProcesso', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin'])], asyncHandler(gerarRank));

async function gerarRank(req, res) {
  let response = await rankCtrl.gerarRank(req.params.idProcesso, req.body.isFinalRank);
  res.json(response);
}


router.post('/status-rank/:idProcesso/:idRank', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin'])], asyncHandler(alterarStatusRank));

async function alterarStatusRank(req, res) {
  let response = await rankCtrl.alterarStatusRank(req.params.idProcesso, req.params.idRank, req.body.checked);
  res.json(response);
}

router.delete('/:idProcesso/:idRank', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin'])], asyncHandler(deletarRankById));
async function deletarRankById(req, res) {
  let response = await rankCtrl.deletarRankById(req.params.idProcesso, req.params.idRank);
  res.json(response);
}

router.get('/:idProcesso', asyncHandler(getAllRanks));
async function getAllRanks(req, res) {
  let response = await rankCtrl.getAllRanks(req.params.idProcesso, null);
  res.json(response);
}

router.get('/:idProcesso/ativos', asyncHandler(getRanksAtivo));
async function getRanksAtivo(req, res) {
  let response = await rankCtrl.getAllRanks(req.params.idProcesso, true);
  res.json(response);
}

router.get('/published/:idProcesso', asyncHandler(getAllRanksPublished));
async function getAllRanksPublished(req, res) {
  const published = true;
  let response = await rankCtrl.getAllRanks(req.params.idProcesso, published);
  res.json(response);
}

router.get('/detalhe/:idProcesso/:idRank', asyncHandler(getDetalheRank));
async function getDetalheRank(req, res) {
  let response = await rankCtrl.getDetalheRank(req.params.idProcesso, req.params.idRank);
  res.json(response);
}