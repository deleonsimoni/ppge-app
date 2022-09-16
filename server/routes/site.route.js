const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const siteCtrl = require('../controllers/site.controller');
const requireAdmin = require('../middleware/require-admin');
const fileUpload = require('express-fileupload');
const processoSeletivoRoutes = require('./processo-seletivo.route');

const router = express.Router();
module.exports = router;

/* Page */
router.get('/page/:selectedPage', asyncHandler(getPage));
router.get('/page/:selectedPage/headers', asyncHandler(getHeadersPage));

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
router.get('/corpo-docente', asyncHandler(getCorpoDocente));

router.post('/corpo-docente', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(insertCorpoDocente));

router.put('/corpo-docente/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(updateCorpoDocente));

router.delete('/corpo-docente/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin], asyncHandler(deleteCorpoDocente));

async function getCorpoDocente(req, res) {
  let response = await siteCtrl.getCorpoDocente(req);
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