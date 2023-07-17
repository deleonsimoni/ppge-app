const IaHorarioPeriodoModel = require("../models/ia-horario-periodo.model");

module.exports = {
  getIAHorarioPeriodo,
  updateIAHorarioPeriodo,
  insertIAHorarioPeriodo,
  deleteIAHorarioPeriodo,
};

async function getIAHorarioPeriodo(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  return await IaHorarioPeriodoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateIAHorarioPeriodo(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await IaHorarioPeriodoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertIAHorarioPeriodo(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new IaHorarioPeriodoModel(form).save();
}

async function deleteIAHorarioPeriodo(id) {
  return await IaHorarioPeriodoModel.findOneAndRemove({
    _id: id
  });
}