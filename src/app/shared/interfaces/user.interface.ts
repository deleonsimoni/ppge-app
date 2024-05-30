export interface User {
  _id: string;
  fullname: string;
  email: string;
  celular: string;
  telefone: string;
  socialname: string;
  cpf: string;
  rg: string;
  rgEmissor: string;
  passaporte: string;
  dataNiver: string;
  nacionalidade: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  cargo: string;
  empresa: string;
  deficiencia: string;
  cor: string;
  genero: string;

  createdAt: string;
  roles: string[];
  isAdmin: boolean;
  isCoordenador: boolean;
  isParecerista: boolean;
  isGerenciador: boolean;
}
