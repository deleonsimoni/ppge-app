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
}
