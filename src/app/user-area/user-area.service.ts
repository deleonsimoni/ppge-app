import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAreaService { 
  private readonly URL_PROCESSO_SELETIVO = '/api/ppge/processo-seletivo';

  constructor(
    private http: HttpClient,
  ){}

  public buscarMinhasInscricoes() {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/detalhe`);
  }

  public registrarJustificativa(idInscricao, idProcesso, justificativa) {
    const params = new HttpParams()
      .set('idInscricao', idInscricao)
      .set('idProcesso', idProcesso);

    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/justificar`, {justificativa}, {params});

  }
}