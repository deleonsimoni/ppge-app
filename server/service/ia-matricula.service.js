const IaMatriculaModel = require("../models/ia-matricula.model");

module.exports = {
  getIAMatricula,
  updateIAMatricula,
  insertIAMatricula,
  deleteIAMatricula,
};

async function getIAMatricula(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  return await IaMatriculaModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateIAMatricula(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await IaMatriculaModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertIAMatricula(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new IaMatriculaModel(form).save();
}

async function deleteIAMatricula(id) {
  return await IaMatriculaModel.findOneAndRemove({
    _id: id
  });
}