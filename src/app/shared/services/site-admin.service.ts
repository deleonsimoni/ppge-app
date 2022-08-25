import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteAdminService {

  constructor(
    private http: HttpClient
  ) { }


  listHistorico() {
    return this.http.get(`/api/ppge/historico`);
  }

  cadastrarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    
    return this.http.post(`/api/ppge/historico`, {formulario: form}, {headers});
  }

  deletarHistorico(form: any) {
    return this.http.delete(`/api/ppge/historico/${form._id}`);
  }

  atualizarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`/api/ppge/historico/${form._id}`, {formulario: form}, {headers});
  }
}
