import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  cadastrarHistorico(file: File, form: any) {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `${file.name}`);
    formData.append('formulario', JSON.stringify(form));
    return this.http.post(`/api/ppge/historico`, formData);
  }

  deletarHistorico(form: any) {
    return this.http.delete(`/api/ppge/historico/${form._id}`);
  }

  atualizarHistorico(file: File, form: any) {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `${file.name}`);
    formData.append('formulario', JSON.stringify(form));
    return this.http.put(`/api/ppge/historico`, formData);
  }
}
