const HistoricoModel = require('../models/historico.model');
const S3Uploader = require('./aws.controller');


module.exports = {
  getHistorico,
  insertHistorico,
  updateHistorico,
  deleteHistorico,
};

async function getHistorico() {
  return await HistoricoModel.find()
    .sort({
      createAt: -1
    });
}

async function updateHistorico(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;

      return await HistoricoModel.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await HistoricoModel.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}


async function insertHistorico(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new HistoricoModel(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await new HistoricoModel(form).save();
  }
}

async function deleteHistorico(id) {
  return await HistoricoModel.findOneAndRemove({
    _id: id
  });
}
