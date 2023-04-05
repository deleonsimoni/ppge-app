export interface User {
  _id: string;
  fullname: string;
  createdAt: string;
  roles: string[];
  isAdmin: boolean;
  isCoordenador: boolean;
  isParecerista: boolean;
  isGerenciador: boolean;
}
