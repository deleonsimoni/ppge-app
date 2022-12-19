export enum TypeProfileEnum {
  PROFESSOR = 1,
  DOUTOR = 2,
}

export enum TypeGraduateEnum {
  MESTRADO = 1,
  DOUTORADO = 2,
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
  title: "Trajetória acadêmica e profissional – análise do currículo (até 3,0 pontos)",
  section: [
    {
      id: 1,
      title: "Trajetória Acadêmica e profissional",
      question: [
        {
          numer: 1,
          text: "Participação em projetos de pesquisa (IC, extensão, PIBID etc.)",
          maxNota: 0.75
        },
        {
          numer: 2,
          text: "Produção decorrente dessa participação (JITAC, eventos na área etc.)",
          maxNota: 0.75
        },
        {
          numer: 3,
          text: "Experiência profissional na área educacional – gestão; movimentos sociais, entre outros.",
          maxNota: 0.75
        },
        {
          numer: 4,
          text: "Experiência docente.",
          maxNota: 0.75
        }
      ]
    }
  ]
}

export const formApprovalTable = {
  title: "Pré-projeto e Memorial (Domínio da discussão apresentada no projeto e coerência entre o escrito e falado) (até 7,0 pontos)",
  section: [
    {
      id: 1,
      title: "Articulação com PPGE/UFRJ, linha e orientadores, domínio da discussão apresentada no pré-projeto",
      question: [
        {
          numer: 1,
          text: "Relevância à área educacional e justificativa para escolha do PPGE/UFRJ",
          maxNota: 1
        },
        {
          numer: 2,
          text: "Articulação de tema e discussão teórico-metodológica do pré-projeto com a linha e projetos/produção dos  possíveis orientadores",
          maxNota: 2
        },
        {
          numer: 3,
          text: "Apresentação do problema de pesquisa e questões a serem investigadas",
          maxNota: 1
        },
        {
          numer: 4,
          text: "Coerência entre o tema, as questões e o referencial teórico",
          maxNota: 1
        },
        {
          numer: 5,
          text: "Defesa da pertinência da metodologia proposta para o desenvolvimento do objeto de estudo ",
          maxNota: 1
        }
      ]
    },
    {
      id: 1,
      title: "Disponibilidade de tempo",
      question: [
        {
          numer: 1,
          text: "Disponibilidade de tempo para dedicação e desenvolvimento das atividades do mestrado",
          maxNota: 1
        },
      ]
    }
  ]
}