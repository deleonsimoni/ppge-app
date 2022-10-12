const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const requireLogin = require('../middleware/require-login');
const processoSeletivoCtrl = require('../controllers/processo-seletivo.controller');
const setLocation = require('../middleware/set-location');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

router.get('/processo-seletivo', asyncHandler(getProcessoSeletivo));

router.get('/processo-seletivo/inscritos/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(getInscritosByProcessoSelectivo));

router.get('/processo-seletivo/minha-inscricoes', [passport.authenticate('jwt', {
  session: false
}), requireLogin], asyncHandler(getMinhaInscricoesProcessoSelectivo));

router.post('/processo-seletivo', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(insertProcessoSeletivo));

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

async function getProcessoSeletivoInscreverInfosById(req, res) {
  let response = await processoSeletivoCtrl.getProcessoSeletivoInscreverInfosById(req.params.id, req.query.language);
  res.json(response);
}

async function getInscritosByProcessoSelectivo(req, res) {
  let response = await processoSeletivoCtrl.getInscritosByProcessoSelectivo(req.params.id);
  res.json(response);

}

async function getMinhaInscricoesProcessoSelectivo(req, res) {
  let response = await processoSeletivoCtrl.getMinhaInscricoesProcessoSelectivo(req.user._id);
  res.json(response);

}

async function insertProcessoSeletivo(req, res) {
  let response = await processoSeletivoCtrl.insertProcessoSeletivo(req, req.user._id);
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