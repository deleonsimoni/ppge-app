const CriterioAvaliacaoModel = require("../models/criterio-avaliacao.model");

module.exports = {
  adicionarCriterio,
  atualizarCriterio,
  getAllCriterio,
  deleteById
}

async function adicionarCriterio(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new CriterioAvaliacaoModel(form).save();
}

async function atualizarCriterio(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  form.updatedAt = Date.now();
  return await CriterioAvaliacaoModel.findOneAndUpdate(
    {_id: form._id},
    form,
    {upsert: true}
  );
}

async function getAllCriterio() {
  return await CriterioAvaliacaoModel.find({}, {user: 0, createdAt: 0});
}

async function deleteById(idCriterio) {
  return await CriterioAvaliacaoModel.findOneAndRemove({
    _id: idCriterio
  });
}