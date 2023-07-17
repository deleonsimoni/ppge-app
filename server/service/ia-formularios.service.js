const IaFormulariosModel = require("../models/ia-formularios.model");

module.exports = {
  getIAFormularios,
  updateIAFormularios,
  insertIAFormularios,
  deleteIAFormularios,
};

async function getIAFormularios(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  return await IaFormulariosModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateIAFormularios(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await IaFormulariosModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertIAFormularios(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new IaFormulariosModel(form).save();
}

async function deleteIAFormularios(id) {
  return await IaFormulariosModel.findOneAndRemove({
    _id: id
  });
}