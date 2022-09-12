const { default: mongoose } = require("mongoose");
const CursosModel = require("../models/cursos.model");

module.exports = {
  getCursos,
  getHeadersCursos,
  insertCursos,
  updateCursos,
  deleteCursos,
};

async function getCursos(req) {
  console.log('AAAAA: ', req.query)
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  return await CursosModel.find(whereClause)
    .sort({
      createAt: -1
    });
}

async function getHeadersCursos(req) {
  console.log('AAAAA: ', req.query)
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await CursosModel.find(whereClause, {navTitle: 1})
    .sort({
      createAt: -1
    });
}

async function updateCursos(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await CursosModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertCursos(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new CursosModel(form).save();
}

async function deleteCursos(id) {
  return await CursosModel.findOneAndRemove({
    _id: id
  });
}