const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');

module.exports = {
  insert,
  getByIdOnlyProcesso,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
};

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function getByIdOnlyProcesso(idUser, req) {
  let userResult = await UserModel.findOne(
    {_id: idUser},
    {
      fullname: 1,
      email: 1,
      socialname: 1,
      cpf: 1,
      rg: 1,
      rgEmissor: 1,
      passaporte: 1,
      dataNiver: 1,
      nacionalidade: 1,
      endereco: 1,
      bairro: 1,
      cep: 1,
      cidade: 1,
      estado: 1,
      celular: 1,
      telefone: 1,
      cargo: 1,
      empresa: 1,
      deficiencia: 1,
      cor: 1,
      genero: 1,
      processosSeletivo: {
        $elemMatch: {
          idProcesso: req.query.idProcesso
        }
      }
    }
  )
  .populate({
    path: "processosSeletivo.primeiroOrientador",
    select: "fullName",
  })
  .populate({
    path: "processosSeletivo.segundoOrientador",
    select: "fullName",
  })
  .populate({
    path: "processosSeletivo.linhaPesquisa",
    select: `${req.query.language}.title`,
  });

  return userResult
}

async function subscribeProcessoSeletivo(idUser, formulario) {
  return await UserModel.findOneAndUpdate(
    {_id: idUser},
    {
      $addToSet: {
        processosSeletivo: formulario
      }
    },
    {upsert: false}
  );
}


async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await UserModel.findOneAndUpdate({
      _id: idUser
    },
    {$pull: {processosSeletivo: {idProcesso: idProcessoSeletivo}}}, 
    {upsert: false}
  );
}
