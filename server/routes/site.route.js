const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const siteCtrl = require('../controllers/site.controller');
const requireAdmin = require('../middleware/require-admin');
const setLocation = require('../middleware/set-location');
const fileUpload = require('express-fileupload');
const processoSeletivoRoutes = require('./processo-seletivo.route');
const pareceristasoRoutes = require('./pareceristas.route');
const criterioAvaliacaoRoutes = require('./criterio-avaliacao.route');
const cotaAcaoAfirmativaRoutes = require('./cota-acao-afirmativa.route');
const rankRoutes = require('./rank.route');

const router = express.Router();
module.exports = router;


router.get('/page/linha_pesquisa/headers-professors', setLocation, asyncHandler(getHeadersLinhaPesquisaWithProfessors));

async function getHeadersLinhaPesquisaWithProfessors(req, res) {
  let response = await siteCtrl.getHeadersLinhaPesquisaWithProfessors(req);
  res.json(response);
}

/* Page */
router.get('/page/:selectedPage', setLocation, asyncHandler(getPage));
router.get('/page/:selectedPage/headers', setLocation, asyncHandler(getHeadersPage));
router.get('/page/:selectedPage/paginated/headers', setLocation, asyncHandler(getHeadersPaginationPage));
router.get('/page/:selectedPage/all-titles', asyncHandler(getAllTitlesPage));

router.post('/page/:selectedPage', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(insertPage));

router.put('/page/:selectedPage/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(updatePage));

router.delete('/page/:selectedPage/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(deletePage));

async function getPage(req, res) {
  let response = await siteCtrl.getPage(req);
  res.json(response);
}

async function getHeadersPage(req, res) {
  let response = await siteCtrl.getHeadersPage(req);
  res.json(response);
}
async function getHeadersPaginationPage(req, res) {
  let response = await siteCtrl.getHeadersPaginationPage(req);
  res.json(response);
}

async function getAllTitlesPage(req, res) {
  let response = await siteCtrl.getAllTitlesPage(req);
  res.json(response);
}

async function insertPage(req, res) {
  let response = await siteCtrl.insertPage(req, req.user._id);
  res.json(response);
}

async function updatePage(req, res) {
  let response = await siteCtrl.updatePage(req, req.user._id);
  res.json(response);
}

async function deletePage(req, res) {
  let response = await siteCtrl.deletePage(req, req.params.id);
  res.json(response);
}

/* Fim Page */

/* Corpo Docente */
router.get('/corpo-docente', setLocation, asyncHandler(getCorpoDocente));

router.get('/corpo-docente/name', asyncHandler(getCorpoDocenteName));

router.post('/corpo-docente', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(insertCorpoDocente));

router.put('/corpo-docente/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(updateCorpoDocente));

router.delete('/corpo-docente/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(deleteCorpoDocente));

async function getCorpoDocente(req, res) {
  let response = await siteCtrl.getCorpoDocente(req);
  res.json(response);
}

async function getCorpoDocenteName(req, res) {
  let response = await siteCtrl.getCorpoDocenteName(req);
  res.json(response);
}

async function insertCorpoDocente(req, res) {
  let response = await siteCtrl.insertCorpoDocente(req, req.user._id);
  res.json(response);
}

async function updateCorpoDocente(req, res) {
  let response = await siteCtrl.updateCorpoDocente(req, req.user._id);
  res.json(response);
}

async function deleteCorpoDocente(req, res) {
  let response = await siteCtrl.deleteCorpoDocente(req.params.id);
  res.json(response);
}

/* Fim Corpo Docente */
router.use('/', processoSeletivoRoutes);
router.use('/parecerista', pareceristasoRoutes);
router.use('/criterio-avaliacao', criterioAvaliacaoRoutes);
router.use('/cota-acao-afirmativa', cotaAcaoAfirmativaRoutes);
router.use('/rank', rankRoutes);