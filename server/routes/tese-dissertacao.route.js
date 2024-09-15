const teseDissertacaoCtrl = require('../controllers/tese-dissertacao.controller');
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;

router.get('/tese-dissertacao/:tipo', asyncHandler(getAllTeseDissertacao));

router.get('/tese-dissertacao/get-filter/filter', asyncHandler(getFillTeseDissertacao));

router.get('/tese-dissertacao/anos-cadastrados/all', asyncHandler(getAllYearsTeseDissertacao));

router.post('/tese-dissertacao', [passport.authenticate('jwt', {
    session: false
  }), requireAdmin], asyncHandler(insertTeseDissertacao));

  router.put('/tese-dissertacao/:id', [passport.authenticate('jwt', {
    session: false
  }), requireAdmin], asyncHandler(updateTeseDissertacaoPage));

  router.delete('/tese-dissertacao/:id', [passport.authenticate('jwt', {
    session: false
  }), requireAdmin], asyncHandler(deleteTeseDissertacao));

async function insertTeseDissertacao(req, res) {
let response = await teseDissertacaoCtrl.insertTeseDissertacao(req, req.user._id);
res.json(response);
}
async function updateTeseDissertacaoPage(req, res) {
  let response = await teseDissertacaoCtrl.updateTeseDissertacao(req, req.user._id);
  res.json(response);
}

async function getAllTeseDissertacao(req, res) {
    let response = await teseDissertacaoCtrl.getAllTeseDissertacao(req);
    res.json(response);
}

async function getFillTeseDissertacao(req, res) {
  
  console.log("AAAAAAAAAAAasdasdasdasdasd");
  let response = await teseDissertacaoCtrl.getFillTeseDissertacao(req);
  res.json(response);
}

async function getAllYearsTeseDissertacao(req, res) {
  
  let response = await teseDissertacaoCtrl.getAllYearsTeseDissertacao(req);
  res.json(response);

}

async function deleteTeseDissertacao(req, res) {
  let response = await teseDissertacaoCtrl.deleteTeseDissertacao(req, req.params.id);
  res.json(response);
}