export enum TypeProfileEnum {
  PROFESSOR = 1,
  DOUTOR = 2,
}

export enum TypeGraduateEnum {
  MESTRADO = 1,
  DOUTORADO = 2,
  AMBOS = 3,
}

export enum TypeBlocoEnum {
  OBRIGATORIO = 1,
  LIVRE_ESCOLHA = 2,
}

export enum TypeOpcaoVagaEnum {
  AMPLA_CONCORRENCIA = 1,
  COTAS_ACOES_AFIRMATIVAS = 2,
  EXCLUSIVA_DOCENTE = 3,
}

export const typeOpcaoVagaEnumToSubscription = {
  [TypeOpcaoVagaEnum.AMPLA_CONCORRENCIA]: "Ampla concorrência",
  [TypeOpcaoVagaEnum.COTAS_ACOES_AFIRMATIVAS]: "Cotas de Ações Afirmativas",
  [TypeOpcaoVagaEnum.EXCLUSIVA_DOCENTE]: "Programa de Qualificação Institucional da UFRJ (exclusiva para docentes e técnicos administrativos em Educação)",
}

export const typeDescricaoCota = {
  1: "Sou negro(a) e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para Negros(as).",
  2: "Sou Indígena e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para indígenas.",
  3: "Possuo deficiência e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para pessoas com deficiências.",
  4: "Sou Quilombola e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para Quilombolas.",
  5: "Sou travesti e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para Pessoas travestis.",
  6: "Sou transexual e OPTO por concorrer a uma vaga destinada à política de ação afirmativa para pessoas transexuais.",
}

export const formHomologTable = {
  _id: null,
  title: "Trajetória acadêmica e profissional – análise do currículo (até 3,0 pontos)",
  section: [
    {
      _id: null,
      title: "Trajetória Acadêmica e profissional",
      question: [
        {
          _id: null,
          text: "Participação em projetos de pesquisa (IC, extensão, PIBID etc.)",
          maxNota: 0.75
        },
        {
          _id: null,
          text: "Produção decorrente dessa participação (JITAC, eventos na área etc.)",
          maxNota: 0.75
        },
        {
          _id: null,
          text: "Experiência profissional na área educacional – gestão; movimentos sociais, entre outros.",
          maxNota: 0.75
        },
        {
          _id: null,
          text: "Experiência docente.",
          maxNota: 0.75
        }
      ]
    }
  ]
}

export const formApprovalTable = {
  _id: null,
  title: "Pré-projeto e Memorial (Domínio da discussão apresentada no projeto e coerência entre o escrito e falado) (até 7,0 pontos)",
  section: [
    {
      _id: null,
      title: "Articulação com PPGE/UFRJ, linha e orientadores, domínio da discussão apresentada no pré-projeto",
      question: [
        {
          _id: null,
          text: "Relevância à área educacional e justificativa para escolha do PPGE/UFRJ",
          maxNota: 1
        },
        {
          _id: null,
          text: "Articulação de tema e discussão teórico-metodológica do pré-projeto com a linha e projetos/produção dos  possíveis orientadores",
          maxNota: 2
        },
        {
          _id: null,
          text: "Apresentação do problema de pesquisa e questões a serem investigadas",
          maxNota: 1
        },
        {
          _id: null,
          text: "Coerência entre o tema, as questões e o referencial teórico",
          maxNota: 1
        },
        {
          _id: null,
          text: "Defesa da pertinência da metodologia proposta para o desenvolvimento do objeto de estudo ",
          maxNota: 1
        }
      ]
    },
    {
      _id: null,
      title: "Disponibilidade de tempo",
      question: [
        {
          _id: null,
          text: "Disponibilidade de tempo para dedicação e desenvolvimento das atividades do mestrado",
          maxNota: 1
        },
      ]
    }
  ]
}

export const questionsPerfilCandidato = [
  {
      id: 1,
      question: "Qual a data do seu nascimento? *",
      type: "text",
      varName: "dataNascimento"
  },
  {
      id: 2,
      question: "Qual é a sua cor/ raça? *",
      options: [
          "Amarelo",
          "Branco",
          "Indígena",
          "Pardo",
          "Preto",
          "Não desejo declarar"
      ],
      type: "radio",
      varName: "corRaca"
  },
  {
      id: 3,
      question: "E o seu gênero? *",
      options: [
          "Feminino",
          "Masculino",
          "Outro",
          "Prefiro não declarar"
      ],
      type: "radio",
      varName: "genero"
  },
  {
      id: 4,
      question: "Pessoa com deficiência? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "pessoaComDeficiencia"
  },
  {
      id: 5,
      question: "Em caso de resposta afirmativa na pergunta acima, tem alguma necessidade de tecnologia assistiva ou acessibilidade para realizar o curso?",
      type: "text",
      condition: "Sim",
      varName: "necessidadeTecnologia"
  },
  {
      id: 6,
      question: "Qual é a sua nacionalidade? *",
      options: [
          "Brasileiro(a)",
          "Outro:"
      ],
      type: "radio",
      varName: "nacionalidade"
  },
  {
      id: 7,
      question: "Se estrangeiro(a), especifique de qual país.",
      type: "text",
      condition: "Outro:",
      varName: "paisEstrangeiro"
  },
  {
      id: 8,
      question: "Você tem filhos(as)? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "temFilhos"
  },
  {
      id: 9,
      question: "Caso tenha filhos(as), quantos? *",
      options: [
          "1 filho(a)",
          "2 filhos(as)",
          "3 filhos(as)",
          "4 filhos(as) ou mais",
          "Não tenho filhos(as)"
      ],
      type: "radio",
      condition: "Sim",
      varName: "quantosFilhos"
  },
  {
      id: 10,
      question: "Tem filhos(as) menores de 5 anos de idade? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "filhosMenores5"
  },
  {
      id: 11,
      question: "Quantos filhos(as) menores de 5 anos de idade? *",
      options: [
          "1 filho(a)",
          "2 filhos(as)",
          "3 filhos(as)",
          "4 filhos(as) ou mais",
          "Não tenho filhos(as) menores de 5 anos de idade"
      ],
      type: "radio",
      condition: "Sim",
      varName: "quantosFilhosMenores5"
  },
  {
      id: 12,
      question: "Tem filhos(as) menores de 18 anos de idade? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "filhosMenores18"
  },
  {
      id: 13,
      question: "Quantos filhos(as) menores de 18 anos de idade? *",
      options: [
          "1 filho(a)",
          "2 filhos(as)",
          "3 filhos(as)",
          "4 filhos(as) ou mais",
          "Não tenho filhos(as) menores de 18 anos de idade"
      ],
      type: "radio",
      condition: "Sim",
      varName: "quantosFilhosMenores18"
  },
  {
      id: 14,
      question: "Bairro: *",
      type: "text",
      varName: "bairro",
      preText: "Onde você mora?"
  },
  {
      id: 15,
      question: "Cidade: *",
      type: "text",
      varName: "cidade"
  },
  {
      id: 16,
      question: "Estado: *",
      options: [
          "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
      ],
      type: "radio",
      varName: "estado"
  },
  {
      id: 17,
      question: "Você cursou a maior parte do Ensino Médio em qual rede de ensino? *",
      options: [
          "Privada",
          "Pública municipal",
          "Pública estadual",
          "Pública federal"
      ],
      type: "radio",
      varName: "redeEnsinoMedio"
  },
  {
      id: 18,
      question: "Curso:",
      type: "text",
      varName: "curso1",
      preText: "Em relação à(s) sua(s) graduação(ões), responda:"
  },
  {
      id: 19,
      question: "Instituição:",
      type: "text",
      varName: "instituicao1"
  },
  {
      id: 20,
      question: "Ano de término:",
      type: "text",
      varName: "anoTermino1"
  },
  {
      id: 21,
      question: "Curso:",
      type: "text",
      varName: "curso2",
      preText: "Preencher caso tenha feito mais de uma graduação"
  },
  {
      id: 22,
      question: "Instituição:",
      type: "text",
      varName: "instituicao2"
  },
  {
      id: 23,
      question: "Ano de término:",
      type: "text",
      varName: "anoTermino2"
  },
  {
      id: 24,
      question: "Na graduação, você atuou em qual ou quais dos programas/atividades acadêmicas abaixo? *",
      options: [
          "Monitoria",
          "Iniciação Científica - PIBIC (com bolsa)",
          "Iniciação Científica - FAPERJ",
          "Participação em grupo de pesquisa voluntário (sem bolsa)",
          "Programa de Iniciação à Docência - PIBID",
          "Programas de extensão (PIBEX/PIBIAC) com bolsa",
          "Programas de extensão como voluntário (sem bolsa)",
          "Não participei"
      ],
      type: "checkbox",
      varName: "programasGraduacao"
  },
  {
      id: 25,
      question: "Caso tenha participado de um grupo de pesquisa durante a graduação, por quanto tempo foi sua participação?",
      type: "text",
      varName: "tempoPesquisaGraduacao"
  },
  {
      id: 26,
      question: "Na graduação você recebeu algum tipo de bolsa ou auxílio da assistência estudantil? *",
      options: ["Sim", "Não", "Não sei/ não me lembro"],
      type: "radio",
      varName: "recebeuAuxilioGraduacao"
  },
  {
      id: 27,
      question: "Se sim, qual?",
      options: [
          "auxílio financeiro/ bolsa auxílio",
          "auxílio transporte/ Riocard/ vale transporte etc.",
          "residência estudantil",
          "restaurante universitário/ bandejão",
          "Outro:"
      ],
      type: "radio",
      condition: "Sim",
      varName: "tipoAuxilioGraduacao"
  },
  {
      id: 28,
      question: "Quando cursou sua graduação, você ingressou por algum tipo de ação afirmativa ou cota? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "ingressoCota"
  },
  {
      id: 29,
      question: "Se sim, qual?",
      options: [
          "Renda",
          "Renda + Escola pública",
          "Renda + Escola pública + raça",
          "Escola pública + raça",
          "Renda + raça",
          "Pessoa com deficiência",
          "Outro:"
      ],
      type: "radio",
      condition: "Sim",
      varName: "tipoCota"
  },
  {
      id: 30,
      question: "Você trabalha ou já trabalhou anteriormente? *",
      options: [
          "Nunca trabalhei",
          "Já trabalhei, mas não estou trabalhando no momento",
          "Trabalho atualmente"
      ],
      type: "radio",
      varName: "experienciaTrabalho",
      preText: "Inserção profissional",
  },
  {
      id: 44,
      question: "Caso trabalhe, qual/quais a sua ocupação ou ocupações atual/ais?",
      type: "text",
      varName: "ocupacoesAtuaisTrabalho",
  },
  {
      id: 31,
      question: "Trabalha ou trabalhou na área da educação? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "trabalhoEducacao"
  },
  {
      id: 33,
      question: "Você atua em qual ou quais funções?",
      options: [
          "Professor/a",
          "Direção/Coordenação pedagógica",
          "Gestão em secretaria de educação (municipal ou estadual)",
          "Outro:"
      ],
      type: "checkbox",
      condition: "Sim",
      varName: "funcoesAtuais",
      preText: "Caso trabalhe atualmente na área educacional, responda:"
  },
  {
      id: 34,
      question: "Você trabalha em quantas instituições?",
      type: "text",
      varName: "quantasInstituicoes"
  },
  {
      id: 35,
      question: "Em qual ou quais redes de ensino você trabalha? É possível assinalar mais de uma opção.",
      options: [
          "Privada",
          "Pública municipal",
          "Pública estadual",
          "Pública federal"
      ],
      type: "checkbox",
      varName: "redesEnsino"
  },
  {
      id: 36,
      question: "Em qual ou quais nível/níveis de ensino você trabalha? É possível assinalar mais de uma opção.",
      options: [
          "Educação Infantil (creche e pré-escola)",
          "Educação Fundamental I (1º ao 5º ano)",
          "Educação Fundamental II (6º ou 9º ano)",
          "Ensino Médio",
          "Graduação",
          "Outro:"
      ],
      type: "checkbox",
      varName: "niveisEnsino"
  },
  {
      id: 37,
      question: "Qual rendimento da sua FAMÍLIA, somando a renda mensal bruta de todas as pessoas que moram na sua residência? *",
      options: [
          "Não possuo/possuímos rendimento",
          "Até 1 salário mínimo (R$ 1.412)",
          "Acima de 1 (R$ 1.412) a 3 salários mínimos (R$ 4.236)",
          "Acima de 3 (R$ 4.236 ) a 5 salários mínimos (R$ 7.060)",
          "Acima de 5 (R$ 7.060) a 7 salários mínimos (R$ 9.884)",
          "Acima de 7 (R$ 9.884) a 10 salários mínimos (R$ 14.120)",
          "Acima de 10 salários mínimos (R$ 14.120)"
      ],
      type: "radio",
      varName: "rendimentoFamiliar",
      preText: "Renda:"
  },
  {
      id: 38,
      question: "Você tem dependentes? *",
      options: ["Não", "Sim"],
      type: "radio",
      varName: "temDependentes"
  },
  {
      id: 39,
      question: "Quantos dependentes?",
      options: [
          "1 dependente",
          "2 dependentes",
          "3 dependentes",
          "4 dependentes ou mais",
          "Não tenho dependentes"
      ],
      type: "radio",
      condition: "Sim",
      varName: "quantosDependentes"
  },
  {
      id: 40,
      question: "Qual o nível de escolaridade do seu PAI? *",
      options: [
          "Não sei",
          "Sem escolaridade",
          "Ensino Fundamental I (1º ao 5º ano)",
          "Ensino Fundamental II (6º ao 9º ano)",
          "Ensino Médio",
          "Graduação",
          "Pós-graduação Lato Sensu (Especialização)",
          "Mestrado",
          "Doutorado"
      ],
      type: "radio",
      varName: "escolaridadePai",
      preText: "Escolaridade"
  },
  {
      id: 41,
      question: "Qual o nível de escolaridade da sua MÃE? *",
      options: [
          "Não sei",
          "Sem escolaridade",
          "Ensino Fundamental I (1º ao 5º ano)",
          "Ensino Fundamental II (6º ao 9º ano)",
          "Ensino Médio",
          "Graduação",
          "Pós-graduação Lato Sensu (Especialização)",
          "Mestrado",
          "Doutorado"
      ],
      type: "radio",
      varName: "escolaridadeMae"
  },
  {
      id: 42,
      question: "Na sua família há alguém que concluiu curso de pós-graduação (Mestrado ou Doutorado)? *",
      options: ["Sim", "Não"],
      type: "radio",
      varName: "posGraduacaoFamilia"
  },
  {
      id: 43,
      question: "Se sim, quem?",
      options: [
          "Pai/padrasto",
          "Mãe/madrasta",
          "Irmã(o)",
          "Esposo(a) ou companheiro(a)",
          "Outra pessoa"
      ],
      type: "radio",
      condition: "Sim",
      varName: "quemPosGraduacao"
  }
];