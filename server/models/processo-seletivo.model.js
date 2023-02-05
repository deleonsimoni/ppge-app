const mongoose = require('mongoose');

const ProcessoSeletivoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    isAtivo: {
      type: Boolean,
      default: true
    },

    type: {
      type: Number,
      required: true,
      default: 1
    },

    etapa: {
      type: String,
      required: true,
      default: 'inscricao'
    },
    
    researchLine: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LinhaPesquisa',
      }
    ],

    title: {
      type: String,
      required: true,
    },

    content: [
      {
        contentTitle: {
          type: String,
        },
        contentLink: {
          type: String,
        }
      }
    ],

    vagas: [
      {
        type: mongoose.Schema.Types.Mixed,
      }
    ],

    criterio: {
      type: mongoose.Schema.Types.Mixed,
    },

    enrolled: [
      {
        idUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        tipoFormulario: {
          type: Number,
        },
        linhaPesquisa: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'LinhaPesquisa',
          required: true,
        },
        primeiroOrientador: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CorpoDocente',
          required: true,
        },
        segundoOrientador: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CorpoDocente',
        },
        opcaoVaga: {
          type: Number,
        },
        opcaoVagaCotaSub: {
          type: String,
        },
        deficienciaSub: {
          type: String,
        },
        graduacao: {
          type: mongoose.Schema.Types.Mixed,
        },
        posGraduacao: {
          type: mongoose.Schema.Types.Mixed,
        },
        posGraduacaoMestrado: {
          type: mongoose.Schema.Types.Mixed,
        },
        termoConcordanciaEdital: {
          type: Boolean,
        },
        termoResponsabilidadeInfo: {
          type: Boolean,
        },
        termoLeituraEdital: {
          type: Boolean,
        },
        files: {
          pathLattes: {
            type: String,
          },
          pathMemorial: {
            type: String,
          },
          pathComprovantePagamento: {
            type: String,
          },
          pathPreProj: {
            type: String,
          },
          pathProjetoTese: {
            type: String,
          },
          pathPrincipalPubli: {
            type: String,
          },
        },
        parecerista: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        parecer: {
          aprovado: {
            type: Boolean,
          },
          homologado: {
            type: Boolean,
          },
          step: {
            type: mongoose.Schema.Types.Mixed,
          },
        },
        justificativa: {
          type: String,
        },
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    }

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('ProcessoSeletivo', ProcessoSeletivoSchema);
