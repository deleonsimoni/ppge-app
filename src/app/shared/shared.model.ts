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