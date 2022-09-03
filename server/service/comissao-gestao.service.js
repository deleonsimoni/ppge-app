const ComissaoGestaoModel = require("../models/comissao-gestao.model");

module.exports = {
  getComissaoGestao,
  insertComissaoGestao,
  updateComissaoGestao,
  deleteComissaoGestao,
};

async function getComissaoGestao(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await ComissaoGestaoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateComissaoGestao(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await ComissaoGestaoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertComissaoGestao(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ComissaoGestaoModel(form).save();
}

async function deleteComissaoGestao(id) {
  return await ComissaoGestaoModel.findOneAndRemove({
    _id: id
  });
}