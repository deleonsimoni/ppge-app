const IaCalendarioModel = require("../models/ia-calendario.model");

module.exports = {
  getIACalendario,
  updateIACalendario,
  insertIACalendario,
  deleteIACalendario,
};

async function getIACalendario(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  return await IaCalendarioModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateIACalendario(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await IaCalendarioModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertIACalendario(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new IaCalendarioModel(form).save();
}

async function deleteIACalendario(id) {
  return await IaCalendarioModel.findOneAndRemove({
    _id: id
  });
}