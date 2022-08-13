const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const siteCtrl = require('../controllers/site.controller');
const requireAdmin = require('../middleware/require-admin');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

/* Historico */
router.get('/historico', asyncHandler(getHistorico));

router.post('/historico', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(insertHistorico));

router.put('/historico/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(updateHistorico));

router.delete('/historico/:id', [passport.authenticate('jwt', {
  session: false
}), requireAdmin, fileUpload()], asyncHandler(deleteHistorico));

async function getHistorico(req, res) {
  let response = await siteCtrl.getHistorico();
  res.json(response);
}

async function insertHistorico(req, res) {
  let response = await lepedCtrl.insertHistorico(req, req.user._id);
  res.json(response);
}

async function updateHistorico(req, res) {
  let response = await lepedCtrl.updateHistorico(req, req.user._id);
  res.json(response);
}

async function deleteHistorico(req, res) {
  let response = await lepedCtrl.deleteHistorico(req.params.id);
  res.json(response);
}


/* Fim Historico */ 