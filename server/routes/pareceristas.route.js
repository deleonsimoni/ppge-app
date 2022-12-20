const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const requireLogin = require('../middleware/require-login');
const userCtrl = require('../controllers/user.controller');
const requireAllowedRoles = require('../middleware/require-allowed-roles');
const linhaPesquisaService = require('../service/linha_pesquisa.service');

const router = express.Router();
module.exports = router;
/* Parecerista */

router.post('/coordenador/:id', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador'])], asyncHandler(adicionarCoordenador));

router.delete('/coordenador/:id', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador'])], asyncHandler(removerCoordenador));

router.post('/', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador'])], asyncHandler(cadastrarParecerista));

router.delete('/:id', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador'])], asyncHandler(removerParecerista));

router.get('/', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador', 'parecerista'])], asyncHandler(listarPareceristas));

async function cadastrarParecerista(req, res) {
  const response = await userCtrl.cadastrarParecerista(req.body.email, req.body.idLinhaPesquisa);
  res.status(response.status).json(response);
}

async function removerParecerista(req, res) {
  const response = await userCtrl.removerParecerista(req.params.id, req.query.idLinhaPesquisa);
  res.json(response);
}

async function listarPareceristas(req, res) {
  let response;
  if (req.query.idLinhaPesquisa) {
    response = await linhaPesquisaService.listarPareceristasByLinha(req.query.idLinhaPesquisa);
  } else {
    response = await userCtrl.listarPareceristas();
  }
  res.json(response);
}

async function adicionarCoordenador(req, res) {
  const response = await userCtrl.adicionarCoordenador(req.params.id);
  res.json(response);
}

async function removerCoordenador(req, res) {
  const response = await userCtrl.removerCoordenador(req.params.id);
  res.json(response);
}

/* Fim Parecerista */