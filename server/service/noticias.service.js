const { default: mongoose } = require("mongoose");
const NoticiasModel = require("../models/noticia.model");

module.exports = {
  getNoticias,
  getHeadersNoticias,
  getHeadersPaginationNoticias,
  insertNoticia,
  updateNoticia,
  deleteNoticia,
};

async function getNoticias(req) {
  let whereClause = {};
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  let ret = await NoticiasModel.find(whereClause)
    .sort({
      createAt: -1
    });

  if(whereClause._id) {
    ret = ret.map(data => (
      {
        _id: data._id, 
        title: data[req.query.language].title, 
        navTitle: data[req.query.language].navTitle, 
        content: data[req.query.language].content,
        createdAt: data.createdAt,
      }
    ));
  }
  return ret;
}

async function getHeadersNoticias(req) {
  let ret = await NoticiasModel.find({}, {
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

async function getHeadersPaginationNoticias(req) {
  console.log("AQUIIIIIIII: ", req.query)
  const pageNumber = req.query.pageNumber;
  const pageSize = req.query.pageSize;
  let ret = await NoticiasModel.find({}, {
    [`${req.query.language}.title`]: 1,
    [`${req.query.language}.navTitle`]: 1,
    createdAt: 1,
  }).sort({
    createAt: -1
  }).skip((pageNumber - 1) * pageSize)
  .limit(pageSize);

  ret = ret.map(data => (
    {
      _id: data._id, 
      title: data[req.query.language].title, 
      navTitle: data[req.query.language].navTitle,
      createdAt: data.createdAt
    }
  ));

  return ret;
}

async function insertNoticia(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new NoticiasModel(form).save();
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

async function deleteNoticia(id) {
  return await NoticiasModel.findOneAndRemove({
    _id: id
  });
}