const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const requireLogin = require('../middleware/require-login');
const processoSeletivoCtrl = require('../controllers/processo-seletivo.controller');
const setLocation = require('../middleware/set-location');
const fileUpload = require('express-fileupload');
const requireAllowedRoles = require('../middleware/require-allowed-roles');

const router = express.Router();
module.exports = router;

router.get('/processo-seletivo', asyncHandler(getProcessoSeletivo));

router.get('/processo-seletivo/headers', asyncHandler(getProcessoSeletivoHeaders));

router.get(
  '/processo-seletivo/inscritos/:id',
  [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador', 'parecerista'])
  ],
  setLocation,
  asyncHandler(getInscritosByProcessoSelectivo)
);

router.get('/processo-seletivo/inscritos/detalhe/:idUser', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], setLocation, asyncHandler(getUserInscricaoProcessoSeletivo));

router.get('/processo-seletivo/inscritos/parecer/detalhe', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador', 'parecerista'])], setLocation, asyncHandler(getParecerByUser));

router.get('/processo-seletivo/inscritos/parecer/all', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['admin', 'coordenador', 'parecerista'])], setLocation, asyncHandler(getAllParecer));


router.put('/processo-seletivo/inscritos/vincular-parecerista', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], setLocation, asyncHandler(vincularParecerista));

router.put('/processo-seletivo/mudar-etapa', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], setLocation, asyncHandler(mudarEtapa));

router.post('/processo-seletivo/minha-inscricoes/justificar', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(inscricaoJustificar));

router.get('/processo-seletivo/minha-inscricoes', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(getMinhaInscricoesProcessoSelectivo));

router.get('/processo-seletivo/minha-inscricoes/detalhe', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(getMinhaInscricoesDetalhadaProcessoSelectivo));

router.post('/processo-seletivo', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(insertProcessoSeletivo));

router.post('/processo-seletivo/parecer', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(registrarParecer));

router.get('/processo-seletivo/parecer', [passport.authenticate('jwt', {
  session: false
}), (req, res, next) => requireAllowedRoles(req, res, next, ['parecerista'])], asyncHandler(getParecer));

router.post('/processo-seletivo/ativo/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(atualizarProcessoSeletivoAtivo));

router.post('/processo-seletivo/inscrever/:id', [passport.authenticate('jwt', {
  session: false
}), requireLogin, fileUpload()], asyncHandler(subscribeProcessoSeletivo));

router.get('/processo-seletivo/inscrever/infos/:id', setLocation, asyncHandler(getProcessoSeletivoInscreverInfosById));

router.delete('/processo-seletivo/inscrever/:id', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(unsubscribeProcessoSeletivo));

router.put('/processo-seletivo/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(updateProcessoSeletivo));

router.delete('/processo-seletivo/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(deleteProcessoSeletivo));

async function getProcessoSeletivo(req, res) {
  let response = await processoSeletivoCtrl.getProcessoSeletivo(req);
  res.json(response);
}

async function getProcessoSeletivoHeaders(req, res) {
  let response = await processoSeletivoCtrl.getProcessoSeletivoHeaders(req);
  res.json(response);
}

async function getUserInscricaoProcessoSeletivo(req, res) {
  let user = await processoSeletivoCtrl.getUserInscricaoProcessoSeletivo(req.params.idUser, req);
  res.json(user);

}

async function getParecerByUser(req, res) {
  let parecer = await processoSeletivoCtrl.getParecerByUser(req);
  res.json(parecer);
}

async function getAllParecer(req, res) {
  let parecer = await processoSeletivoCtrl.getAllParecer(req);
  res.json(parecer);
}

async function vincularParecerista(req, res) {
  const response = await processoSeletivoCtrl.vincularParecerista(req.body);
  res.status(response.status).json(response);

}

async function mudarEtapa(req, res) {
  const response = await processoSeletivoCtrl.mudarEtapa(req.body);
  res.json(response);

}

async function getProcessoSeletivoInscreverInfosById(req, res) {
  let response = await processoSeletivoCtrl.getProcessoSeletivoInscreverInfosById(req.params.id, req.query.language);
  res.json(response);
}

async function getInscritosByProcessoSelectivo(req, res) {
  var idParecerista = null;
  if (req.user && req.user.roles.length == 1 && req.user.roles.indexOf('parecerista') == 0) {
    idParecerista = req.user._id
  }
  let response = await processoSeletivoCtrl.getInscritosByProcessoSelectivo(req, req.params.id, idParecerista);
  res.json(response);

}

async function inscricaoJustificar(req, res) {
  let response = await processoSeletivoCtrl.inscricaoJustificar(req.user._id, req);
  res.json(response);

}

async function getMinhaInscricoesProcessoSelectivo(req, res) {
  let response = await processoSeletivoCtrl.getMinhaInscricoesProcessoSelectivo(req.user._id);
  res.json(response);

}

async function getMinhaInscricoesDetalhadaProcessoSelectivo(req, res) {
  let response = await processoSeletivoCtrl.getMinhaInscricoesDetalhadaProcessoSelectivo(req.user._id);
  res.json(response);

}

async function insertProcessoSeletivo(req, res) {
  let response = await processoSeletivoCtrl.insertProcessoSeletivo(req, req.user._id);
  res.json(response);
}

async function registrarParecer(req, res) {
  let response = await processoSeletivoCtrl.registrarParecer(req);
  res.json(response);
}

async function getParecer(req, res) {
  let response = await processoSeletivoCtrl.getParecer(req);
  res.json(response);
}

async function atualizarProcessoSeletivoAtivo(req, res) {
  let response = await processoSeletivoCtrl.atualizarProcessoSeletivoAtivo(req, req.params.id);
  res.json(response);
}

async function subscribeProcessoSeletivo(req, res) {
  const statusReturned = await processoSeletivoCtrl.subscribeProcessoSeletivo(req);
  res.status(statusReturned).json({});
}

async function unsubscribeProcessoSeletivo(req, res) {
  await processoSeletivoCtrl.unsubscribeProcessoSeletivo(req.params.id, req.user._id);
  res.json({});
}

async function updateProcessoSeletivo(req, res) {
  let response = await processoSeletivoCtrl.updateProcessoSeletivo(req, req.user._id);
  res.json(response);
}

async function deleteProcessoSeletivo(req, res) {
  await processoSeletivoCtrl.deleteProcessoSeletivo(req.params.id);
  res.json({});
}