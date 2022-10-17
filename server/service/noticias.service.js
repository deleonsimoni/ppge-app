const { default: mongoose } = require("mongoose");
const NoticiasModel = require("../models/noticia.model");

module.exports = {
  getNoticia,
  getHeadersNoticias,
  insertNoticia,
  updateNoticia,
  deleteNoticia,
};

async function getNoticia(req) {
  let whereClause = {};
  if (!!req.query._id) {
    if (!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  let ret = await NoticiasModel.find(whereClause)
    .sort({
      createAt: -1
    });

  return ret;
}

async function getHeadersNoticias(req) {
  let ret = await NoticiasModel.find({}, {
    [`${req.query.language}.title`]: 1,
  }).sort({
    createAt: -1
  });

  return ret;
}

async function updateNoticia(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await NoticiasModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertNoticia(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new NoticiasModel(form).save();
}

async function deleteNoticia(id) {
  return await NoticiasModel.findOneAndRemove({
    _id: id
  });
}