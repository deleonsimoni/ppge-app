const HomeApresentacaoModel = require("../models/home-apresentacao.model");

module.exports = {
  getHomeApresentacao,
  insertHomeApresentacao,
  updateHomeApresentacao,
  deleteHomeApresentacao,
};

async function getHomeApresentacao(req) {
  let whereClause = {};
  if(!!req.query._id) whereClause._id = req.query._id
  console.log("whereClause: ", whereClause);
  return await HomeApresentacaoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateHomeApresentacao(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await HomeApresentacaoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertHomeApresentacao(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new HomeApresentacaoModel(form).save();
}

async function deleteHomeApresentacao(id) {
  return await HomeApresentacaoModel.findOneAndRemove({
    _id: id
  });
}