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
  let whereClause = {};
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  let ret = await CursosModel.find(whereClause)
    .sort({
      createAt: -1
    });

  if(whereClause._id) {
    ret = ret.map(data => (
      {
        _id: data._id, 
        title: data[req.query.language].title, 
        navTitle: data[req.query.language].navTitle, 
        content: data[req.query.language].content  
      }
    ));
  }
  return ret;
}

async function getHeadersCursos(req) {
  let ret = await CursosModel.find({}, {
    [`${req.query.language}.title`]: 1,
    [`${req.query.language}.navTitle`]: 1,
  }).sort({
    createAt: -1
  });
  ret = ret.map(data => (
    {
      _id: data._id, 
      title: data[req.query.language].title, 
      navTitle: data[req.query.language].navTitle 
    }
  ));

  return ret;
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