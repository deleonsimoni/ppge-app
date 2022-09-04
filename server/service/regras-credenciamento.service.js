const RegrasCredenciamentoModel = require("../models/regras-credenciamento.model");

module.exports = {
  getRegrasCredenciamento,
  insertRegrasCredenciamento,
  updateRegrasCredenciamento,
  deleteRegrasCredenciamento,
};

async function getRegrasCredenciamento(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await RegrasCredenciamentoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateRegrasCredenciamento(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await RegrasCredenciamentoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertRegrasCredenciamento(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new RegrasCredenciamentoModel(form).save();
}

async function deleteRegrasCredenciamento(id) {
  return await RegrasCredenciamentoModel.findOneAndRemove({
    _id: id
  });
}