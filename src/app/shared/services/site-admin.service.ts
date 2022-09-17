import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteAdminService {
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_HISTORICO = `${this.URL_API_PPGE}/historico`;
  private readonly URL_CORPO_DOCENTE = `${this.URL_API_PPGE}/corpo-docente`;
  private readonly URL_OBJETIVOS = `${this.URL_API_PPGE}/objetivos`;
  private readonly URL_TESE_DISSERTACAO = '/api/projetos/tese-dissertacao';
  private readonly URL_PROCESSO_SELETIVO = `${this.URL_API_PPGE}/processo-seletivo`;
  private readonly URL_PAGE = `${this.URL_API_PPGE}/page`;

  constructor(
    private http: HttpClient
  ) { }

  /* Page */
    
  listPage(pageSelected: string, language: string, _idPage = null) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    let params = new HttpParams()
      .set('language', language);
    params = _idPage ? params.set('_id', _idPage) : params;
    return this.http.get(`${this.URL_PAGE}/${pageSelected}`, {params});
  }

  cadastrarPage(form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PAGE}/${pageSelected}`, {formulario: form}, {headers});
  }

  deletarPage(form: any, pageSelected: string) {
    return this.http.delete(`${this.URL_PAGE}/${pageSelected}/${form._id}`);
  }

  atualizarPage(form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PAGE}/${pageSelected}/${form._id}`, {formulario: form}, {headers});
  }
  /* Fim Page */



  /* Historico */
  listHistorico() {
    return this.http.get(`${this.URL_HISTORICO}`);
  }

  cadastrarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_HISTORICO}`, {formulario: form}, {headers});
  }

  deletarHistorico(form: any) {
    return this.http.delete(`${this.URL_HISTORICO}/${form._id}`);
  }

  atualizarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_HISTORICO}/${form._id}`, {formulario: form}, {headers});
  }
  /* Fim Historico */

  /* Objetivos */
  testObjetivo = [{}];
  listObjetivo() {
    return this.http.get(`${this.URL_OBJETIVOS}`);
  }

  cadastrarObjetivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_OBJETIVOS}`, {formulario: form}, {headers});
  }

  atualizarObjetivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_OBJETIVOS}/${form._id}`, {formulario: form}, {headers});
  }
  /* Fim Objetivos */

  /* Corpo Docente */
  listCorpoDocente() {
    return this.http.get(`${this.URL_CORPO_DOCENTE}`);
  }

  cadastrarCorpoDocente(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_CORPO_DOCENTE}`, {formulario: form}, {headers});
  }

  atualizarCorpoDocente(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_CORPO_DOCENTE}/${form._id}`, {formulario: form}, {headers});
  }

  deletarCorpoDocente(form: any) {
    return this.http.delete(`${this.URL_CORPO_DOCENTE}/${form._id}`);
  }

  /* Fim Corpo Docente */
  /* Tese DISSERTACAO */
  listTeseDissertacao(tipo: string) {
    return this.http.get(`${this.URL_TESE_DISSERTACAO}/${tipo}`);
  }

  cadastrarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_TESE_DISSERTACAO}`, {formulario: form}, {headers});
  }

  atualizarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_TESE_DISSERTACAO}/${form._id}`, {formulario: form}, {headers});
  }

  getTeseDissertacao(form: any) {
    let params = new HttpParams();
    if(form.tipo) params = params.set('tipo', form.tipo)
    if(form.ano) params = params.set('ano', form.ano)
    if(form.ingresso) params = params.set('ingresso', form.ingresso)
    if(form.autor) params = params.set('autor', form.autor)
    if(form.titulo) params = params.set('titulo', form.titulo)
    if(form.dataSala) params = params.set('dataSala', form.dataSala)
    if(form.banca) params = params.set('banca', form.banca)

    return this.http.get(`${this.URL_TESE_DISSERTACAO}/get-filter/filter`, { params: params });
  }

  deletarTeseDissertacao(id: any) {
    return this.http.delete(`${this.URL_TESE_DISSERTACAO}/${id}`);
  }
  /* Fim Tese DISSERTACAO */
  /* Processo Seletivo */
  cadastrarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}`, {formulario: form}, {headers});
  }

  listProcessoSeletivo() {
    return this.http.get(this.URL_PROCESSO_SELETIVO);
  }

  deletarProcessoSeletivo(id: any) {
    return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/${id}`);
  }

  atualizarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/${form._id}`, {formulario: form}, {headers});
  }

  listProcessoSeletivoInscritos(id) {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/${id}`);
  }
  /* Fim Processo Seletivo */
}
