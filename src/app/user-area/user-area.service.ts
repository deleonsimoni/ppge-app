import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAreaService { 
  private readonly URL_PROCESSO_SELETIVO = '/api/ppge/processo-seletivo';
  private readonly URL_AUTH = '/api/auth';

  constructor(
    private http: HttpClient,
  ){}

  public buscarMinhasInscricoes() {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/detalhe`);
  }

  public registrarJustificativa(idInscricao, idProcesso, idStep, justificativa) {
    const params = new HttpParams()
      .set('idInscricao', idInscricao)
      .set('idStep', idStep)
      .set('prefixoRecurso', 'justificativa')
      .set('idProcesso', idProcesso);

    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/justificar`, {justificativa}, {params});

  }

  public registrarJustificativaHomolog(idInscricao, idProcesso, justificativa) {
    const params = new HttpParams()
      .set('idInscricao', idInscricao)
      .set('prefixoRecurso', 'justificativa')
      .set('idProcesso', idProcesso);

    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/justificar-homolog`, {justificativa}, {params});

  }

  public alterarSenha(senha, novaSenha, reNovaSenha) {
    return this.http.post(`${this.URL_AUTH}/changePassword`, {senha, novaSenha, reNovaSenha});
  }
}