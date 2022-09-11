const teseDissertacaoCtrl = require('../controllers/tese-dissertacao.controller');
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;

router.get('/tese-dissertacao/:tipo', asyncHandler(getAllTeseDissertacao));

router.post('/tese-dissertacao', [passport.authenticate('jwt', {
    session: false
  }), requireAdmin], asyncHandler(insertTeseDissertacao));

  router.delete('/tese-dissertacao/:id', [passport.authenticate('jwt', {
    session: false
  }), requireAdmin], asyncHandler(deleteTeseDissertacao));

async function insertTeseDissertacao(req, res) {
let response = await teseDissertacaoCtrl.insertTeseDissertacao(req, req.user._id);
res.json(response);
}

async function getAllTeseDissertacao(req, res) {
    let response = await teseDissertacaoCtrl.getAllTeseDissertacao(req.params.tipo);
    res.json(response);
}

async function deleteTeseDissertacao(req, res) {
  let response = await teseDissertacaoCtrl.deleteTeseDissertacao(req, req.params.id);
  res.json(response);
}