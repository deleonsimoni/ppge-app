const CriterioHomologacaoModel = require("../models/criterio-homologacao.model");

module.exports = {
  adicionarCriterioHomologacao,
  atualizarCriterioHomologacao,
  getAllCriterioHomologacao,
  deleteCriterioHomologacaoById
}

async function adicionarCriterioHomologacao(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new CriterioHomologacaoModel(form).save();
}

async function atualizarCriterioHomologacao(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  form.updatedAt = Date.now();
  return await CriterioHomologacaoModel.findOneAndUpdate(
    {_id: form._id},
    form,
    {upsert: true}
  );
}

async function getAllCriterioHomologacao() {
  return await CriterioHomologacaoModel.find({}, {user: 0, createdAt: 0});
}

async function deleteCriterioHomologacaoById(idCriterio) {
  return await CriterioHomologacaoModel.findOneAndRemove({
    _id: idCriterio
  });
}