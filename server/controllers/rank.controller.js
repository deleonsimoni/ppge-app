const RankModel = require('../models/rank.model');
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports = {
  gerarRank,
  getAllRanks,
  alterarStatusRank,
  getDetalheRank,
  deletarRankById,
}
const languageGlobal = "pt-br";

async function gerarRank(idProcesso, isFinalRank) {
  try {
    let processoSeletivo = await ProcessoSeletivoModel.findOne(
      { _id: idProcesso }
    ).populate({
      path: "researchLine",
      select: `${languageGlobal}.title`,
    }).populate({
      path: "enrolled.primeiroOrientador",
      select: "fullName",
    });

    console.log("processoSeletivo: ", JSON.stringify(processoSeletivo))
    const rankGerado = gerarRankPorProcesso(processoSeletivo, isFinalRank);


    return await RankModel.findOneAndUpdate(
      { idProcesso },
      {
        $addToSet: { listRank: { ...rankGerado, isFinalRank } },
        idProcesso,
        type: processoSeletivo.type,
        rankGerado,
        updatedAt: Date.now(),
      },
      { upsert: true, new: true },
    )
  } catch (e) {
    console.log("DEU RUIM AQUI: ")
    throw e;
  }
}
const tipoVagaToText = {
  1: "Ampla Concorrência",
  2: "Cotas de Ações Afirmativas",
  3: "Exclusiva docente",
}

function gerarRankPorProcesso(processoSeletivo, isFinalRank) {
  const dateNow = new Date();
  let rank = {
    createdAt: dateNow,
    title: `Resultado ${isFinalRank ? "Final" : "Parcial"} do Processo Seletivo ${processoSeletivo.title} - PPGE ${dateNow.getFullYear()}`,
    listRankLinha: [],
    published: false,

  }

  let listLinhaAux = {};
  processoSeletivo.researchLine.forEach(linhaPesquisa => {
    const vagaDalinha = processoSeletivo.vagas.find(vaga => vaga.idLinhaPesquisa == linhaPesquisa._id);
    const qtdVagasDaLinhaAC = vagaDalinha ? vagaDalinha.maxVaga : 0;
    const qtdVagasDaLinhaCotaAA = vagaDalinha ? vagaDalinha.maxVagaCota : 0;
    listLinhaAux[linhaPesquisa._id] = {
      idLinhaPesquisa: linhaPesquisa._id,
      titleLinhaPesquisa: linhaPesquisa[languageGlobal].title,
      maxVaga: qtdVagasDaLinhaAC,
      maxVagaCota: qtdVagasDaLinhaCotaAA,
      inscritosNaLinha: []
    }

  })

  processoSeletivo.enrolled.forEach(inscrito => {
    let notasNaOrdem = [];
    let isAprovado = true;
    let etapas;

    if (inscrito.parecer && inscrito.parecer.step) {
      etapas = inscrito.parecer.step;
    }


    if (etapas) {
      Object.values(etapas).forEach(etapa => {
        let notaEtapa = 0;

        Object.keys(etapa).forEach(keySection => {
          if (keySection.startsWith('section-')) {

            Object.values(etapa[keySection]).forEach(notaSection => {
              notaEtapa += typeof notaSection == 'number' ? notaSection : 0;
            })

          }
        })

        isAprovado = isAprovado && etapa.stepApproval;
        notasNaOrdem.push(notaEtapa);
      })
    } else {
      isAprovado = false;
    }
    const mediaNotas = gerarMediaNotas(notasNaOrdem);
    let situacao = '';
    if (isAprovado) {
      situacao += `Aprovada(o) e ${mediaNotas >= 7 ? '' : 'não '}classificada(o)`
    } else {
      situacao = 'Eliminado(a) do processo seletivo';
    }
    listLinhaAux[inscrito.linhaPesquisa].inscritosNaLinha.push({
      orientador: inscrito.primeiroOrientador ? inscrito.primeiroOrientador.fullName : null,
      codInscricao: inscrito.codInscricao,
      notasNaOrdem,
      medialFinal: mediaNotas,
      situacao: situacao,
      opcaoVaga: tipoVagaToText[inscrito.opcaoVaga]
    });

  });
  Object.values(listLinhaAux).forEach(l => {
    rank.listRankLinha.push(l)
  })

  return rank;
}

function gerarMediaNotas(arrayDeNotas) {
  if (arrayDeNotas && Array.isArray(arrayDeNotas)) {
    let somatorio = 0;
    arrayDeNotas.forEach(nota => somatorio += nota);
    return somatorio / arrayDeNotas.length;
  } else {
    return 0;
  }
}

async function getAllRanks(idProcesso, published) {
  console.log("publishedpublished: ", published)
  if (!ObjectId.isValid(idProcesso))
    throw "Id do processo não é compatível com id do Mongo!";

  let query = [];

  query.push({
    $match: {
      idProcesso: new ObjectId(idProcesso)
    }
  });

  if (published != null) {
    query.push({
      $project: {
        listRank: {
          $filter: {
            input: "$listRank",
            as: "rank",
            cond: {
              $eq: ["$$rank.published", published]
            }
          }
        },
      }
    });
  }

  query.push({
    $project: {
      "listRank._id": 1,
      "listRank.title": 1,
      "listRank.published": 1,
      "listRank.isFinalRank": 1,
    }
  });
  console.log("query: ", JSON.stringify(query))
  const result = await RankModel.aggregate(query).exec();
  console.log("result: ", result)
  return result.length > 0 ? result[0] : null;
}

async function getDetalheRank(idProcesso, idRank) {
  return await RankModel.findOne(
    { idProcesso },
    {
      listRank: { $elemMatch: { _id: idRank } },
      type: 1
    }
  );
}

async function alterarStatusRank(idProcesso, idRank, isChecked) {
  return await RankModel.findOneAndUpdate(
    { idProcesso, listRank: { $elemMatch: { _id: idRank } } },
    { $set: { "listRank.$.published": isChecked } },
    { upsert: false }
  )
}

async function deletarRankById(idProcesso, idRank) {
  return await RankModel.findOneAndUpdate(
    { idProcesso },
    { $pull: { listRank: { _id: idRank } } },
    { upsert: false }
  )
}