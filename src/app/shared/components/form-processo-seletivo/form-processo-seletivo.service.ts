import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FormProcessoSeletivoService {
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_PAGE = `${this.URL_API_PPGE}/page`;

  constructor(
    private http: HttpClient
  ) { }


  getProcessoSeletivoInfosById(idProcessoSeletivo) {
    return this.http.get(`${this.URL_API_PPGE}/processo-seletivo/inscrever/infos/${idProcessoSeletivo}`);
  }

}