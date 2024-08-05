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

    etapaAvaliacao: {
      type: Number,
      required: true,
      default: 0
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

    criterioHomologacao: {
      type: mongoose.Schema.Types.Mixed,
    },

    enrolled: [
      {
        codInscricao: {
          type: String,
          required: true,
        },
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
        deficiencia: {
          type: Boolean,
        },
        qualDeficiencia: {
          type: String,
        },
        atendimentoEspecialDeficiencia: {
          type: Boolean,
        },
        deficienciaSub: {
          type: String,
        },
        isMaeFilhoMenorCinco: {
          type: Boolean,
        },
        resideDistanciaLonga: {
          type: Boolean,
        },
        declaracaoResideDistanciaLonga: {
          type: Boolean,
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
        perfilCandidato: {
          type: mongoose.Schema.Types.Mixed,
        },
        outrosCursos: {
          type: String,
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
          fileConclusaoGraduacao: {
            type: String,
          },
          fileIndigena: {
            type: String,
          },
          fileCondicaoDeficiencia: {
            type: String,
          },
          fileCondicaoDeficienciaDois: {
            type: String,
          },
          fileCertidaoNascimentoFilho: {
            type: String,
          },
          fileComprovanteResidencia: {
            type: String,
          },
          fileComprovantePagamento: {
            type: String,
          }
        },
        parecerista: {
          primeiro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          segundo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
        responsavelHomologacao: {
          type: String,
        },
        parecer: {
          aprovado: {
            type: Boolean,
          },
          homologado: {
            type: Boolean,
          },
          homologacao: {
            type: mongoose.Schema.Types.Mixed,
          },
          recursoHomolog: {
            justificaIndeferido: {
              type: String,
            },
            justificativa: {
              type: String,
            },
            respostaJustificativa: {
              type: String,
            },
            recursoAceito: {
              type: Boolean
            }
          },
          step: {
            type: mongoose.Schema.Types.Mixed,
          },
          avaliacoes: {
            type: mongoose.Schema.Types.Mixed,
          }
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
