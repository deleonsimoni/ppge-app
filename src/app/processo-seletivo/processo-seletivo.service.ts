import { HttpClient } from "@angular/common/http";
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
      return this.http.get(`${this.URL_PROCESSO_SELETIVO}`);
    }

    public inscreverProcessoSeletivo(idProcesso) {
      return this.http.post(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`, {});
    }

    public buscarMinhasInscricoes() {
      return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes`);
    }

    public cancelarInscricao(idProcesso) {
      return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`);
    }
}