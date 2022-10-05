import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class ProcessoSeletivoService {
    private readonly URL_PROCESSO_SELETIVO = '/api/ppge/processo-seletivo';
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getProcessoSeletivo(): Observable<any> {
      let params = new HttpParams().set('isAtivo', true);
      return this.http.get(`${this.URL_PROCESSO_SELETIVO}`, {params});
    }

    public inscreverProcessoSeletivo(idProcesso, formulario) {
      return this.http.post(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`, {formulario});
    }

    public buscarMinhasInscricoes() {
      return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes`);
    }

    public cancelarInscricao(idProcesso) {
      return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`);
    }
}