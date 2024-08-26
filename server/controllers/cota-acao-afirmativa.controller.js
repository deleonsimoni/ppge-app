const CotaAcaoAfirmativaModel = require("../models/cota-acao-afirmativa.model");

module.exports = {
  adicionarCota,
  atualizarCota,
  getAllCotas,
  deleteById,
  atualizarQuestionCota
}

async function adicionarCota(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new CotaAcaoAfirmativaModel(form).save();
}

async function atualizarCota(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await CotaAcaoAfirmativaModel.findOneAndUpdate(
    {_id: form._id},
    form,
    {upsert: true}
  );
}

async function atualizarQuestionCota(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  form.isQuestion = true;
  return await CotaAcaoAfirmativaModel.findOneAndUpdate(
    {isQuestion: true},
    form,
    {upsert: true}
  );
}

async function getAllCotas() {
  return await CotaAcaoAfirmativaModel.find({}, {user: 0, createdAt: 0});
}

async function deleteById(idCota) {
  return await CotaAcaoAfirmativaModel.findOneAndRemove({
    _id: idCota
  });
}