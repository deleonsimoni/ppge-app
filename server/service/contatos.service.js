const ContatosModel = require("../models/contatos.model");

module.exports = {
  getContatos,
  insertContatos,
  updateContatos,
};

async function getContatos(req) {
  return await ContatosModel.findOne({})
    .sort({
      createAt: -1
    });
}

async function updateContatos(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await ContatosModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertContatos(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ContatosModel(form).save();
}
