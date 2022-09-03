const ObjetivoModel = require("../models/objetivos.model");

module.exports = {
  getObjetivo,
  insertObjetivo,
  updateObjetivo,
  deleteObjetivo,
};

async function getObjetivo(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await ObjetivoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateObjetivo(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await ObjetivoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertObjetivo(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ObjetivoModel(form).save();
}

async function deleteObjetivo(id) {
  return await ObjetivoModel.findOneAndRemove({
    _id: id
  });
}