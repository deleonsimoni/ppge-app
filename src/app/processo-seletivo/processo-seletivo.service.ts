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
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}`, { params });
  }

  public inscreverProcessoSeletivo(idProcesso, formulario, fileLattes, filePreProjeto, fileComprovantePagamento, fileMemorial) {

    const formData: FormData = new FormData();
    formData.append('fileArray', fileLattes, `${idProcesso}/${fileLattes.name}`);
    formData.append('fileArray', filePreProjeto, `${idProcesso}/${filePreProjeto.name}`);
    formData.append('fileArray', fileComprovantePagamento, `${idProcesso}/${fileComprovantePagamento.name}`);
    formData.append('fileArray', fileMemorial, `${idProcesso}/${fileMemorial.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`, formData);

  }

  public buscarMinhasInscricoes() {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes`);
  }

  public cancelarInscricao(idProcesso) {
    return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`);
  }
}