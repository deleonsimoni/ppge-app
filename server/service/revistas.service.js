const { default: mongoose } = require("mongoose");
const RevistasModel = require("../models/revista.model");

module.exports = {
  getRevistas,
  getHeadersRevistas,
  insertRevistas,
  updateRevistas,
  deleteRevistas,
};

async function getRevistas(req) {
  let whereClause = {};
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  let ret = await RevistasModel.find(whereClause)
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

async function getHeadersRevistas(req) {
  let ret = await RevistasModel.find({}, {
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

async function updateRevistas(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await RevistasModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertRevistas(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new RevistasModel(form).save();
}

async function deleteRevistas(id) {
  return await RevistasModel.findOneAndRemove({
    _id: id
  });
}