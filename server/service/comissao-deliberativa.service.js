const ComissaoDeliberativaModel = require("../models/comissao-deliberativa.model");

module.exports = {
  getComissaoDeliberativa,
  insertComissaoDeliberativa,
  updateComissaoDeliberativa,
  deleteComissaoDeliberativa,
};

async function getComissaoDeliberativa(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await ComissaoDeliberativaModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateComissaoDeliberativa(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await ComissaoDeliberativaModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertComissaoDeliberativa(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ComissaoDeliberativaModel(form).save();
}

async function deleteComissaoDeliberativa(id) {
  return await ComissaoDeliberativaModel.findOneAndRemove({
    _id: id
  });
}