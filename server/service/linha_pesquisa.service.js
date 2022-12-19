const { default: mongoose } = require("mongoose");
const LinhaPesquisaModel = require("../models/linha-pesquisa.model");

module.exports = {
  getLinhaPesquisa,
  getHeadersLinhaPesquisa,
  getAllTitlesLinhaPesquisa,
  getHeadersLinhaPesquisaByIdDocente,
  insertLinhaPesquisa,
  updateLinhaPesquisa,
  deleteLinhaPesquisa,
  listarPareceristasByLinha
};

async function listarPareceristasByLinha(idLinhaPesquisa) {
  const res = await LinhaPesquisaModel.findOne(
    {_id: idLinhaPesquisa},
    {avaliadores:1}
  ).populate({
    path: 'avaliadores',
    select: 'fullname email roles',
  });
  return res.avaliadores ? res.avaliadores : [] ;
}

async function getLinhaPesquisa(req) {
  let whereClause = {};
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  let ret = await LinhaPesquisaModel.find(whereClause)
  .sort({
    createAt: -1
  })
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


async function getHeadersLinhaPesquisa(req) {
  let ret = await LinhaPesquisaModel.find({}, {
      [`${req.query.language}.title`]: 1,
      [`${req.query.language}.navTitle`]: 1,
    })
    .sort({
      createAt: -1
    })
  ret = ret.map(data => (
    {
      _id: data._id, 
      title: data[req.query.language].title, 
      navTitle: data[req.query.language].navTitle 
    }
  ));
  return ret;
}

async function getHeadersLinhaPesquisaByIdDocente(idDocente, language) {
  await LinhaPesquisaModel.find({ // condicao where
    corpoDocente: idDocente
  }, 
  { // limita campos
    [`${language}.title`]: 1,
  })
  .sort({
    createAt: -1
  })

}

async function getAllTitlesLinhaPesquisa(req) {
  let whereClause = {};
  return await LinhaPesquisaModel.find(whereClause, {title: 1})
    .sort({
      createAt: -1
    });
}

async function updateLinhaPesquisa(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await LinhaPesquisaModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertLinhaPesquisa(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new LinhaPesquisaModel(form).save();
}

async function deleteLinhaPesquisa(id) {
  return await LinhaPesquisaModel.findOneAndRemove({
    _id: id
  });
}