const NormasPosDoutoradoModel = require("../models/normas-pos-doutorado.model");

module.exports = {
  getNormasPosDoutorado,
  insertNormasPosDoutorado,
  updateNormasPosDoutorado,
  deleteNormasPosDoutorado,
};

async function getNormasPosDoutorado(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  return await NormasPosDoutoradoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateNormasPosDoutorado(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await NormasPosDoutoradoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertNormasPosDoutorado(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new NormasPosDoutoradoModel(form).save();
}

async function deleteNormasPosDoutorado(id) {
  return await NormasPosDoutoradoModel.findOneAndRemove({
    _id: id
  });
}