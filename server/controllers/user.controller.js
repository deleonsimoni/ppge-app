const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const mongoose = require('mongoose');
const linhaPesquisaService = require('../service/linha_pesquisa.service');
const LinhaPesquisaModel = require('../models/linha-pesquisa.model');
const templateEmail = require('../config/templateEmails');
const emailSender = require('../controllers/email.controller');

module.exports = {
  insert,
  getByIdOnlyProcesso,
  getById,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  resetPassword,
  changePassword,
  generateNewPassword,

  getAllUsers,
  adicionarOuRemoverAdmin,

  cadastrarParecerista,
  removerParecerista,
  listarPareceristas,
  adicionarCoordenador,
  removerCoordenador,
};

async function insert(user) {
  let success;
  if (!user || !user._id) {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    success = await new User(user).save();

    if (success) {
      let email = templateEmail.inscricaoSucesso;
      emailSender.sendMailAWS(user.email, 'Bem-Vindo!', email);
    }
  } else {
    // Edit AQUI!

    success = await User.findOneAndUpdate({ _id: user._id }, {
      '$set': {
        fullname: user.fullname,
        socialname: user.socialname,
        dataNiver: user.dataNiver,
        rg: user.rg,
        cpf: user.cpf,
        rgEmissor: user.rgEmissor,
        passaporte: user.passaporte,
        nacionalidade: user.nacionalidade,
        endereco: user.endereco,
        bairro: user.bairro,
        cep: user.cep,
        cidade: user.cidade,
        estado: user.estado,
        celular: user.celular,
        telefone: user.telefone,
        cargo: user.cargo,
        empresa: user.empresa,
        deficiencia: user.deficiencia,
        cor: user.cor,
        genero: user.genero,
      }
    }, { upsert: false });


    success.fullname = user.fullname;
    success.socialname = user.socialname;
    success.dataNiver = user.dataNiver;
    success.rg = user.rg;
    success.cpf = user.cpf;
    success.rgEmissor = user.rgEmissor;
    success.passaporte = user.passaporte;
    success.nacionalidade = user.nacionalidade;
    success.endereco = user.endereco;
    success.bairro = user.bairro;
    success.cep = user.cep;
    success.cidade = user.cidade;
    success.estado = user.estado;
    success.celular = user.celular;
    success.telefone = user.telefone;
    success.cargo = user.cargo;
    success.empresa = user.empresa;
    success.deficiencia = user.deficiencia;
    success.cor = user.cor;
    success.genero = user.genero;


  }
  return success;
}

async function getAllUsers(req) {
  let query;

  if (req.query.nameSearch) {


    const regex = new RegExp('^' + req.query.nameSearch, 'i');
    query = UserModel.find(
      {
        $or: [
          { fullname: regex },
          { email: regex }
        ]
      },
      {
        _id: 1,
        fullname: 1,
        email: 1,
        roles: 1,
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

      }
    ).sort({ fullname: 1 });
  } else {

    query = UserModel.find(
      {
      },
      {
        _id: 1,
        fullname: 1,
        email: 1,
        roles: 1,
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

      }
    ).sort({ fullname: 1 });
  }

  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
    const limit = parseInt(req.query.limit) || 10; // Limite de documentos por página, padrão é 10
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit+1);
  }

  return await query.exec();
}

async function adicionarOuRemoverAdmin(req) {

  let queryAddOrRemove;
  if (req.query.isAdicionarAdmin == "true") {
    queryAddOrRemove = { "$addToSet": { roles: "admin" } }
  } else {
    queryAddOrRemove = { "$pull": { roles: "admin" } }
  }

  let user = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    queryAddOrRemove,
    { upsert: false }
  );

  if (user) {
    return { status: 200, message: "Admin atualizado com sucesso!" };
  } else {
    return { status: 400, message: "Erro ao atualizar admin!" };
  }


}

async function getByIdOnlyProcesso(idUser, req) {
  let userResult = await UserModel.findOne(
    { _id: idUser },
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
        $elemMatch: { idProcesso: req.query.idProcesso }
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

async function getById(idUser) {
  return await UserModel.findById(idUser);
}

async function subscribeProcessoSeletivo(idUser, idProcesso) {
  return await UserModel.findOneAndUpdate(
    { _id: idUser },
    {
      $addToSet: {
        processosSeletivo: { idProcesso }
      }
    },
    { upsert: false }
  );
}


async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await UserModel.findOneAndUpdate({
    _id: idUser
  },
    { $pull: { processosSeletivo: idProcessoSeletivo } },
    { upsert: false }
  );
}

/* Parecerista */

async function adicionarCoordenador(idUser, idLinhaPesquisa) {
  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: idUser },
      { $addToSet: { roles: "coordenador" } },
      { upsert: false }
    );
    if (user) {
      // Adiciona id do usuario na linha de pesquisa
      await LinhaPesquisaModel.findOneAndUpdate(
        { _id: idLinhaPesquisa },
        { $addToSet: { coordenadores: idUser } },
        { upsert: false }
      );

      return getSuccessByStatus(200, "Coordenador cadastrado com sucesso!");
    }
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    console.log("error: ", error)
    return getErrorByStatus(500)
  }
}

async function removerCoordenador(idUser, idLinhaPesquisa) {
  try {
    const linhaRemovida = await LinhaPesquisaModel.findOneAndUpdate(
      { _id: idLinhaPesquisa },
      { $pull: { coordenadores: idUser } },
      { upsert: false }
    )

    let linhaVinculada = await LinhaPesquisaModel.findOne(
      { coordenadores: idUser },
      { _id: 1 }
    );

    let user;
    if (!linhaVinculada) {
      user = await UserModel.findOneAndUpdate(
        { _id: idUser },
        { $pull: { roles: "coordenador" } },
        { upsert: false }
      );
    }

    if (linhaRemovida || user) {
      return getSuccessByStatus(200, "Coordenador removido com sucesso!");
    }
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    return getErrorByStatus(500)

  }
}

async function cadastrarParecerista(email, idLinhaPesquisa) {
  let response = getErrorByStatus(500);
  try {
    if (validateEmail(email)) {
      // Adiciona permissao "parecerista" ao usuario
      let user = await UserModel.findOneAndUpdate(
        { email: email },
        { $addToSet: { roles: "parecerista" } },
        { upsert: false }
      );

      if (user) {

        // Adiciona id do usuario na linha de pesquisa
        await LinhaPesquisaModel.findOneAndUpdate(
          { _id: idLinhaPesquisa },
          { $addToSet: { avaliadores: user._id } },
          { upsert: false }
        );

        response = getSuccessByStatus(200, "Avaliador cadastrado com sucesso!");
      } else {
        response = getErrorByStatus(404, "Usuário não encontrado na base!");
      }
    } else {
      response = getErrorByStatus(400);
    }
  } catch (ex) {
    console.log(ex)
    response = getErrorByStatus(500);
  } finally {
    return response;
  }
}

async function removerParecerista(idUser, idLinhaPesquisa) {
  try {
    await this.removerCoordenador(idUser, idLinhaPesquisa);

    const linhaRemovida = await LinhaPesquisaModel.findOneAndUpdate(
      { _id: idLinhaPesquisa },
      { $pull: { avaliadores: idUser } },
      { upsert: false }
    )

    let linhaVinculada = await LinhaPesquisaModel.findOne(
      { avaliadores: idUser },
      { _id: 1 }
    );
    let user;
    if (!linhaVinculada) {
      user = await UserModel.findOneAndUpdate(
        { _id: idUser },
        { $pullAll: { roles: ["parecerista"] } },
        { upsert: false }
      );
    }

    if (linhaRemovida || user)
      return getSuccessByStatus(200, "Parecerista removido com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    console.log(error)
    return getErrorByStatus(500)

  }
}

async function listarPareceristas() {
  return await UserModel.find({ roles: "parecerista" }, { fullname: 1, email: 1, roles: 1 });
}

async function resetPassword(req, user) {
  const hashString = bcrypt.hashSync(req.body.password, 10);

  let response = {
    status: 200,
    message: `Senha alterada com sucesso.`
  };

  await User.findByIdAndUpdate(user._id, {
    '$set': {
      mailCodePassword: null,
      hashedPassword: hashString
    }
  })

  return response;

}

async function changePassword(idUser, body) {
  let response = { status: 200, message: "Senha alterada com sucesso!" }

  let user = await User.findOne({ _id: idUser });
  if (!user) {
    return { status: 400, message: "Usuário não encontrado!" };
  }

  if (!bcrypt.compareSync(body.senha, user.hashedPassword)) {
    return { status: 401, message: "Senha atual inválida!" };
  }

  if (body.novaSenha.length < 6) {
    return { status: 401, message: "A nova senha tem que ter no mínimo 6 dígitos!" };
  }

  if (body.novaSenha != body.reNovaSenha) {
    return { status: 401, message: "Nova senha não confere com 'Repetir Senha'!" };
  }

  const hashString = bcrypt.hashSync(body.novaSenha, 10);
  await User.updateOne({ _id: user._id }, {
    '$set': {
      hashedPassword: hashString
    }
  })


  return { status: 200, message: "sucesso" }
}

async function generateNewPassword(user) {
  const randomstring = Math.random().toString(36).slice(-8);

  let response = {
    status: 200,
    message: `Seu código para troca de senha foi enviado para seu email.`
  };

  await User.findOneAndUpdate({ _id: user._id }, {
    '$set': {
      mailCodePassword: randomstring
    }
  })

  let email = templateEmail.esqueciSenha.replace("#senha#", randomstring);
  emailSender.sendMailAWS(user.email, 'Recuperação de Senha', email);

  return response;

}


function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/* Fim Parecerista */
